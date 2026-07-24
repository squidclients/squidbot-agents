'use strict';

/**
 * @module churn-analyzer
 * Analyzes churn signals and suggests win-back strategies.
 */

/** @enum {string} */
const CHURN_CATEGORIES = {
  PRICE: 'price',
  SERVICE: 'service',
  COMPETITION: 'competition',
  TIMING: 'timing',
  OTHER: 'other',
};

/**
 * Identify churn signals from client history.
 * @param {object} client - Client record
 * @param {object} history - Activity history
 * @param {string[]} [history.complaints] - Complaint topics
 * @param {string[]} [history.supportTickets] - Support ticket subjects
 * @param {boolean} [history.paymentDeclined] - Whether payment was declined
 * @param {boolean} [history.contractCancelled] - Whether contract was cancelled
 * @param {string} [history.competitorMentioned] - Competitor name if mentioned
 * @param {number} [history.lastActivityDays] - Days since last activity
 * @returns {{ok: true, data: {signals: string[], severity: 'low'|'medium'|'high'}}}
 */
function identifyChurnSignals(client, history) {
  if (!client || typeof client !== 'object') {
    return { ok: false, error: 'client is required' };
  }
  if (!history || typeof history !== 'object') {
    return { ok: false, error: 'history is required' };
  }

  /** @type {string[]} */
  const signals = [];

  if (history.paymentDeclined) signals.push('payment_declined');
  if (history.contractCancelled) signals.push('contract_cancelled');
  if (history.competitorMentioned) signals.push('competitor_mentioned');
  if (Array.isArray(history.complaints) && history.complaints.length > 0) {
    signals.push('recent_complaints');
  }
  if (Array.isArray(history.supportTickets) && history.supportTickets.length >= 3) {
    signals.push('high_support_volume');
  }
  if (history.lastActivityDays > 60) {
    signals.push('prolonged_inactivity');
  }

  const severity = signals.length >= 3 ? 'high' : signals.length >= 2 ? 'medium' : 'low';

  return { ok: true, data: { signals, severity } };
}

/**
 * Categorize the churn reason.
 * @param {string} reason - Raw churn reason text
 * @returns {{ok: true, data: {category: string, confidence: number}}}
 */
function categorizeChurn(reason) {
  if (!reason || typeof reason !== 'string') {
    return { ok: false, error: 'reason must be a non-empty string' };
  }

  const lower = reason.toLowerCase();

  const keywords = {
    [CHURN_CATEGORIES.PRICE]: ['price', 'cost', 'expensive', 'budget', 'afford', 'money', 'cheaper'],
    [CHURN_CATEGORIES.SERVICE]: ['quality', 'service', 'response', 'slow', 'support', 'error', 'mistake', 'unhappy'],
    [CHURN_CATEGORIES.COMPETITION]: ['competitor', 'switching to', 'alternative', 'better option', 'went with'],
    [CHURN_CATEGORIES.TIMING]: ['timing', 'not ready', 'pause', 'later', 'season', 'busy', 'revisit'],
  };

  /** @type {{category: string, score: number}[]} */
  const scores = [];
  for (const [cat, words] of Object.entries(keywords)) {
    const score = words.filter((w) => lower.includes(w)).length;
    if (score > 0) scores.push({ category: cat, score });
  }

  scores.sort((a, b) => b.score - a.score);

  if (scores.length === 0) {
    return { ok: true, data: { category: CHURN_CATEGORIES.OTHER, confidence: 0.3 } };
  }

  const total = scores.reduce((s, x) => s + x.score, 0);
  return {
    ok: true,
    data: { category: scores[0].category, confidence: Math.min(scores[0].score / total, 1) },
  };
}

/**
 * Suggest the best win-back angle based on churn category.
 * @param {string} category - Churn category from categorizeChurn
 * @returns {{ok: true, data: {angle: string, approach: string, offerType: string}}}
 */
function suggestWinBackAngle(category) {
  const valid = Object.values(CHURN_CATEGORIES);
  if (!valid.includes(category)) {
    return { ok: false, error: `Unknown category: ${category}. Valid: ${valid.join(', ')}` };
  }

  /** @type {Record<string, {angle: string, approach: string, offerType: string}>} */
  const strategies = {
    [CHURN_CATEGORIES.PRICE]: {
      angle: 'value_realignment',
      approach: 'Highlight ROI and offer a tailored plan that fits their budget.',
      offerType: 'discount_or_tiered_pricing',
    },
    [CHURN_CATEGORIES.SERVICE]: {
      angle: 'service_recovery',
      approach: 'Acknowledge past issues, share improvements made, offer a trial period.',
      offerType: 'free_trial_or_service_credit',
    },
    [CHURN_CATEGORIES.COMPETITION]: {
      angle: 'differentiation',
      approach: 'Emphasize unique value props they won\'t get elsewhere.',
      offerType: 'exclusive_feature_or_lock_in',
    },
    [CHURN_CATEGORIES.TIMING]: {
      angle: 'gentle_nurture',
      approach: 'Stay top of mind with value-first content, no hard sell.',
      offerType: 'resource_or_consultation',
    },
    [CHURN_CATEGORIES.OTHER]: {
      angle: 'personal_check_in',
      approach: 'Open-ended check-in to understand current needs.',
      offerType: 'conversation',
    },
  };

  return { ok: true, data: strategies[category] };
}

module.exports = { identifyChurnSignals, categorizeChurn, suggestWinBackAngle, CHURN_CATEGORIES };
