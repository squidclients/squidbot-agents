'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const { getConfig, buildCRMPayload, submitToSquidCRM, getCampaignStats, listTemplates, createTemplate } = require('../src/squid-crm-client.cjs');

const opportunity = {
  customerId: 'cust_001',
  name: 'Maya Chen',
  email: 'maya@example.com',
  phone: null,
  service: 'monthly care plan',
  lifetimeValue: 4200,
  dormantDays: 251,
  segment: 'high-value win-back',
  score: 100,
  recommendedOffer: 'Personal check-in',
  draftMessage: 'Hi Maya, want to book back in?'
};

test('getConfig resolves location and API key from defaults', () => {
  const config = getConfig({ dryRun: true });
  assert.equal(config.baseUrl, 'https://services.leadconnectorhq.com');
  assert.ok(config.locationId);
});

test('builds CRM payload from opportunity (backward compat)', () => {
  const payload = buildCRMPayload({ ...opportunity, approved: true, approvedBy: 'owner' });
  assert.equal(payload.source, 'squidbot.customer-reengagement');
  assert.equal(payload.recipient.email, 'maya@example.com');
  assert.equal(payload.channel, 'email');
  assert.equal(payload.approval.approved, true);
});

test('requires approval before CRM submission (backward compat)', async () => {
  const result = await submitToSquidCRM(opportunity, { dryRun: true, apiKey: '' });
  assert.equal(result.ok, true);
  assert.equal(result.approvalRequired, true);
  assert.equal(result.queued, false);
});

test('approved dry-run queues without live API key', async () => {
  const result = await submitToSquidCRM({ ...opportunity, approved: true }, { dryRun: true, apiKey: '' });
  assert.equal(result.ok, true);
  assert.equal(result.queued, true);
  assert.equal(result.dryRun, true);
});

test('getCampaignStats returns dryRun when no API key', async () => {
  const result = await getCampaignStats('email-campaigns', 'camp_123', { dryRun: true, apiKey: '' });
  assert.equal(result.ok, true);
  assert.equal(result.dryRun, true);
});

test('listTemplates returns dryRun when no API key', async () => {
  const result = await listTemplates({}, { dryRun: true, apiKey: '' });
  assert.equal(result.ok, true);
  assert.equal(result.dryRun, true);
});

test('createTemplate returns dryRun when no API key', async () => {
  const result = await createTemplate({
    name: 'Win-back v2',
    subjectLine: 'We miss you!',
    editorContent: '<p>Test</p>'
  }, { dryRun: true, apiKey: '' });
  assert.equal(result.ok, true);
  assert.equal(result.dryRun, true);
});
