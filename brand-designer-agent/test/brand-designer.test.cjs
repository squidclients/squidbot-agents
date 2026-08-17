'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const { run } = require('../src/agent.cjs');

test('brand-designer dry run reports successfully', async () => {
  const result = await run({ dryRun: true });
  assert.equal(result.ok, true);
  assert.equal(result.agentId, 'brand-designer');
});
