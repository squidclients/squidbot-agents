#!/usr/bin/env node
'use strict';

const { postRequest, postActivity, postMetric } = require('./dashboard-client.cjs');
const { runJob } = require('./job-controller.cjs');

const AGENT_ID = 'brand-designer';
const AGENT_NAME = "Brand Designer";
const DEPARTMENT = 'growth';

function parseArgs(argv = process.argv.slice(2)) {
  const args = { _: [] };
  for (const arg of argv) {
    if (arg.startsWith('--job=')) args.jobId = arg.slice(6);
    else if (arg === '--dry-run' || arg === '--dryRun') args.dryRun = true;
    else if (arg.startsWith('--prompt=')) args.prompt = arg.slice(9);
    else args._.push(arg);
  }
  return args;
}

async function run(options = {}) {
  const jobResult = await runJob(options);
  const summary = options.dryRun ? 'Dry run: ' + jobResult.summary : jobResult.summary;
  await postRequest({ user: AGENT_NAME, action: jobResult.jobName, status: jobResult.approvalRequired ? 'needs_approval' : 'completed', type: 'agent', details: summary, priority: jobResult.risk?.riskLevel === 'high' ? 'high' : 'normal' });
  await postActivity({ agentId: AGENT_ID, department: DEPARTMENT, action: jobResult.jobName, status: jobResult.approvalRequired ? 'needs_approval' : 'completed', details: summary, metadata: jobResult });
  await postMetric({ agent: AGENT_ID, metric: 'jobsRun', value: 1, unit: 'count' });
  return { ...jobResult, dryRun: !!options.dryRun };
}



module.exports = { run };

if (require.main === module) {
  run(parseArgs()).then(r => console.log(JSON.stringify(r, null, 2))).catch(err => { console.error(err.stack || err.message); process.exit(1); });
}
