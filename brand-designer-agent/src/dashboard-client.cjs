'use strict';

async function postJson(apiBase, endpoint, body, options = {}) {
  if (options.dryRun || !apiBase) return { ok: true, dryRun: true, endpoint, ...body };
  const res = await fetch(new URL(endpoint, apiBase), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });
  if (!res.ok) throw new Error(`Dashboard POST ${endpoint} failed: ${res.status}`);
  return res.json();
}

async function postRequest(payload, options = {}) {
  const response = await postJson(options.apiBase, '/api/requests', payload, options);
  return response.request || response;
}

async function postActivity(payload, options = {}) {
  return postJson(options.apiBase, '/api/agent-activity', payload, options);
}

async function postMetric(agentId, metric, value, unit = 'number', options = {}) {
  return postJson(options.apiBase, '/api/metrics', { agentId, metric, value, unit, timestamp: new Date().toISOString() }, options);
}



module.exports = { postRequest, postActivity, postMetric };
