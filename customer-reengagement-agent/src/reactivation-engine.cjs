'use strict';

/**
 * Reactivation Engine V2
 *
 * Segments contacts into engagement tiers (warm / cooling / dormant),
 * scores reactivation opportunities, and generates the weekly scan report.
 *
 * Tiers:
 *   Warm    — 0–30 days since last engagement (monitoring only)
 *   Cooling — 30–60 days (proactive nurture, tag for light touch)
 *   Dormant — 60+ days (or configurable threshold → full reactivation)
 *
 * Dormancy threshold default: 60 days (configurable: 30/60/90)
 */

const fs = require('fs');
const path = require('path');

const MS_PER_DAY = 24 * 60 * 60 * 1000;

// ─── Defaults ────────────────────────────────────────────────────────────────

const DEFAULT_DORMANT_THRESHOLD_DAYS = 60;
const DEFAULT_COOLING_THRESHOLD_DAYS = 30;
const DEFAULT_WARM_THRESHOLD_DAYS = 0;
const DEFAULT_RATE_LIMIT_PER_WEEK = 500;

// ─── Date Helpers ────────────────────────────────────────────────────────────

function parseDate(value) {
  if (!value) return null;
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? null : d;
}

function daysSince(value, now = new Date()) {
  const d = parseDate(value);
  if (!d) return null;
  return Math.max(0, Math.floor((now.getTime() - d.getTime()) / MS_PER_DAY));
}

function currency(n) {
  const value = Number(n || 0);
  return '$' + Math.round(value).toLocaleString('en-US');
}

// ─── Data Loading ────────────────────────────────────────────────────────────

function readJson(file, fallback = null) {
  try {
    return JSON.parse(fs.readFileSync(file, 'utf8'));
  } catch {
    return fallback;
  }
}

function loadCustomerData(options = {}) {
  if (Array.isArray(options.customers)) return options.customers;
  const explicit = options.customerFile || process.env.CUSTOMER_REENGAGEMENT_CUSTOMERS_FILE;
  const candidates = [
    explicit,
    path.join(process.cwd(), 'data', 'customers.json'),
    path.join(process.cwd(), 'data', 'crm', 'customers.json'),
    path.join(__dirname, '..', 'fixtures', 'customers.sample.json')
  ].filter(Boolean);

  for (const file of candidates) {
    const rows = readJson(file);
    if (Array.isArray(rows)) return rows;
    if (Array.isArray(rows?.customers)) return rows.customers;
  }
  return [];
}

// ─── Contact Normalization ───────────────────────────────────────────────────

function normalizeCustomer(row = {}) {
  const lastPurchaseAt = row.lastPurchaseAt || row.last_purchase_at || row.lastOrderDate || row.last_visit_at || row.lastVisitAt || row.dateAdded;
  const lastContactAt = row.lastContactAt || row.last_contact_at || row.lastMessageAt || row.lastEmailOpenAt || row.lastSmsResponseAt;
  const lifetimeValue = Number(row.lifetimeValue ?? row.ltv ?? row.totalSpent ?? row.total_spent ?? 0);
  const lastEmailOpenAt = row.lastEmailOpenAt || row.last_email_open_at;
  const lastSmsResponseAt = row.lastSmsResponseAt || row.last_sms_response_at;
  const emailOptOut = row.emailOptOut || row.opt_out || row.unsubscribed || row.doNotContact || false;
  const tags = Array.isArray(row.tags) ? row.tags : [];

  return {
    id: String(row.id || row.contactId || row.customerId || row.email || row.phone || row.name || 'unknown'),
    name: row.name || [row.firstName, row.lastName].filter(Boolean).join(' ') || 'Customer',
    email: row.email || null,
    phone: row.phone || null,
    service: row.service || row.lastService || row.product || row.lastProduct || 'previous service',
    lastPurchaseAt,
    lastContactAt,
    lastEmailOpenAt,
    lastSmsResponseAt,
    lifetimeValue,
    purchaseCount: Number(row.purchaseCount ?? row.orders ?? row.visits ?? 0),
    tags,
    emailOptOut,
    notes: row.notes || ''
  };
}

// ─── Engagement Segmentation ─────────────────────────────────────────────────

/**
 * Determine engagement tier for a contact.
 *
 * @param {object} customer - Normalized customer
 * @param {object} thresholds - { warm, cooling, dormant } in days
 * @param {Date} now
 * @returns {{ tier: string, daysSinceLastEngagement: number, engagementSignal: string }}
 */
function getEngagementTier(customer, thresholds = {}, now = new Date()) {
  const coolingThreshold = thresholds.cooling ?? DEFAULT_COOLING_THRESHOLD_DAYS;
  const dormantThreshold = thresholds.dormant ?? DEFAULT_DORMANT_THRESHOLD_DAYS;

  // Use the most recent engagement signal
  const purchaseDays = daysSince(customer.lastPurchaseAt, now);
  const contactDays = daysSince(customer.lastContactAt, now);
  const emailOpenDays = daysSince(customer.lastEmailOpenAt, now);
  const smsResponseDays = daysSince(customer.lastSmsResponseAt, now);

  const allSignals = [purchaseDays, contactDays, emailOpenDays, smsResponseDays]
    .filter(d => d !== null && d !== undefined);

  // If we have no engagement data at all, treat as dormant
  const daysSinceLastEngagement = allSignals.length > 0
    ? Math.min(...allSignals)
    : null;

  let tier;
  let engagementSignal;

  if (daysSinceLastEngagement === null) {
    tier = 'dormant';
    engagementSignal = 'no-engagement-data';
  } else if (daysSinceLastEngagement < coolingThreshold) {
    tier = 'warm';
    engagementSignal = 'recent-activity';
  } else if (daysSinceLastEngagement < dormantThreshold) {
    tier = 'cooling';
    engagementSignal = 'declining-activity';
  } else {
    tier = 'dormant';
    engagementSignal = 'no-recent-activity';
  }

  return { tier, daysSinceLastEngagement, engagementSignal };
}

// ─── Scoring ─────────────────────────────────────────────────────────────────

/**
 * Score a contact's reactivation priority.
 * Higher score = higher priority for reactivation.
 */
function scoreCustomer(customerRaw, now = new Date()) {
  // Ensure customer is normalized (tags array, emailOptOut boolean)
  const customer = customerRaw.tags && Array.isArray(customerRaw.tags)
    ? customerRaw
    : normalizeCustomer(customerRaw);
  const dormantDays = daysSince(customer.lastPurchaseAt, now);
  const contactDays = daysSince(customer.lastContactAt, now);
  const ltv = customer.lifetimeValue;
  let score = 0;

  // Dormancy scoring — longer dormant = higher priority for reactivation
  if (dormantDays === null) score += 5;
  else if (dormantDays >= 365) score += 30;
  else if (dormantDays >= 180) score += 28;
  else if (dormantDays >= 90) score += 22;
  else if (dormantDays >= 60) score += 18;
  else if (dormantDays >= 30) score += 10;

  // LTV scoring
  if (ltv >= 5000) score += 30;
  else if (ltv >= 2000) score += 24;
  else if (ltv >= 750) score += 16;
  else if (ltv >= 250) score += 8;

  // Purchase frequency
  if (customer.purchaseCount >= 5) score += 18;
  else if (customer.purchaseCount >= 2) score += 12;
  else if (customer.purchaseCount === 1) score += 5;

  // Contact gap
  if (contactDays === null || contactDays >= 30) score += 12;

  // Contactable
  if (customer.email || customer.phone) score += 10;

  // VIP/high-value tags
  if (customer.tags.some(t => /vip|high.value|repeat|referral/i.test(String(t)))) score += 10;

  // Zero out opted-out contacts
  if (customer.emailOptOut || customer.tags.some(t => /do.not.contact|dnc|unsubscribed|opt.out/i.test(String(t)))) {
    score = 0;
  }

  const segment = score >= 75 ? 'high-value win-back'
    : score >= 50 ? 'warm reactivation'
    : score >= 30 ? 'nurture'
    : 'low priority';

  return { score: Math.min(100, score), dormantDays, contactDays, segment };
}

// ─── Recommended Actions ─────────────────────────────────────────────────────

function getRecommendedTag(tier) {
  switch (tier) {
    case 'cooling': return 'reactivation-cooling';
    case 'dormant': return 'reactivation-dormant';
    default: return null; // warm → no tag needed
  }
}

function recommendedAction(customer, tier, score) {
  if (customer.emailOptOut) return 'No action — contact has opted out';
  if (tier === 'warm') return 'Monitor — engagement is healthy';
  if (tier === 'cooling') return `Tag for proactive nurture (reactivation-cooling). Light touch: helpful content, check-in, no hard ask.`;
  if (tier === 'dormant') {
    if (score.segment === 'high-value win-back') return `Full reactivation sequence (reactivation-dormant). Priority contact — high LTV, multiple purchases.`;
    if (score.segment === 'warm reactivation') return `Full reactivation sequence (reactivation-dormant). Moderate priority.`;
    return `Include in reactivation batch (reactivation-dormant). Standard outreach.`;
  }
  return 'No action recommended';
}

// ─── Report Builder ──────────────────────────────────────────────────────────

/**
 * Build the full reactivation scan report.
 *
 * @param {object} options - { now, dormantThresholdDays, coolingThresholdDays, limit, customers, customerFile }
 * @returns {object} Full scan report with tiered segments
 */
function buildReactivationReport(options = {}) {
  const now = options.now ? new Date(options.now) : new Date();
  const dormantThresholdDays = Number(options.dormantThresholdDays || process.env.CUSTOMER_REENGAGEMENT_DORMANT_DAYS || DEFAULT_DORMANT_THRESHOLD_DAYS);
  const coolingThresholdDays = Number(options.coolingThresholdDays || DEFAULT_COOLING_THRESHOLD_DAYS);
  const rateLimitPerWeek = Number(options.rateLimitPerWeek || process.env.CUSTOMER_REENGAGEMENT_RATE_LIMIT || DEFAULT_RATE_LIMIT_PER_WEEK);

  const thresholds = {
    warm: DEFAULT_WARM_THRESHOLD_DAYS,
    cooling: coolingThresholdDays,
    dormant: dormantThresholdDays
  };

  const customers = loadCustomerData(options).map(normalizeCustomer);

  // Segment contacts into tiers
  const tiered = customers.map(customer => {
    const tierInfo = getEngagementTier(customer, thresholds, now);
    const score = scoreCustomer(customer, now);
    return { customer, ...tierInfo, score };
  });

  const warm = tiered.filter(t => t.tier === 'warm');
  const cooling = tiered.filter(t => t.tier === 'cooling');
  const dormant = tiered.filter(t => t.tier === 'dormant');

  // Filter out opted-out and low-priority from actionable opportunities
  const actionable = tiered
    .filter(t => t.tier !== 'warm')
    .filter(t => !t.customer.emailOptOut)
    .filter(t => !t.customer.tags.some(tag => /do.not.contact|dnc|unsubscribed|opt.out/i.test(String(tag))))
    .filter(t => t.score.score >= 30)
    .sort((a, b) => b.score.score - a.score.score)
    .slice(0, Number(options.limit || Math.max(25, rateLimitPerWeek)))
    .map(({ customer, tier, daysSinceLastEngagement, engagementSignal, score }) => ({
      customerId: customer.id,
      name: customer.name,
      email: customer.email,
      phone: customer.phone,
      service: customer.service,
      lifetimeValue: customer.lifetimeValue,
      tier,
      daysSinceLastEngagement,
      engagementSignal,
      dormantDays: score.dormantDays,
      segment: score.segment,
      score: score.score,
      recommendedTag: getRecommendedTag(tier),
      recommendedAction: recommendedAction(customer, tier, score),
      tags: customer.tags
    }));

  // Calculate estimated recoverable pipeline
  const estimatedPipeline = actionable.reduce((sum, o) => sum + Math.max(100, o.lifetimeValue * 0.25), 0);
  const highValueCount = actionable.filter(o => o.segment === 'high-value win-back').length;
  const dormantActionable = actionable.filter(o => o.tier === 'dormant').length;
  const coolingActionable = actionable.filter(o => o.tier === 'cooling').length;

  return {
    agentId: 'customer-reengagement',
    status: 'completed',
    generatedAt: now.toISOString(),
    thresholds: { cooling: coolingThresholdDays, dormant: dormantThresholdDays, rateLimitPerWeek },
    summary: actionable.length
      ? `Found ${actionable.length} reactivation opportunities (${dormantActionable} dormant, ${coolingActionable} cooling). ${highValueCount} high-value win-back candidates. Estimated recoverable pipeline: ${currency(estimatedPipeline)}. Rate limit: ${rateLimitPerWeek}/week.`
      : 'No reactivation opportunities met the current threshold.',
    metrics: {
      customersAnalyzed: customers.length,
      warmContacts: warm.length,
      coolingContacts: cooling.length,
      dormantContacts: dormant.length,
      actionableOpportunities: actionable.length,
      highValueOpportunities: highValueCount,
      estimatedRecoverablePipeline: Math.round(estimatedPipeline),
      rateLimitPerWeek
    },
    tierSummary: {
      warm: { count: warm.length, action: 'monitoring only' },
      cooling: { count: cooling.length, action: 'tag for proactive nurture', actionableCount: coolingActionable },
      dormant: { count: dormant.length, action: 'tag for full reactivation sequence', actionableCount: dormantActionable }
    },
    opportunities: actionable,
    nextActions: actionable.length ? [
      `Tag ${coolingActionable} cooling contacts with reactivation-cooling`,
      `Tag ${dormantActionable} dormant contacts with reactivation-dormant`,
      'GHL workflows will auto-enroll tagged contacts',
      'Monitor campaign performance via V2 Statistics API',
      'Create optimized template variants based on results'
    ] : [
      'Lower the dormant threshold or connect a richer CRM dataset.'
    ],
    safety: {
      defaultMode: 'review-only',
      externalMessagesSent: 0,
      approvalRequiredBeforeSending: true,
      optedOutContactsExcluded: customers.filter(c => c.emailOptOut).length
    }
  };
}

module.exports = {
  buildReactivationReport,
  scoreCustomer,
  normalizeCustomer,
  getEngagementTier,
  daysSince,
  DEFAULT_DORMANT_THRESHOLD_DAYS,
  DEFAULT_COOLING_THRESHOLD_DAYS,
  DEFAULT_RATE_LIMIT_PER_WEEK
};
