'use strict';

/**
 * SquidCRM / GHL V2 API Client
 *
 * Provides access to:
 *   - Contacts (list, search, tag)
 *   - Email Templates (list, create, get, update — V2 API)
 *   - Email Campaigns (list, create, update, schedule — V2 API)
 *   - Campaign Statistics (sent, delivered, opened, clicked, replied, rates — V2 API)
 *   - Workflow Email Campaigns (read-only — V2 API)
 *
 * All V2 email endpoints require Version header: 2021-07-28
 */

const GHL_BASE_URL = 'https://services.leadconnectorhq.com';
const V2_VERSION_HEADER = '2021-07-28';
const CONTACTS_VERSION_HEADER = '2021-07-28';
const DEFAULT_TIMEOUT_MS = 30000;

// ─── Config ──────────────────────────────────────────────────────────────────

function getConfig(options = {}) {
  // Resolve API key: options > GHL_API_KEY env > SQUID_CRM_TOKEN env (legacy)
  const apiKey = options.apiKey !== undefined ? options.apiKey :
    process.env.GHL_API_KEY ||
    process.env.GHL_AGENCY_API_KEY ||
    process.env.SQUID_CRM_TOKEN ||
    '';

  // Resolve location ID
  const locationId = options.locationId ||
    process.env.GHL_LOCATION_ID ||
    process.env.SQUID_CRM_LOCATION_ID ||
    'np6jeBrccG4Prj895HAU'; // SquidCircle default

  // dryRun is true only if explicitly set OR no apiKey available
  const hasKey = !!apiKey;
  const dryRun = options.dryRun === true || (!hasKey && options.dryRun !== false);

  return {
    baseUrl: options.baseUrl || GHL_BASE_URL,
    apiKey,
    locationId,
    dryRun,
    timeoutMs: Number(options.timeoutMs || DEFAULT_TIMEOUT_MS)
  };
}

// ─── HTTP Helper ─────────────────────────────────────────────────────────────

async function ghlFetch(endpoint, options = {}) {
  const config = getConfig(options);
  const url = endpoint.startsWith('http') ? endpoint : `${config.baseUrl}${endpoint}`;

  if (config.dryRun && !options._live) {
    return { ok: true, dryRun: true, url, method: options.method || 'GET' };
  }

  const headers = {
    'Authorization': `Bearer ${config.apiKey}`,
    'Content-Type': 'application/json',
    'Version': options.versionHeader || V2_VERSION_HEADER,
    'Accept': 'application/json'
  };

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), config.timeoutMs);

  try {
    const fetchOpts = {
      method: options.method || 'GET',
      headers,
      signal: controller.signal
    };
    if (options.body && options.method !== 'GET') {
      fetchOpts.body = typeof options.body === 'string' ? options.body : JSON.stringify(options.body);
    }
    const res = await fetch(url, fetchOpts);
    const text = await res.text();
    let parsed = null;
    try { parsed = text ? JSON.parse(text) : null; } catch { parsed = { raw: text }; }

    if (!res.ok) {
      return {
        ok: false,
        status: res.status,
        error: `GHL API ${res.status}: ${res.statusText}`,
        url,
        method: options.method || 'GET',
        body: parsed
      };
    }
    return { ok: true, status: res.status, data: parsed };
  } catch (err) {
    return {
      ok: false,
      error: err.name === 'AbortError' ? 'Request timed out' : err.message,
      url,
      method: options.method || 'GET'
    };
  } finally {
    clearTimeout(timer);
  }
}

// ─── Contacts ────────────────────────────────────────────────────────────────

/**
 * List/search contacts in a location.
 * GET /contacts/?locationId={loc}&query=...&tags=...&limit=...
 */
async function listContacts(params = {}, options = {}) {
  const config = getConfig(options);
  const qs = new URLSearchParams({ locationId: config.locationId });
  if (params.query) qs.set('query', params.query);
  if (params.tags) qs.set('tags', Array.isArray(params.tags) ? params.tags.join(',') : params.tags);
  if (params.email) qs.set('email', params.email);
  if (params.phone) qs.set('phone', params.phone);
  qs.set('limit', String(params.limit || 100));
  if (params.startAfterId) qs.set('startAfterId', params.startAfterId);

  return ghlFetch(`/contacts/?${qs.toString()}`, {
    ...options,
    versionHeader: CONTACTS_VERSION_HEADER
  });
}

/**
 * Get a single contact by ID.
 */
async function getContact(contactId, options = {}) {
  const config = getConfig(options);
  return ghlFetch(`/contacts/${contactId}?locationId=${config.locationId}`, {
    ...options,
    versionHeader: CONTACTS_VERSION_HEADER
  });
}

/**
 * Update a contact (e.g., add tags).
 * PUT /contacts/{id}?locationId={loc}
 */
async function updateContact(contactId, body, options = {}) {
  const config = getConfig(options);
  return ghlFetch(`/contacts/${contactId}?locationId=${config.locationId}`, {
    ...options,
    method: 'PUT',
    body
  });
}

/**
 * Add tags to a contact.
 */
async function addContactTags(contactId, tags, options = {}) {
  return updateContact(contactId, { tags }, options);
}

// ─── Campaign Statistics (V2) ────────────────────────────────────────────────

/**
 * Get campaign statistics.
 * GET /emails/public/v2/locations/{loc}/campaigns/stats/{source}/{sourceId}
 *
 * @param {string} source - 'email-campaigns' | 'workflow-campaigns' | 'bulk-actions'
 * @param {string} sourceId - Campaign ID
 * @param {object} options - Optional config overrides
 * @returns {Promise<{ok, status?, data?, error?}>}
 */
async function getCampaignStats(source, sourceId, options = {}) {
  const config = getConfig(options);
  const endpoint = `/emails/public/v2/locations/${config.locationId}/campaigns/stats/${source}/${sourceId}`;
  return ghlFetch(endpoint, { ...options });
}

/**
 * Get stats for an email campaign.
 */
async function getEmailCampaignStats(campaignId, options = {}) {
  return getCampaignStats('email-campaigns', campaignId, options);
}

/**
 * Get stats for a workflow email campaign.
 */
async function getWorkflowCampaignStats(campaignId, options = {}) {
  return getCampaignStats('workflow-campaigns', campaignId, options);
}

/**
 * Get stats for a bulk action campaign.
 */
async function getBulkActionStats(campaignId, options = {}) {
  return getCampaignStats('bulk-actions', campaignId, options);
}

// ─── Email Templates (V2) ────────────────────────────────────────────────────

/**
 * List email templates.
 * GET /emails/public/v2/locations/{loc}/templates
 */
async function listTemplates(params = {}, options = {}) {
  const config = getConfig(options);
  const qs = new URLSearchParams();
  if (params.limit) qs.set('limit', String(params.limit));
  if (params.offset) qs.set('offset', String(params.offset));
  const query = qs.toString();
  const endpoint = `/emails/public/v2/locations/${config.locationId}/templates${query ? `?${query}` : ''}`;
  return ghlFetch(endpoint, options);
}

/**
 * Create a new email template.
 * POST /emails/public/v2/locations/{loc}/templates
 *
 * @param {object} template - { name, subjectLine, editorType, editorContent }
 */
async function createTemplate(template, options = {}) {
  const config = getConfig(options);
  const body = {
    name: template.name,
    subjectLine: template.subjectLine || template.subject || '',
    editorType: template.editorType || 'html',
    editorContent: template.editorContent || template.html || template.body || ''
  };
  return ghlFetch(`/emails/public/v2/locations/${config.locationId}/templates`, {
    ...options,
    method: 'POST',
    body
  });
}

/**
 * Get a single email template by ID.
 * GET /emails/public/v2/locations/{loc}/templates/{templateId}
 */
async function getTemplate(templateId, options = {}) {
  const config = getConfig(options);
  return ghlFetch(`/emails/public/v2/locations/${config.locationId}/templates/${templateId}`, options);
}

/**
 * Update an email template.
 * PATCH /emails/public/v2/locations/{loc}/templates/{templateId}
 *
 * NOTE: Prefer creating new variants over patching. Only use PATCH for
 * correcting errors in draft templates.
 */
async function updateTemplate(templateId, updates, options = {}) {
  const config = getConfig(options);
  const body = {};
  if (updates.name) body.name = updates.name;
  if (updates.subjectLine || updates.subject) body.subjectLine = updates.subjectLine || updates.subject;
  if (updates.editorType) body.editorType = updates.editorType;
  if (updates.editorContent || updates.html || updates.body) {
    body.editorContent = updates.editorContent || updates.html || updates.body;
  }
  return ghlFetch(`/emails/public/v2/locations/${config.locationId}/templates/${templateId}`, {
    ...options,
    method: 'PATCH',
    body
  });
}

// ─── Email Campaigns (V2) ────────────────────────────────────────────────────

/**
 * List email campaigns.
 * GET /emails/public/v2/locations/{loc}/campaigns/emails
 */
async function listEmailCampaigns(params = {}, options = {}) {
  const config = getConfig(options);
  const qs = new URLSearchParams();
  if (params.limit) qs.set('limit', String(params.limit));
  if (params.offset) qs.set('offset', String(params.offset));
  const query = qs.toString();
  const endpoint = `/emails/public/v2/locations/${config.locationId}/campaigns/emails${query ? `?${query}` : ''}`;
  return ghlFetch(endpoint, options);
}

/**
 * Create an email campaign.
 * POST /emails/public/v2/locations/{loc}/campaigns/emails
 */
async function createEmailCampaign(campaign, options = {}) {
  const config = getConfig(options);
  return ghlFetch(`/emails/public/v2/locations/${config.locationId}/campaigns/emails`, {
    ...options,
    method: 'POST',
    body: campaign
  });
}

/**
 * Update an email campaign.
 * PATCH /emails/public/v2/locations/{loc}/campaigns/emails/{campaignId}
 */
async function updateEmailCampaign(campaignId, updates, options = {}) {
  const config = getConfig(options);
  return ghlFetch(`/emails/public/v2/locations/${config.locationId}/campaigns/emails/${campaignId}`, {
    ...options,
    method: 'PATCH',
    body: updates
  });
}

/**
 * Schedule an email campaign.
 * POST /emails/public/v2/locations/{loc}/campaigns/emails/{campaignId}/schedule
 */
async function scheduleEmailCampaign(campaignId, schedule, options = {}) {
  const config = getConfig(options);
  return ghlFetch(`/emails/public/v2/locations/${config.locationId}/campaigns/emails/${campaignId}/schedule`, {
    ...options,
    method: 'POST',
    body: schedule
  });
}

// ─── Workflow Email Campaigns (V2 — read-only) ───────────────────────────────

/**
 * List workflow email campaigns.
 * GET /emails/public/v2/locations/{loc}/campaigns/workflows
 */
async function listWorkflowCampaigns(params = {}, options = {}) {
  const config = getConfig(options);
  const qs = new URLSearchParams();
  if (params.limit) qs.set('limit', String(params.limit));
  if (params.offset) qs.set('offset', String(params.offset));
  const query = qs.toString();
  const endpoint = `/emails/public/v2/locations/${config.locationId}/campaigns/workflows${query ? `?${query}` : ''}`;
  return ghlFetch(endpoint, options);
}

/**
 * Get a single workflow email campaign.
 * GET /emails/public/v2/locations/{loc}/campaigns/workflows/{campaignId}
 */
async function getWorkflowCampaign(campaignId, options = {}) {
  const config = getConfig(options);
  return ghlFetch(`/emails/public/v2/locations/${config.locationId}/campaigns/workflows/${campaignId}`, options);
}

// ─── Utility ─────────────────────────────────────────────────────────────────

/**
 * Rate-limited batch tagger.
 * Tags contacts in batches to respect GHL rate limits (~200 req/min).
 */
async function batchTagContacts(contactIds = [], tags = [], options = {}) {
  const config = getConfig(options);
  const batchSize = options.batchSize || 10;
  const delayMs = options.delayMs || 350; // ~170 req/min with batches of 10
  const results = [];

  for (let i = 0; i < contactIds.length; i += batchSize) {
    const batch = contactIds.slice(i, i + batchSize);
    const batchResults = await Promise.all(
      batch.map(id => addContactTags(id, tags, { ...options, dryRun: config.dryRun }))
    );
    results.push(...batchResults);
    if (i + batchSize < contactIds.length) {
      await new Promise(resolve => setTimeout(resolve, delayMs));
    }
  }

  return {
    ok: results.every(r => r.ok),
    totalContacts: contactIds.length,
    successful: results.filter(r => r.ok).length,
    failed: results.filter(r => !r.ok).length,
    results
  };
}

module.exports = {
  // Config
  getConfig,
  GHL_BASE_URL,
  V2_VERSION_HEADER,

  // HTTP
  ghlFetch,

  // Contacts
  listContacts,
  getContact,
  updateContact,
  addContactTags,
  batchTagContacts,

  // Campaign Statistics (V2)
  getCampaignStats,
  getEmailCampaignStats,
  getWorkflowCampaignStats,
  getBulkActionStats,

  // Email Templates (V2)
  listTemplates,
  createTemplate,
  getTemplate,
  updateTemplate,

  // Email Campaigns (V2)
  listEmailCampaigns,
  createEmailCampaign,
  updateEmailCampaign,
  scheduleEmailCampaign,

  // Workflow Campaigns (V2 — read-only)
  listWorkflowCampaigns,
  getWorkflowCampaign,

  // Legacy outbound (preserved for backward compat)
  buildCRMPayload,
  submitToSquidCRM,
  submitApprovedBatch
};

// ─── Legacy outbound (backward compat with old tests) ────────────────────────

function buildCRMPayload(opportunity, options = {}) {
  const channel = options.channel || (opportunity.phone ? 'sms' : 'email');
  return {
    source: 'squidbot.customer-reengagement',
    campaignId: options.campaignId || 'customer-reengagement-winback',
    customerId: opportunity.customerId,
    recipient: {
      name: opportunity.name,
      email: opportunity.email || null,
      phone: opportunity.phone || null
    },
    channel,
    subject: channel === 'email' ? options.subject || `Quick check-in about ${opportunity.service}` : undefined,
    message: opportunity.approvedMessage || opportunity.draftMessage,
    metadata: {
      service: opportunity.service,
      segment: opportunity.segment,
      score: opportunity.score,
      dormantDays: opportunity.dormantDays,
      lifetimeValue: opportunity.lifetimeValue,
      recommendedOffer: opportunity.recommendedOffer
    },
    approval: {
      required: true,
      approved: !!opportunity.approved,
      approvedBy: opportunity.approvedBy || null,
      approvedAt: opportunity.approvedAt || null
    }
  };
}

async function submitToSquidCRM(opportunity, options = {}) {
  const config = getConfig(options);
  const payload = buildCRMPayload(opportunity, options);

  if (!payload.message) {
    return { ok: false, skipped: true, reason: 'No draft message available', payload };
  }

  if (!payload.approval.approved) {
    return { ok: true, queued: false, approvalRequired: true, dryRun: config.dryRun, payload };
  }

  if (config.dryRun || !config.baseUrl) {
    return { ok: true, queued: true, dryRun: true, payload };
  }

  const endpoint = new URL(options.endpoint || '/api/outbound/messages', config.baseUrl);
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), config.timeoutMs);
  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(config.apiKey ? { Authorization: `Bearer ${config.apiKey}` } : {})
      },
      body: JSON.stringify(payload),
      signal: controller.signal
    });
    const body = await res.text();
    let parsed = null;
    try { parsed = body ? JSON.parse(body) : null; } catch { parsed = { raw: body }; }
    if (!res.ok) throw new Error(`Squid CRM POST failed: ${res.status}`);
    return { ok: true, queued: true, dryRun: false, response: parsed, payload };
  } finally {
    clearTimeout(timer);
  }
}

async function submitApprovedBatch(opportunities = [], options = {}) {
  const results = [];
  for (const opportunity of opportunities) {
    results.push(await submitToSquidCRM(opportunity, options));
  }
  return {
    ok: results.every(r => r.ok),
    attempted: opportunities.length,
    queued: results.filter(r => r.queued).length,
    approvalRequired: results.filter(r => r.approvalRequired).length,
    skipped: results.filter(r => r.skipped).length,
    results
  };
}
