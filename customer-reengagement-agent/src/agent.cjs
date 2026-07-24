#!/usr/bin/env node
'use strict';

/**
 * Customer Reengagement Agent V2
 *
 * Full weekly optimization loop:
 *   Scan → Segment → Enroll → Monitor → Optimize → Report → Repeat
 *
 * Uses GHL V2 API for templates, campaigns, and statistics.
 */

const { postRequest, postActivity, postMetric } = require('./dashboard-client.cjs');
const { runJob } = require('./job-controller.cjs');
const { buildReactivationReport } = require('./reactivation-engine.cjs');
const { submitApprovedBatch } = require('./squid-crm-client.cjs');
const {
  getCampaignStats,
  getEmailCampaignStats,
  listEmailCampaigns,
  listWorkflowCampaigns,
  listTemplates,
  createTemplate,
  batchTagContacts
} = require('./squid-crm-client.cjs');
const { buildWeeklyReport, renderMarkdown, saveReport } = require('./reporting.cjs');
const { findNewReplies, sendReply, tagContact } = require('./conversation-poller.cjs');
const { processReply } = require('./reply-engine.cjs');
const { matchCampaign, getFiveStageFramework, getAvailableCampaigns } = require('./template-library.cjs');
const { enforceGuardrails, getGuardrailSummary } = require('./guardrails.cjs');

const AGENT_ID = 'customer-reengagement';
const AGENT_NAME = 'Customer Re-engagement Agent';
const DEPARTMENT = 'clients';

// ─── CLI Arg Parsing ─────────────────────────────────────────────────────────

function parseArgs(argv = process.argv.slice(2)) {
  const args = { _: [] };
  for (const arg of argv) {
    if (arg.startsWith('--job=')) args.jobId = arg.slice(6);
    else if (arg === '--dry-run' || arg === '--dryRun') args.dryRun = true;
    else if (arg.startsWith('--prompt=')) args.prompt = arg.slice(9);
    else if (arg.startsWith('--customers=')) args.customerFile = arg.slice(12);
    else if (arg.startsWith('--limit=')) args.limit = Number(arg.slice(8));
    else if (arg.startsWith('--dormant-days=')) args.dormantThresholdDays = Number(arg.slice(16));
    else if (arg.startsWith('--cooling-days=')) args.coolingThresholdDays = Number(arg.slice(15));
    else if (arg.startsWith('--rate-limit=')) args.rateLimitPerWeek = Number(arg.slice(13));
    else if (arg.startsWith('--api-base=')) args.apiBase = arg.slice(11);
    else if (arg.startsWith('--location=')) args.locationId = arg.slice(11);
    else if (arg.startsWith('--api-key=')) args.apiKey = arg.slice(10);
    else if (arg === '--send-approved') args.sendApproved = true;
    else if (arg.startsWith('--channel=')) args.channel = arg.slice(10);
    else if (arg.startsWith('--campaign=')) args.campaignId = arg.slice(11);
    else if (arg.startsWith('--stats-source=')) args.statsSource = arg.slice(15);
    else if (arg === '--weekly-report') args.weeklyReport = true;
    else if (arg === '--tag-contacts') args.tagContacts = true;
    else if (arg === '--poll-conversations') args.pollConversations = true;
    else if (arg === '--template-list') args.templateList = true;
    else if (arg === '--campaign-gen') args.campaignGen = true;
    else if (arg === '--guardrails-check') args.guardrailsCheck = true;
    else if (arg.startsWith('--incoming=')) args.incomingMessage = arg.slice(11);
    else args._.push(arg);
  }
  return args;
}

// ─── Main Run ────────────────────────────────────────────────────────────────

async function run(options = {}) {
  const dryRun = options.dryRun !== false;
  const jobResult = await runJob(options);
  const report = buildReactivationReport(options);

  // Determine status
  const hasApprovalNeeded = report.opportunities.some(o => o.tier !== 'warm');
  const status = hasApprovalNeeded ? 'needs_approval' : 'completed';
  const summary = dryRun ? `Dry run: ${report.summary}` : report.summary;
  const dashboardOptions = {
    apiBase: options.apiBase || process.env.SQUIDBOT_DASHBOARD_API_BASE || process.env.DASHBOARD_API_URL,
    dryRun
  };

  // Report to dashboard
  await postRequest({
    user: AGENT_NAME,
    action: jobResult.jobName,
    status,
    type: 'agent',
    details: summary,
    priority: report.metrics.highValueOpportunities > 0 ? 'high' : 'normal'
  }, dashboardOptions);

  await postActivity({
    agentId: AGENT_ID,
    department: DEPARTMENT,
    action: jobResult.jobName,
    status,
    details: summary,
    metadata: {
      job: jobResult,
      tierSummary: report.tierSummary,
      metrics: report.metrics
    }
  }, dashboardOptions);

  // Post KPIs
  await postMetric(AGENT_ID, 'customersAnalyzed', report.metrics.customersAnalyzed, 'count', dashboardOptions);
  await postMetric(AGENT_ID, 'warmContacts', report.metrics.warmContacts, 'count', dashboardOptions);
  await postMetric(AGENT_ID, 'coolingContacts', report.metrics.coolingContacts, 'count', dashboardOptions);
  await postMetric(AGENT_ID, 'dormantContacts', report.metrics.dormantContacts, 'count', dashboardOptions);
  await postMetric(AGENT_ID, 'actionableOpportunities', report.metrics.actionableOpportunities, 'count', dashboardOptions);
  await postMetric(AGENT_ID, 'highValueOpportunities', report.metrics.highValueOpportunities, 'count', dashboardOptions);
  await postMetric(AGENT_ID, 'estimatedRecoverablePipeline', report.metrics.estimatedRecoverablePipeline, 'currency', dashboardOptions);

  // Tag contacts if requested
  let taggingResult = null;
  if (options.tagContacts && !dryRun) {
    const toTag = report.opportunities.filter(o => o.recommendedTag);
    const byTag = {};
    for (const opp of toTag) {
      if (!byTag[opp.recommendedTag]) byTag[opp.recommendedTag] = [];
      byTag[opp.recommendedTag].push(opp.customerId);
    }
    const tagResults = [];
    for (const [tag, ids] of Object.entries(byTag)) {
      const result = await batchTagContacts(ids, [tag], options);
      tagResults.push({ tag, ...result });
    }
    taggingResult = { ok: tagResults.every(r => r.ok), results: tagResults };
  }

  // Send approved campaigns if requested
  let crm = {
    ok: true,
    attempted: 0,
    queued: 0,
    approvalRequired: report.opportunities.filter(o => o.tier !== 'warm').length,
    skipped: 0
  };
  if (options.sendApproved) {
    const approved = report.opportunities.filter(o => o.approved === true);
    crm = await submitApprovedBatch(approved, { ...options, dryRun });
  }

  return {
    ok: true,
    agentId: AGENT_ID,
    jobId: jobResult.jobId,
    jobName: jobResult.jobName,
    dryRun,
    approvalRequired: status === 'needs_approval',
    summary,
    tierSummary: report.tierSummary,
    report,
    crm,
    tagging: taggingResult,
    safety: report.safety
  };
}

// ─── Weekly Report Runner ────────────────────────────────────────────────────

/**
 * Run the full weekly report cycle:
 * 1. Scan contacts → segment into tiers
 * 2. Fetch GHL V2 campaign stats
 * 3. Build weekly report
 * 4. Save to memory/
 * 5. Report to dashboard
 */
async function runWeeklyReport(options = {}) {
  const dryRun = options.dryRun !== false;
  const dashboardOptions = {
    apiBase: options.apiBase || process.env.SQUIDBOT_DASHBOARD_API_BASE || process.env.DASHBOARD_API_URL,
    dryRun
  };

  // Step 1: Scan
  const scanReport = buildReactivationReport(options);

  // Step 2: Fetch campaign stats from GHL V2
  let currentStats = null;
  let previousStats = null;

  if (!dryRun) {
    // Get latest email campaigns
    const campaignsResult = await listEmailCampaigns({ limit: 5 }, options);
    const campaigns = campaignsResult.data?.campaigns || [];

    if (campaigns.length > 0) {
      // Get stats for the most recent campaign
      currentStats = await getEmailCampaignStats(campaigns[0].id, options);
      if (campaigns.length > 1) {
        previousStats = await getEmailCampaignStats(campaigns[1].id, options);
      }
    }

    // Also check workflow campaigns
    const workflowResult = await listWorkflowCampaigns({ limit: 5 }, options);
    const workflowCampaigns = workflowResult.data?.campaigns || [];
    if (workflowCampaigns.length > 0) {
      const wfStats = await getCampaignStats('workflow-campaigns', workflowCampaigns[0].id, options);
      // Merge workflow stats into current if no email campaign stats
      if (!currentStats || !currentStats.ok) {
        currentStats = wfStats;
      }
    }
  } else {
    // Dry run — use mock stats
    currentStats = { ok: true, dryRun: true, stats: {} };
  }

  // Step 3: Build report
  const weeklyReport = buildWeeklyReport({
    currentStats: currentStats?.data || currentStats?.stats || {},
    previousStats: previousStats?.data || previousStats?.stats || null,
    scanReport,
    trendHistory: [], // Will be populated from memory in future cycles
    clientName: options.clientName || process.env.GHL_CLIENT_NAME || 'Client'
  });

  // Step 4: Save report
  let savedFiles = null;
  if (!dryRun) {
    savedFiles = saveReport(weeklyReport);
  }

  // Step 5: Report to dashboard
  const summary = `Weekly report: ${weeklyReport.overallStatus}. Open rate: ${(weeklyReport.kpis.openRate * 100).toFixed(1)}%, Click rate: ${(weeklyReport.kpis.clickRate * 100).toFixed(1)}%. ${scanReport.summary}`;

  await postActivity({
    agentId: AGENT_ID,
    department: DEPARTMENT,
    action: 'Weekly Report',
    status: 'completed',
    details: summary,
    metadata: { weeklyReport, scanMetrics: scanReport.metrics }
  }, dashboardOptions);

  await postMetric(AGENT_ID, 'openRate', weeklyReport.kpis.openRate, 'percentage', dashboardOptions);
  await postMetric(AGENT_ID, 'clickRate', weeklyReport.kpis.clickRate, 'percentage', dashboardOptions);
  await postMetric(AGENT_ID, 'replyRate', weeklyReport.kpis.replyRate, 'percentage', dashboardOptions);
  await postMetric(AGENT_ID, 'reactivationRate', weeklyReport.kpis.reactivationRate, 'percentage', dashboardOptions);

  return {
    ok: true,
    agentId: AGENT_ID,
    action: 'weekly-report',
    dryRun,
    summary,
    weeklyReport,
    savedFiles,
    scanReport
  };
}

// ─── Template Optimization Runner ────────────────────────────────────────────

/**
 * Create a new template variant (never modifies in place).
 */
async function createTemplateVariant(templateSpec, options = {}) {
  const result = await createTemplate({
    name: templateSpec.name,
    subjectLine: templateSpec.subjectLine,
    editorType: templateSpec.editorType || 'html',
    editorContent: templateSpec.editorContent || templateSpec.html || ''
  }, options);

  return result;
}

// ─── Content pipeline integration ────────────────────────────────────────────

async function updateContentStatus(contentId, status, extra = {}) {
  const baseUrl = process.env.DASHBOARD_API_URL || 'http://localhost:3001';
  try {
    await fetch(`${baseUrl}/api/content`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: contentId, status, agent: 'customer-reengagement', type: 'email', platform: 'email', ...extra }),
    });
  } catch (e) { /* non-blocking */ }
}

/**
 * Conversation Poller Job
 * Checks for new replies on active campaigns, processes them.
 */
async function runConversationPoll(options = {}) {
  const result = await findNewReplies(options);
  const processed = [];
  for (const conv of result.conversations || []) {
    const context = {
      contactName: conv.contactName,
      brandVoice: options.brandVoice || { tone: 'friendly', formality: 'casual' },
      desiredOutcome: options.desiredOutcome || 'booking',
      campaignName: conv.tags?.join(', ') || 'reactivation'
    };
    const response = await processReply(conv.lastMessage, context);
    if (response.ok && !response.reply.stopConversation) {
      await sendReply(conv.conversationId, response.reply.text, options);
      if (response.reply.actionTag) {
        await tagContact(conv.contactId, response.reply.actionTag, options);
      }
    } else if (response.reply?.stopConversation) {
      await sendReply(conv.conversationId, response.reply.text, options);
      if (response.reply.actionTag) {
        await tagContact(conv.contactId, response.reply.actionTag, options);
      }
    }
    processed.push({ contactId: conv.contactId, intent: response.intent, replySent: response.ok });
  }
  return {
    ok: true,
    agentId: AGENT_ID,
    action: 'conversation-poll',
    conversationsChecked: result.conversations?.length || 0,
    repliesProcessed: processed.length,
    processed
  };
}

/**
 * List available swipe templates
 */
function listTemplates() {
  return { ok: true, campaigns: getAvailableCampaigns() };
}

/**
 * Print guardrail summary
 */
function printGuardrails() {
  return { ok: true, guardrails: getGuardrailSummary() };
}

module.exports = {
  run,
  runWeeklyReport,
  runConversationPoll,
  createTemplateVariant,
  updateContentStatus,
  listTemplates,
  parseArgs
};

// ─── CLI Entry ───────────────────────────────────────────────────────────────

if (require.main === module) {
  const args = parseArgs();

  if (args.weeklyReport) {
    runWeeklyReport(args)
      .then(r => console.log(JSON.stringify(r, null, 2)))
      .catch(err => { console.error(err.stack || err.message); process.exit(1); });
  } else if (args.pollConversations) {
    runConversationPoll(args)
      .then(r => console.log(JSON.stringify(r, null, 2)))
      .catch(err => { console.error(err.stack || err.message); process.exit(1); });
  } else if (args.templateList) {
    console.log(JSON.stringify(listTemplates(), null, 2));
  } else if (args.guardrailsCheck) {
    console.log(JSON.stringify(printGuardrails(), null, 2));
  } else {
    run(args)
      .then(r => console.log(JSON.stringify(r, null, 2)))
      .catch(err => { console.error(err.stack || err.message); process.exit(1); });
  }
}
