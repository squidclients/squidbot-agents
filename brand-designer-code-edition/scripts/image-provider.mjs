import fs from 'node:fs/promises';

const args = Object.fromEntries(process.argv.slice(2).map(a => a.replace(/^--/, '').split('=')));
if (!args['prompt-file'] || !args.out) throw new Error('Use --prompt-file=<path> --out=<path>.');
const prompt = await fs.readFile(args['prompt-file'], 'utf8');
const width = Number(args.width || 1536);
const height = Number(args.height || 1024);
const provider = process.env.IMAGE_PROVIDER || 'openai';

let response;
if (provider === 'openai') {
  const authValue = process.env.OPENAI_API_KEY || process.env.OPENAI_TOKEN;
  if (!authValue) throw new Error('OPENAI_API_KEY or OPENAI_TOKEN is required.');
  response = await fetch('https://api.openai.com/v1/images/generations', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${authValue}` },
    body: JSON.stringify({ model: process.env.OPENAI_IMAGE_MODEL || 'gpt-image-2', prompt, size: `${width}x${height}`, response_format: 'b64_json' })
  });
} else if (provider === 'custom') {
  const authValue = process.env.CUSTOM_IMAGE_API_KEY || process.env.CUSTOM_IMAGE_TOKEN;
  if (!process.env.CUSTOM_IMAGE_API_URL || !authValue) throw new Error('Custom provider URL and token are required.');
  response = await fetch(process.env.CUSTOM_IMAGE_API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${authValue}` },
    body: JSON.stringify({ prompt, width, height, format: 'png' })
  });
} else throw new Error(`Unsupported IMAGE_PROVIDER: ${provider}`);

if (!response.ok) throw new Error(`Image provider failed: ${response.status} ${await response.text()}`);
const data = await response.json();
const b64 = data.data?.[0]?.b64_json || data.imageBase64;
if (b64) await fs.writeFile(args.out, Buffer.from(b64, 'base64'));
else if (data.imageUrl) {
  const image = await fetch(data.imageUrl);
  if (!image.ok) throw new Error(`Image download failed: ${image.status}`);
  await fs.writeFile(args.out, Buffer.from(await image.arrayBuffer()));
} else throw new Error('Provider returned neither imageBase64 nor imageUrl.');
console.log(args.out);
