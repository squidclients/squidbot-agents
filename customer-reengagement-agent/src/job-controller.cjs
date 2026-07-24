#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');

const AGENT_ID = 'customer-reengagement';

function readJson(file, fallback = null) {
  try { return JSON.parse(fs.readFileSync(file, 'utf8')); } catch { return fallback; }
}

function listJobs() {
  const dir = path.join(__dirname, '..', 'jobs');
  return fs.readdirSync(dir).filter(f => f.endsWith('.job.json')).map(f => readJson(path.join(dir, f))).filter(Boolean);
}

function getJob(jobId) {
  return listJobs().find(j => j.id === jobId || j.name === jobId) || null;
}

function chooseJob(input = {}) {
  if (input.jobId) return getJob(input.jobId);
  const text = String(input.intent || input.prompt || input._?.join(' ') || '').toLowerCase();
  return listJobs().find(job => [job.name, job.id, ...(job.triggers || [])].some(t => text.includes(String(t).toLowerCase()))) || listJobs()[0];
}

function loadSubagents(job) {
  return (job.subagents || []).map(id => ({ id, prompt: fs.readFileSync(path.join(__dirname, '..', 'subagents', id + '.md'), 'utf8') }));
}

function loadSkill(skillId) {
  return readJson(path.join(__dirname, '..', 'skills', skillId + '.json'), { id: skillId, description: 'Skill stub' });
}

function riskCheck(job, input = {}) {
  const requiresApproval = job.requiresApproval === true || (job.riskLevel && job.riskLevel !== 'low');
  return { requiresApproval, riskLevel: job.riskLevel || 'low', reason: requiresApproval ? 'Job is configured to require approval before external action.' : 'Low-risk/internal job.' };
}

async function runJob(input = {}) {
  const job = chooseJob(input);
  if (!job) throw new Error('No job definitions found.');
  const subagents = loadSubagents(job);
  const skills = (job.skills || []).map(loadSkill);
  const risk = riskCheck(job, input);
  return {
    ok: true,
    agentId: AGENT_ID,
    jobId: job.id,
    jobName: job.name,
    mode: job.schedule ? 'scheduled' : 'on-demand',
    subagents: subagents.map(s => s.id),
    skills: skills.map(s => s.id),
    risk,
    summary: AGENT_ID + ' prepared job "' + job.name + '" with ' + subagents.length + ' sub-agents and ' + skills.length + ' skills.',
    approvalRequired: risk.requiresApproval
  };
}

module.exports = { listJobs, chooseJob, runJob };

if (require.main === module) {
  const args = process.argv.slice(2);
  const argObj = { _: args.filter(a => !a.startsWith('--')) };
  for (const arg of args) if (arg.startsWith('--job=')) argObj.jobId = arg.slice(6);
  runJob(argObj).then(r => console.log(JSON.stringify(r, null, 2))).catch(e => { console.error(e.stack || e.message); process.exit(1); });
}
