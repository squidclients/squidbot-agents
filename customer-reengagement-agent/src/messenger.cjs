'use strict';

const CADENCE_TEMPLATES = {
  30: {
    tone: 'friendly_checkin',
    subject: 'We miss seeing you!',
    body: 'Hi {{FIRST_NAME}}, it\'s been about a month since your last visit. Just a friendly reminder that we\'re here whenever you\'re ready to come back. No rush at all.',
    cta: 'Book when you\'re ready',
  },
  90: {
    tone: 'gentle_reminder',
    subject: 'Thinking of you',
    body: 'Hi {{FIRST_NAME}}, it\'s been a little while since we last saw you. We hope everything is going well. Our doors are always open — feel free to book when it works for you.',
    cta: 'Schedule a visit',
  },
  180: {
    tone: 'warm_reconnect',
    subject: 'We\'d love to see you again',
    body: 'Hi {{FIRST_NAME}}, it\'s been a few months and we wanted to reach out. We\'d love to welcome you back whenever you\'re ready. No pressure, just wanted to say hello.',
    cta: 'Find a time that works',
  },
  365: {
    tone: 'anniversary_checkin',
    subject: 'It\'s been a year — let\'s reconnect',
    body: 'Hi {{FIRST_NAME}}, it\'s been about a year since your last visit. We\'d love to hear how you\'re doing and welcome you back. Whenever you\'re ready, we\'re here.',
    cta: 'Book your visit',
  },
};

/**
 * Generate a re-engagement message for a patient at a given cadence.
 * @param {object} patient - { patientId, firstName, cadenceDay, lastVisitType }
 * @param {object} config - { bookingUrl }
 * @returns {{ok: boolean, data?: object, error?: string}}
 */
function generateMessage(patient, config) {
  if (!patient || !patient.patientId) return { ok: false, error: 'patient with patientId required' };

  const cadenceDay = patient.cadenceDay;
  const template = CADENCE_TEMPLATES[cadenceDay];
  if (!template) return { ok: false, error: `No template for cadence day ${cadenceDay}` };

  const firstName = patient.firstName || 'there';
  const bookingUrl = config.bookingUrl || '#';

  const body = template.body.replace('{{FIRST_NAME}}', firstName);
  const subject = template.subject;

  return {
    ok: true,
    data: {
      patientId: patient.patientId,
      cadenceDay,
      tone: template.tone,
      subject,
      body,
      cta: template.cta,
      bookingUrl,
      generatedAt: new Date().toISOString(),
    },
  };
}

/**
 * Personalize message with last visit type if available and approved.
 * @param {object} message - Output from generateMessage
 * @param {string} lastVisitType - e.g. "adjustment", "consultation"
 * @returns {{ok: boolean, data?: object, error?: string}}
 */
function personalizeWithVisitType(message, lastVisitType) {
  if (!message) return { ok: false, error: 'message required' };
  if (!lastVisitType) return { ok: true, data: message };

  // Only add a gentle reference — no clinical details
  const personalLine = `It was great seeing you for your ${lastVisitType.toLowerCase()}.`;
  const personalized = {
    ...message,
    body: `${personalLine}\n\n${message.body}`,
    personalized: true,
  };

  return { ok: true, data: personalized };
}

/**
 * List available cadence templates.
 * @returns {{ok: boolean, data: object[]}}
 */
function listTemplates() {
  return {
    ok: true,
    data: Object.entries(CADENCE_TEMPLATES).map(([day, tmpl]) => ({
      cadenceDay: Number(day),
      tone: tmpl.tone,
      subject: tmpl.subject,
    })),
  };
}

module.exports = { generateMessage, personalizeWithVisitType, listTemplates, CADENCE_TEMPLATES };
