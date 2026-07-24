'use strict';

/**
 * Weekly Reporting Module
 *
 * Generates the weekly PDF-style report for the Customer Reengagement Agent.
 * Report sections:
 *   1. This Week's Numbers (sent, delivered, opened, clicked, replied, bounced, unsubscribed)
 *   2. What Changed (week-over-week delta on key metrics)
 *   3. What's Working / What's Not (with WHY)
 *   4. Plan for Next Week
 *   5. Cumulative Trend (4-week rolling view)
 *
 * Output format: structured JSON + markdown (for PDF rendering downstream)
 */

const fs = require('fs');
const path = require('path');

const MS_PER_DAY = 24 * 60 * 60 * 1000;

// ─── Helpers ─────────────────────────────────────────────────────────────────

function pct(n) {
  return `${(Number(n || 0) * 100).toFixed(1)}%`;
}

function delta(current, previous) {
  if (previous === 0 || previous === undefined || previous === null) return null;
  const diff = current - previous;
  const pctChange = (diff / previous) * 100;
  return {
    absolute: Number(diff.toFixed(4)),
    percentage: Number(pctChange.toFixed(1)),
    direction: diff > 0 ? 'up' : diff < 0 ? 'down' : 'flat'
  };
}

function currency(n) {
  return '$' + Math.round(Number(n || 0)).toLocaleString('en-US');
}

function nowISO() { return new Date().toISOString(); }

function dateDaysAgo(days) {
  return new Date(Date.now() - days * MS_PER_DAY).toISOString().split('T')[0];
}

// ─── Report Builder ──────────────────────────────────────────────────────────

/**
 * Build a structured weekly report from campaign stats and scan data.
 *
 * @param {object} params
 * @param {object} params.currentStats - This week's GHL V2 campaign stats
 * @param {object|null} params.previousStats - Last week's stats for delta calc
 * @param {object} params.scanReport - Reactivation scan report
 * @param {object|null} params.trendHistory - Array of past weekly stats (4 weeks)
 * @param {string} params.clientName - Client display name
 * @returns {object} Structured report ready for PDF/markdown rendering
 */
function buildWeeklyReport(params = {}) {
  const {
    currentStats = {},
    previousStats = null,
    scanReport = {},
    trendHistory = [],
    clientName = 'Client'
  } = params;

  const generatedAt = nowISO();
  const stats = currentStats.stats || currentStats;

  // Section 1: This Week's Numbers
  const thisWeek = {
    sent: stats.sent || 0,
    delivered: stats.delivered || stats.accepted || 0,
    opened: stats.opened || 0,
    clicked: stats.clicked || 0,
    replied: stats.replied || 0,
    bounced: stats.permanentFail + stats.temporaryFail + stats.failed || stats.bounced || 0,
    unsubscribed: stats.unsubscribed || 0,
    openRate: stats.openRate || 0,
    clickRate: stats.clickRate || 0,
    replyRate: stats.replyRate || 0,
    bounceRate: stats.bounceRate || 0,
    unsubscribeRate: stats.unsubscribeRate || 0
  };

  // Section 2: What Changed (week-over-week)
  const changes = previousStats ? computeChanges(thisWeek, previousStats.stats || previousStats) : null;

  // Section 3: What's Working / What's Not
  const analysis = analyzePerformance(thisWeek, changes);

  // Section 4: Plan for Next Week
  const plan = buildNextWeekPlan(thisWeek, analysis, scanReport);

  // Section 5: Cumulative Trend (4-week rolling)
  const trend = buildTrendView(thisWeek, trendHistory);

  // Overall assessment
  const overallStatus = assessOverallStatus(thisWeek, changes);

  return {
    reportType: 'customer-reengagement-weekly',
    clientName,
    generatedAt,
    period: {
      weekOf: dateDaysAgo(7),
      generated: generatedAt.split('T')[0]
    },
    section1_thisWeekNumbers: thisWeek,
    section2_whatChanged: changes,
    section3_whatsWorking: analysis,
    section4_planForNextWeek: plan,
    section5_cumulativeTrend: trend,
    scanSummary: scanReport.summary || null,
    overallStatus,
    kpis: {
      openRate: thisWeek.openRate,
      clickRate: thisWeek.clickRate,
      replyRate: thisWeek.replyRate,
      reactivationRate: scanReport.metrics ? (scanReport.metrics.actionableOpportunities / Math.max(1, scanReport.metrics.customersAnalyzed)) : 0,
      estimatedRecoverablePipeline: scanReport.metrics?.estimatedRecoverablePipeline || 0
    },
    safety: {
      rateLimitPerWeek: scanReport.thresholds?.rateLimitPerWeek || 500,
      optedOutExcluded: scanReport.safety?.optedOutContactsExcluded || 0,
      noPromotionalOffers: true
    }
  };
}

function computeChanges(current, previous) {
  return {
    sent: delta(current.sent, previous.sent),
    openRate: delta(current.openRate, previous.openRate),
    clickRate: delta(current.clickRate, previous.clickRate),
    replyRate: delta(current.replyRate, previous.replyRate),
    bounceRate: delta(current.bounceRate, previous.bounceRate),
    unsubscribeRate: delta(current.unsubscribeRate, previous.unsubscribeRate)
  };
}

function analyzePerformance(thisWeek, changes) {
  const working = [];
  const notWorking = [];

  // Open rate analysis
  if (thisWeek.openRate >= 0.20) {
    working.push(`Strong open rate (${pct(thisWeek.openRate)}) — subject lines are resonating with the audience.`);
  } else if (thisWeek.openRate < 0.10 && thisWeek.sent > 0) {
    notWorking.push(`Low open rate (${pct(thisWeek.openRate)}) — subject lines need improvement. Try shorter, more personalized subject lines.`);
  }

  // Click rate analysis
  if (thisWeek.clickRate >= 0.03) {
    working.push(`Healthy click rate (${pct(thisWeek.clickRate)}) — email content is engaging and driving action.`);
  } else if (thisWeek.clickRate < 0.01 && thisWeek.sent > 0) {
    notWorking.push(`Low click rate (${pct(thisWeek.clickRate)}) — content may not have a clear CTA or compelling offer.`);
  }

  // Reply rate analysis
  if (thisWeek.replyRate >= 0.02) {
    working.push(`Good reply rate (${pct(thisWeek.replyRate)}) — recipients are finding the content relevant enough to respond.`);
  }

  // Bounce rate analysis
  if (thisWeek.bounceRate > 0.05) {
    notWorking.push(`High bounce rate (${pct(thisWeek.bounceRate)}) — list quality issue. Clean hard bounces and verify email addresses.`);
  }

  // Unsubscribe analysis
  if (thisWeek.unsubscribeRate > 0.01) {
    notWorking.push(`Elevated unsubscribe rate (${pct(thisWeek.unsubscribeRate)}) — content may be too frequent or not relevant. Review frequency and segmentation.`);
  }

  // Trend analysis
  if (changes) {
    if (changes.openRate?.direction === 'down' && Math.abs(changes.openRate.percentage) >= 10) {
      notWorking.push(`Open rate dropped ${Math.abs(changes.openRate.percentage)}% week-over-week — investigate subject line changes or list fatigue.`);
    }
    if (changes.clickRate?.direction === 'up' && changes.clickRate.percentage >= 10) {
      working.push(`Click rate improved ${changes.clickRate.percentage}% week-over-week — current content strategy is gaining traction.`);
    }
  }

  // If nothing flagged
  if (working.length === 0 && thisWeek.sent === 0) {
    working.push('No campaigns sent this week — first week of monitoring.');
  }

  return { working, notWorking };
}

function buildNextWeekPlan(thisWeek, analysis, scanReport) {
  const plan = [];

  // Template optimization
  if (analysis.notWorking.some(w => w.includes('open rate'))) {
    plan.push('Create 2–3 new subject line variants via GHL V2 Templates API. A/B test against current baseline.');
  }
  if (analysis.notWorking.some(w => w.includes('click rate'))) {
    plan.push('Revise email body content — add clearer CTA, test different content structures. Create new template variant.');
  }

  // Segmentation actions
  if (scanReport.tierSummary) {
    if (scanReport.tierSummary.cooling?.actionableCount > 0) {
      plan.push(`Tag ${scanReport.tierSummary.cooling.actionableCount} cooling contacts with 'reactivation-cooling' for nurture workflow enrollment.`);
    }
    if (scanReport.tierSummary.dormant?.actionableCount > 0) {
      plan.push(`Tag ${scanReport.tierSummary.dormant.actionableCount} dormant contacts with 'reactivation-dormant' for full reactivation sequence.`);
    }
  }

  // Monitoring
  plan.push('Monitor open rates, click rates, and replies via GHL V2 Statistics API throughout the week.');

  // Default if nothing specific
  if (plan.length <= 1) {
    plan.push('Continue current strategy. Monitor for any week-over-week declines.');
  }

  return plan;
}

function buildTrendView(thisWeek, trendHistory = []) {
  if (!Array.isArray(trendHistory) || trendHistory.length === 0) {
    return {
      weeksTracked: 1,
      trend: 'insufficient-data',
      note: 'First week of tracking. Trend data will be available after 4 weeks.'
    };
  }

  const allWeeks = [...trendHistory, thisWeek].slice(-4);
  const openRates = allWeeks.map(w => w.openRate || 0);
  const clickRates = allWeeks.map(w => w.clickRate || 0);

  const openTrend = openRates[openRates.length - 1] > openRates[0] ? 'improving' :
    openRates[openRates.length - 1] < openRates[0] ? 'declining' : 'stable';
  const clickTrend = clickRates[clickRates.length - 1] > clickRates[0] ? 'improving' :
    clickRates[clickRates.length - 1] < clickRates[0] ? 'declining' : 'stable';

  return {
    weeksTracked: allWeeks.length,
    openRateTrend: openTrend,
    clickRateTrend: clickTrend,
    weeklyOpenRates: openRates,
    weeklyClickRates: clickRates,
    autoPauseTriggered: openTrend === 'declining' && allWeeks.length >= 4
  };
}

function assessOverallStatus(thisWeek, changes) {
  if (thisWeek.sent === 0) return 'monitoring';
  if (thisWeek.openRate >= 0.20 && thisWeek.clickRate >= 0.02) return 'healthy';
  if (thisWeek.bounceRate > 0.05 || thisWeek.unsubscribeRate > 0.02) return 'warning';
  if (changes?.openRate?.direction === 'down' && Math.abs(changes.openRate.percentage) >= 20) return 'underperforming';
  return 'stable';
}

// ─── Markdown Rendering ──────────────────────────────────────────────────────

/**
 * Render the weekly report as markdown for PDF generation downstream.
 */
function renderMarkdown(report) {
  const lines = [];
  const hr = '---';

  lines.push(`# Customer Reengagement Weekly Report`);
  lines.push(`**${report.clientName}** | Week of ${report.period.weekOf} | Generated ${report.period.generated}`);
  lines.push(hr);

  // Section 1
  lines.push(`## 📊 This Week's Numbers`);
  lines.push(`| Metric | Value |`);
  lines.push(`|--------|-------|`);
  lines.push(`| Sent | ${report.section1_thisWeekNumbers.sent} |`);
  lines.push(`| Delivered | ${report.section1_thisWeekNumbers.delivered} |`);
  lines.push(`| Opened | ${report.section1_thisWeekNumbers.opened} (${pct(report.section1_thisWeekNumbers.openRate)}) |`);
  lines.push(`| Clicked | ${report.section1_thisWeekNumbers.clicked} (${pct(report.section1_thisWeekNumbers.clickRate)}) |`);
  lines.push(`| Replied | ${report.section1_thisWeekNumbers.replied} (${pct(report.section1_thisWeekNumbers.replyRate)}) |`);
  lines.push(`| Bounced | ${report.section1_thisWeekNumbers.bounced} (${pct(report.section1_thisWeekNumbers.bounceRate)}) |`);
  lines.push(`| Unsubscribed | ${report.section1_thisWeekNumbers.unsubscribed} (${pct(report.section1_thisWeekNumbers.unsubscribeRate)}) |`);
  lines.push('');

  // Section 2
  if (report.section2_whatChanged) {
    lines.push(`## 🔄 What Changed (vs. Last Week)`);
    const c = report.section2_whatChanged;
    const fmt = (d) => d ? `${d.direction === 'up' ? '↑' : d.direction === 'down' ? '↓' : '→'} ${Math.abs(d.percentage)}%` : '—';
    lines.push(`| Metric | Change |`);
    lines.push(`|--------|--------|`);
    lines.push(`| Sent | ${fmt(c.sent)} |`);
    lines.push(`| Open Rate | ${fmt(c.openRate)} |`);
    lines.push(`| Click Rate | ${fmt(c.clickRate)} |`);
    lines.push(`| Reply Rate | ${fmt(c.replyRate)} |`);
    lines.push(`| Bounce Rate | ${fmt(c.bounceRate)} |`);
    lines.push('');
  } else {
    lines.push(`## 🔄 What Changed`);
    lines.push(`First week of tracking — no previous data for comparison.`);
    lines.push('');
  }

  // Section 3
  lines.push(`## ✅ What's Working`);
  report.section3_whatsWorking.working.forEach(w => lines.push(`- ${w}`));
  if (report.section3_whatsWorking.working.length === 0) lines.push('- Nothing flagged as working yet.');
  lines.push('');
  lines.push(`## ❌ What's Not Working`);
  report.section3_whatsWorking.notWorking.forEach(w => lines.push(`- ${w}`));
  if (report.section3_whatsWorking.notWorking.length === 0) lines.push('- Nothing flagged as underperforming.');
  lines.push('');

  // Section 4
  lines.push(`## 📋 Plan for Next Week`);
  report.section4_planForNextWeek.forEach((p, i) => lines.push(`${i + 1}. ${p}`));
  lines.push('');

  // Section 5
  lines.push(`## 📈 Cumulative Trend`);
  const t = report.section5_cumulativeTrend;
  lines.push(`Weeks tracked: ${t.weeksTracked}`);
  if (t.openRateTrend) lines.push(`Open rate trend: **${t.openRateTrend}**`);
  if (t.clickRateTrend) lines.push(`Click rate trend: **${t.clickRateTrend}**`);
  if (t.autoPauseTriggered) {
    lines.push('');
    lines.push(`⚠️ **AUTO-PAUSE TRIGGERED** — 4+ weeks of declining performance. Recommending strategy shift.`);
  }
  lines.push(hr);

  // Scan summary
  if (report.scanSummary) {
    lines.push(`## 🔍 Scan Summary`);
    lines.push(report.scanSummary);
  }

  // Safety footer
  lines.push('');
  lines.push(`*Rate limit: ${report.safety.rateLimitPerWeek}/week | Opted-out excluded: ${report.safety.optedOutExcluded} | No promotional offers sent without explicit approval.*`);

  return lines.join('\n');
}

/**
 * Save report to file.
 */
function saveReport(report, outputDir) {
  const dir = outputDir || path.join(__dirname, '..', 'memory');
  const dateStr = new Date().toISOString().split('T')[0];
  const jsonFile = path.join(dir, `${dateStr}-weekly-report.json`);
  const mdFile = path.join(dir, `${dateStr}-weekly-report.md`);

  fs.writeFileSync(jsonFile, JSON.stringify(report, null, 2));
  fs.writeFileSync(mdFile, renderMarkdown(report));

  return { jsonFile, mdFile };
}

module.exports = {
  buildWeeklyReport,
  renderMarkdown,
  saveReport,
  pct,
  delta
};
