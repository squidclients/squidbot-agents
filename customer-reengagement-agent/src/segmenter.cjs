'use strict';

/**
 * Segment patients by days since last visit into cadence buckets.
 * @param {Array<{id: string, lastVisit: string, optedOut?: boolean, tags?: string[]}>} patients
 * @param {number[]} cadenceDays - e.g. [30, 90, 180, 365]
 * @returns {{ok: boolean, data?: Array<{patientId: string, cadenceDay: number, daysSince: number}>, error?: string}}
 */
function segmentPatients(patients, cadenceDays) {
  if (!Array.isArray(patients)) return { ok: false, error: 'patients must be an array' };
  if (!Array.isArray(cadenceDays) || cadenceDays.length === 0) return { ok: false, error: 'cadenceDays must be a non-empty array' };

  const now = new Date();
  const results = [];
  const cadenceSet = new Set(cadenceDays);

  for (const patient of patients) {
    if (!patient.id || !patient.lastVisit) continue;

    const lastVisitDate = new Date(patient.lastVisit);
    if (isNaN(lastVisitDate.getTime())) continue;

    const daysSince = Math.floor((now - lastVisitDate) / (1000 * 60 * 60 * 24));

    if (cadenceSet.has(daysSince)) {
      results.push({
        patientId: patient.id,
        cadenceDay: daysSince,
        daysSince,
        lastVisitType: patient.lastVisitType || null,
        tags: patient.tags || [],
        optedOut: patient.optedOut || false,
        firstName: patient.firstName || null,
      });
    }
  }

  return { ok: true, data: results };
}

/**
 * Filter out opted-out patients.
 * @param {Array} patients
 * @param {string[]} optOutTags
 * @returns {{ok: boolean, data?: Array, error?: string}}
 */
function filterOptedOut(patients, optOutTags) {
  if (!Array.isArray(patients)) return { ok: false, error: 'patients must be an array' };
  if (!Array.isArray(optOutTags)) optOutTags = [];

  const tagSet = new Set(optOutTags.map(t => t.toLowerCase()));
  const filtered = patients.filter(p => {
    if (p.optedOut) return false;
    const patientTags = (p.tags || []).map(t => t.toLowerCase());
    return !patientTags.some(t => tagSet.has(t));
  });

  return { ok: true, data: filtered };
}

/**
 * Check if patient has already been contacted at this cadence.
 * @param {object} patient
 * @param {number} cadenceDay
 * @param {Array} contactLog
 * @returns {{ok: boolean, data: {canContact: boolean, reason?: string}}}
 */
function checkCadence(patient, cadenceDay, contactLog) {
  if (!patient || !patient.patientId) return { ok: false, error: 'patient with patientId required' };
  if (!Array.isArray(contactLog)) return { ok: true, data: { canContact: true } };

  const alreadyContacted = contactLog.some(
    entry => entry.patientId === patient.patientId && entry.cadenceDay === cadenceDay
  );

  if (alreadyContacted) {
    return { ok: true, data: { canContact: false, reason: `Already contacted at ${cadenceDay}-day cadence` } };
  }

  return { ok: true, data: { canContact: true } };
}

/**
 * Determine message priority based on cadence and patient signals.
 * @param {object} patient
 * @returns {{ok: boolean, data: {priority: string, reason: string}}}
 */
function assessPriority(patient) {
  if (!patient) return { ok: false, error: 'patient required' };

  const day = patient.cadenceDay || patient.daysSince || 0;

  // 365-day lapsed = high priority (long absence, harder to recover)
  if (day >= 365) return { ok: true, data: { priority: 'high', reason: '365+ days lapsed — high recovery value' } };
  // 180-day = medium-high
  if (day >= 180) return { ok: true, data: { priority: 'medium', reason: '180-day lapsed — moderate recovery opportunity' } };
  // 90-day = medium
  if (day >= 90) return { ok: true, data: { priority: 'medium', reason: '90-day lapsed' } };
  // 30-day = standard
  return { ok: true, data: { priority: 'low', reason: '30-day lapsed — standard check-in' } };
}

module.exports = { segmentPatients, filterOptedOut, checkCadence, assessPriority };
