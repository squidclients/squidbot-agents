#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const exists = p => fs.existsSync(path.join(root, p));
const providerReady = Boolean(process.env.OPENAI_API_KEY || process.env.OPENAI_TOKEN || (process.env.CUSTOM_IMAGE_API_URL && (process.env.CUSTOM_IMAGE_API_KEY || process.env.CUSTOM_IMAGE_TOKEN)));
const checks = [
  ['image provider configured', providerReady],
  ['brand intake exists', exists('brand/intake.json')],
  ['approved brand profile exists', exists('brand/profile.json')],
  ['approved brand assets directory exists', exists('brand/assets')]
];

for (const [label, ok] of checks) console.log(`${ok ? 'PASS' : 'MISSING'}  ${label}`);
if (checks.some(([, ok]) => !ok)) {
  console.error('\nNot production-ready. Complete docs/SEASONING.md.');
  process.exitCode = 1;
} else {
  console.log('\nBrand Designer is ready for a calibration run.');
}
