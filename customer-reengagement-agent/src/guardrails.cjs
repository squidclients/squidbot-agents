'use strict';

/**
 * Guardrail Enforcer
 *
 * Validates every response before it gets sent to a real person.
 * If a response violates any guardrail, it gets blocked and logged.
 */

const GUARDRAILS = [
  {
    id: 'no-unauthorized-pricing',
    label: 'Never promise discounts or pricing unless explicitly authorized',
    check: (text) => {
      const pricingPatterns = /(\$[\d,]+\.?\d*|\d+%\s*off|discount|special\s*price|on sale)/i;
      return pricingPatterns.test(text) ? 'Response contains pricing without authorization' : null;
    }
  },
  {
    id: 'no-medical-claims',
    label: 'Never make medical claims, diagnose conditions, or guarantee health outcomes',
    check: (text) => {
      const medicalPatterns = /\b(cure|cures|heal|heals|diagnos(e|ed)|guarantee.*(pain|relief|health|result)|treat(s|ed|ing)\s+(condition|disease))\b/i;
      return medicalPatterns.test(text) ? 'Response contains medical claims' : null;
    }
  },
  {
    id: 'no-result-guarantees',
    label: 'Never guarantee business results or revenue',
    check: (text) => {
      const guaranteePatterns = /\b(guarantee|guaranteed|promise|promised|100%\s*(result|satisfaction|certain)|definitely\s*(see|get|improve))\b/i;
      return guaranteePatterns.test(text) ? 'Response contains result guarantees' : null;
    }
  },
  {
    id: 'no-competitor-bashing',
    label: 'Never badmouth competitors or compare negatively',
    check: (text) => {
      const competitorPatterns = /\b(other\s+companies?\s+(can't|won't|don't|fail)|better\s+than\s+(the\s+)?competition|competitors?\s+(suck|are\s+terrible|cannot))\b/i;
      return competitorPatterns.test(text) ? 'Response contains competitor bashing' : null;
    }
  },
  {
    id: 'no-fabrication',
    label: 'Never fabricate responses — acknowledge uncertainty instead',
    check: (text) => {
      const fabricationPatterns = /\b(I\s+(can|could|will)\s+definitely|rest\s+assured|without\s+a\s+doubt)\b/i;
      return fabricationPatterns.test(text) ? 'Response may contain over-promising language' : null;
    }
  },
  {
    id: 'stay-in-brand-voice',
    label: 'Stay in brand voice — don\'t switch tone mid-conversation',
    check: (text, context) => {
      if (context?.brandVoice?.tone) {
        const casualWords = /\b(yo|sup|gonna|wanna|gotta|nah|yeah\s+boi|dope|lit)\b/i;
        const formalWords = /\b(henceforth|heretofore|aforementioned|pursuant|herewith)\b/i;
        if (context.brandVoice.tone === 'professional' && casualWords.test(text)) {
          return 'Response tone is too casual for a professional brand voice';
        }
        if (context.brandVoice.tone === 'casual' && formalWords.test(text)) {
          return 'Response tone is too formal for a casual brand voice';
        }
      }
      return null;
    }
  },
  {
    id: 'no-personal-info',
    label: 'Never share personal or private information',
    check: (text) => {
      const personalPatterns = /\b(\d{3}[-\s]?\d{2}[-\s]?\d{4}|(home|personal)\s*(address|phone|email)|social\s*security|credit\s*card)\b/i;
      return personalPatterns.test(text) ? 'Response may contain personal information' : null;
    }
  }
];

function enforceGuardrails(text, context = {}) {
  const violations = [];
  for (const guardrail of GUARDRAILS) {
    const result = guardrail.check(text, context);
    if (result) {
      violations.push({ guardrailId: guardrail.id, label: guardrail.label, reason: result });
    }
  }
  return {
    passed: violations.length === 0,
    violations,
    text
  };
}

function getGuardrailSummary() {
  return GUARDRAILS.map(g => `- ${g.label}`).join('\n');
}

module.exports = { enforceGuardrails, getGuardrailSummary, GUARDRAILS };
