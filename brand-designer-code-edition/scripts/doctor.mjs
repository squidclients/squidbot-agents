import fs from 'node:fs';

const providerReady = Boolean(process.env.OPENAI_API_KEY || process.env.OPENAI_TOKEN || (process.env.CUSTOM_IMAGE_API_URL && (process.env.CUSTOM_IMAGE_API_KEY || process.env.CUSTOM_IMAGE_TOKEN)));
const checks = [
  ['image provider configured', providerReady],
  ['approved brand profile exists', fs.existsSync(process.env.BRAND_PROFILE_PATH || './brand/profile.json')],
  ['approved assets directory exists', fs.existsSync(process.env.BRAND_ASSETS_DIR || './brand/assets')]
];
for (const [label, ok] of checks) console.log(`${ok ? 'PASS' : 'MISSING'}  ${label}`);
if (checks.some(([, ok]) => !ok)) process.exitCode = 1;
