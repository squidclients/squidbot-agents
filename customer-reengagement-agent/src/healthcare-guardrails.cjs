'use strict';

// ═══════════════════════════════════════════════════════════════
// GLOBAL SQUIDBOT GUARDRAILS — Included in every agent.
// ═══════════════════════════════════════════════════════════════
// You are part of the SquidBot business operations system.
//
// MUST:
// - Stay inside your assigned role.
// - Use only your assigned tools.
// - Prefer drafting over executing.
// - Request approval for risky, external, financial, scheduling,
//   legal, reputational, or irreversible actions.
// - Use client-provided facts only.
// - Clearly say when information is missing.
// - Escalate when confidence is low.
// - Log all meaningful actions.
//
// MUST NOT:
// - Never invent policies, pricing, timelines, guarantees,
//   credentials, testimonials, reviews, or results.
// - Never expose private client data to unrelated agents, users,
//   or outputs.
// - Never delete records unless a specific approved tool and
//   approval flow allows it.
// - Never bypass permissions.
// - Never use hidden reasoning as output.
// - Never continue a workflow if the required client configuration
//   is missing.
//
// DEFAULT: When in doubt, stop and ask for approval.
// ═══════════════════════════════════════════════════════════════

/**
 * Guardrails for Lapsed Patient Re-engagement Agent.
 * Prevents: sensitive medical details in outbound, fear-based language, clinical pressure,
 *           contacting opted-out patients, exceeding approved cadence.
 * @module guardrails
 */

const ALLOWED_ACTIONS = [
  'segment_patients', 'personalize_by_visit_type', 'draft_reactivation_message',
  'send_approved_message', 'route_reply_to_booking', 'tag_reengagement_status',
  'notify_staff_of_priority_reply',
];

const BLOCKED_ACTIONS = [
  'reference_medical_details', 'use_fear_language', 'claim_condition_worsen',
  'say_patient_needs_treatment', 'contact_opted_out', 'exceed_cadence',
  'make_clinical_claims', 'diagnose_patient', 'pressure_patient',
];

const FEAR_LANGUAGE_PATTERNS = [
  'may worsen', 'could get worse', 'condition will deteriorate',
  'risk of complications', 'dangerous to wait', 'don\'t ignore',
  'serious consequences', 'permanent damage', 'irreversible',
  'you need to come in before', 'act now before it\'s too late',
  'your health is at risk', 'delaying could cause',
];

const CLINICAL_PRESSURE_PATTERNS = [
  'you need treatment', 'you should come in for',
  'your condition requires', 'necessary to treat',
  'we recommend you come in for', 'you must schedule',
  'important that you receive', 'without treatment you',
  'your spine needs', 'your body requires',
];

const DIAGNOSIS_PATTERNS = [
  'your diagnosis', 'your condition indicates', 'based on your symptoms',
  'your test results show', 'your x-ray reveals', 'you may have',
  'we detected', 'your examination shows',
];

/**
 * Check if an action is allowed.
 */
function isActionAllowed(action) {
  if (!action) return { ok: false, error: 'action is required' };
  if (ALLOWED_ACTIONS.includes(action)) return { ok: true, data: { allowed: true } };
  if (BLOCKED_ACTIONS.includes(action)) return { ok: true, data: { allowed: false, reason: `Blocked: "${action}"` } };
  return { ok: true, data: { allowed: false, reason: `Unknown: "${action}"` } };
}

/**
 * Validate message has no fear-based language.
 */
function validateNoFearLanguage(content) {
  if (!content) return { ok: true, data: { clean: true, flags: [] } };

  const flags = [];
  const lower = content.toLowerCase();
  for (const phrase of FEAR_LANGUAGE_PATTERNS) {
    if (lower.includes(phrase)) flags.push(`Fear language: "${phrase}"`);
  }
  return { ok: true, data: { clean: flags.length === 0, flags } };
}

/**
 * Validate no clinical pressure or "needs treatment" language.
 */
function validateNoClinicalPressure(content) {
  if (!content) return { ok: true, data: { clean: true, flags: [] } };

  const flags = [];
  const lower = content.toLowerCase();
  for (const phrase of CLINICAL_PRESSURE_PATTERNS) {
    if (lower.includes(phrase)) flags.push(`Clinical pressure: "${phrase}"`);
  }
  return { ok: true, data: { clean: flags.length === 0, flags } };
}

/**
 * Validate no diagnosis language in outbound.
 */
function validateNoDiagnosis(content) {
  if (!content) return { ok: true, data: { clean: true, flags: [] } };

  const flags = [];
  const lower = content.toLowerCase();
  for (const phrase of DIAGNOSIS_PATTERNS) {
    if (lower.includes(phrase)) flags.push(`Diagnosis language: "${phrase}"`);
  }
  return { ok: true, data: { clean: flags.length === 0, flags } };
}

/**
 * Validate no sensitive medical details in outbound message.
 */
function validateNoMedicalDetails(message) {
  if (!message || !message.body) return { ok: true, data: { clean: true, flags: [] } };

  const flags = [];
  const lower = message.body.toLowerCase();

  // Generic medical detail patterns that shouldn't be in outbound
  const medicalDetailPatterns = [
    'diagnosis of', 'treatment plan for', 'prescribed',
    'your pain level', 'your symptoms of', 'condition: ',
    'referring you for', 'lab results', 'imaging shows',
  ];

  for (const phrase of medicalDetailPatterns) {
    if (lower.includes(phrase)) flags.push(`Medical detail: "${phrase}"`);
  }
  return { ok: true, data: { clean: flags.length === 0, flags } };
}

/**
 * Validate patient is not opted out.
 */
function validateNotOptedOut(patient, optOutTags) {
  if (!patient) return { ok: false, error: 'patient required' };
  if (!Array.isArray(optOutTags)) optOutTags = [];

  const tagSet = new Set(optOutTags.map(t => t.toLowerCase()));
  if (patient.optedOut) return { ok: true, data: { canContact: false, reason: 'Patient opted out' } };

  const patientTags = (patient.tags || []).map(t => t.toLowerCase());
  const optedOutTag = patientTags.find(t => tagSet.has(t));
  if (optedOutTag) return { ok: true, data: { canContact: false, reason: `Opt-out tag: "${optedOutTag}"` } };

  return { ok: true, data: { canContact: true } };
}

/**
 * Validate cadence not exceeded (not already contacted at this interval).
 */
function validateCadence(patient, cadenceDay, contactLog) {
  if (!patient || !patient.id) return { ok: false, error: 'patient with id required' };
  if (!Array.isArray(contactLog)) return { ok: true, data: { withinCadence: true } };

  const alreadyContacted = contactLog.some(
    entry => entry.patientId === patient.id && entry.cadenceDay === cadenceDay
  );

  if (alreadyContacted) {
    return { ok: true, data: { withinCadence: false, reason: `Already contacted at ${cadenceDay}-day interval` } };
  }

  return { ok: true, data: { withinCadence: true } };
}

module.exports = {
  isActionAllowed,
  validateNoFearLanguage,
  validateNoClinicalPressure,
  validateNoDiagnosis,
  validateNoMedicalDetails,
  validateNotOptedOut,
  validateCadence,
};
