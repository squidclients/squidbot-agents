'use strict';

/**
 * Reply Engine
 *
 * Takes an incoming message from a contact + campaign context,
 * crafts a brand-voice response that pushes toward the desired outcome,
 * validates it through guardrails, and returns the approved reply.
 */

const { enforceGuardrails } = require('./guardrails.cjs');
const { matchCampaign } = require('./template-library.cjs');

/**
 * Categorize the intent of an incoming message.
 */
function categorizeIntent(message = '') {
  const text = message.toLowerCase().trim();
  if (/stop|unsubscribe|leave me alone|don't contact|remove|opt.out|cancel/i.test(text)) return 'opt-out';
  if (/not interested|not right now|maybe later|not at this time|i'm good|no thanks|no thank/i.test(text)) return 'not-interested';
  if (/how much|what does it cost|pricing|price|fee|how much is|cost/i.test(text)) return 'price-inquiry';
  if (/yes|sure|okay|ok|let's do it|i'm in|tell me more|interested|what do you have|let me see/i.test(text)) return 'interested';
  if (/book|schedule|appointment|come in|visit|when|time|available|calendar|slot/i.test(text)) return 'booking-intent';
  if (/what|when|who|where|why|how|tell me|explain|more info|details|question/i.test(text)) return 'information-seek';
  if (/thanks|thank you|appreciate|great|awesome|cool|good/i.test(text)) return 'positive-acknowledgment';
  return 'general-inquiry';
}

/**
 * Generate a reply based on intent, campaign context, and desired outcome type.
 */
function generateReply(intent, context = {}) {
  const { brandVoice = {}, desiredOutcome = 'booking', contactName = '', campaignName = '' } = context;
  const tone = brandVoice.tone || 'friendly';
  const formality = brandVoice.formality || 'casual';
  const outcomeLabel = desiredOutcome === 'booking' ? 'appointment'
    : desiredOutcome === 'quote' ? 'quick call'
    : desiredOutcome === 'consultation' ? 'consultation'
    : 'appointment';

  const getOutcomeQuestion = () => {
    if (desiredOutcome === 'booking') return 'I can get you booked in';
    if (desiredOutcome === 'quote') return 'I can put together a quote';
    if (desiredOutcome === 'consultation') return 'I can schedule a quick consultation';
    return 'I can help with that';
  };

  const getAvailability = () => {
    return formality === 'formal'
      ? 'this week or next'
      : 'this week';
  };

  const responses = {
    'opt-out': {
      text: `Got it, ${contactName}. You're removed from our list. Sorry for the bother.`,
      actionTag: 'do-not-contact',
      stopConversation: true
    },
    'not-interested': {
      text: `No problem at all, ${contactName}. I'll leave it here for now. If anything changes down the road, you know where to find us. Take care!`,
      actionTag: 'not-interested',
      stopConversation: true
    },
    'price-inquiry': {
      text: `Great question! I'm happy to share pricing with you — but first, would it be alright if I sent over the full details? I want to make sure you get the right option for your situation.`,
      actionTag: 'pricing-asked',
      stopConversation: false
    },
    'interested': {
      text: `That's great to hear, ${contactName}! ${getOutcomeQuestion()}${getAvailability() ? ` — I've got ${getAvailability()}.` : ''} What does your schedule look like?`,
      actionTag: 'interested',
      stopConversation: false
    },
    'booking-intent': {
      text: `Perfect! I've got ${getAvailability()}. What day works best for you? Just reply with a time and I'll get you confirmed.`,
      actionTag: 'booking-started',
      stopConversation: false
    },
    'information-seek': {
      text: `Happy to share more details! What specifically would you like to know? I want to make sure I answer the right questions for you.`,
      actionTag: 'info-requested',
      stopConversation: false
    },
    'positive-acknowledgment': {
      text: `You're welcome, ${contactName}! If there's anything else I can help with, just let me know. Otherwise, ${getOutcomeQuestion()} whenever you're ready.`,
      actionTag: null,
      stopConversation: false
    },
    'general-inquiry': {
      text: `Thanks for reaching out, ${contactName}! I'd love to help. ${getOutcomeQuestion()}${getAvailability() ? ` I've got ${getAvailability()}.` : ''} What works for you?`,
      actionTag: 'engaged',
      stopConversation: false
    }
  };

  return responses[intent] || responses['general-inquiry'];
}

/**
 * Full pipeline: categorize → generate → guardrail → return.
 */
async function processReply(incomingMessage, context = {}) {
  // 1. Categorize intent
  const intent = categorizeIntent(incomingMessage);

  // 2. Generate response
  const reply = generateReply(intent, context);

  // 3. Run guardrails
  const guardrailResult = enforceGuardrails(reply.text, context);

  if (!guardrailResult.passed) {
    // If guardrails flag the response, return a safe fallback
    const violations = guardrailResult.violations.map(v => v.label).join(', ');
    return {
      ok: false,
      intent,
      originalReply: reply,
      violations: guardrailResult.violations,
      safeFallback: {
        text: `Thanks for your message, ${context.contactName || ''}! I'd love to help — give me just a moment to get the right info for you.`,
        actionTag: null,
        stopConversation: false
      }
    };
  }

  return {
    ok: true,
    intent,
    reply,
    guardrailResult
  };
}

module.exports = { processReply, categorizeIntent, generateReply };
