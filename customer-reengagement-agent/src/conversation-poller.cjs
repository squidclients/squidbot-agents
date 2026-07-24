'use strict';

/**
 * GHL Conversation Poller
 *
 * Polls GHL Conversations API for new replies on active campaign contacts.
 * Runs on a cron every 5 minutes.
 * Finds conversations where:
 *   - Contact has tag 'reactivation-live'
 *   - Contact does NOT have tag 'booking-made' or 'do-not-contact'
 *   - There are unread/new messages from the contact
 */

const GHL_BASE_URL = 'https://services.leadconnectorhq.com';

function getConfig(options = {}) {
  return {
    apiKey: options.apiKey || process.env.GHL_API_KEY || process.env.GHL_AGENCY_API_KEY || '',
    locationId: options.locationId || process.env.GHL_LOCATION_ID || 'np6jeBrccG4Prj895HAU',
    dryRun: options.dryRun !== false && !process.env.GHL_API_KEY,
    timeoutMs: Number(options.timeoutMs || 30000)
  };
}

async function ghlFetch(endpoint, options = {}) {
  const config = getConfig(options);
  if (config.dryRun) {
    return { ok: true, dryRun: true, data: { conversations: [] } };
  }
  const url = `${GHL_BASE_URL}${endpoint}`;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), config.timeoutMs);
  try {
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${config.apiKey}`,
        'Content-Type': 'application/json',
        'Version': '2021-07-28',
        'Accept': 'application/json'
      },
      signal: controller.signal
    });
    clearTimeout(timer);
    const data = await res.json();
    return { ok: res.ok, data, status: res.status };
  } catch (err) {
    clearTimeout(timer);
    return { ok: false, error: err.message };
  }
}

async function ghlPost(endpoint, body, options = {}) {
  const config = getConfig(options);
  if (config.dryRun) {
    return { ok: true, dryRun: true };
  }
  const url = `${GHL_BASE_URL}${endpoint}`;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), config.timeoutMs);
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${config.apiKey}`,
        'Content-Type': 'application/json',
        'Version': '2021-07-28',
        'Accept': 'application/json'
      },
      body: JSON.stringify(body),
      signal: controller.signal
    });
    clearTimeout(timer);
    const data = await res.json();
    return { ok: res.ok, data, status: res.status };
  } catch (err) {
    clearTimeout(timer);
    return { ok: false, error: err.message };
  }
}

/**
 * Find active campaign conversations that have new contact replies.
 * Filters by tags: must have reactivation-live, must NOT have booking-made or do-not-contact.
 */
async function findNewReplies(options = {}) {
  const conversations = await ghlFetch(`/conversations/search?locationId=${getConfig(options).locationId}&status=unread&limit=50`, options);
  if (!conversations.ok) return { ok: false, error: conversations.error, conversations: [] };

  const results = [];
  const config = getConfig(options);
  for (const conv of (conversations.data?.conversations || [])) {
    const contactId = conv.contactId;
    if (!contactId) continue;

    // Check contact tags
    const contact = await ghlFetch(`/contacts/${contactId}?locationId=${config.locationId}`, options);
    if (!contact.ok || !contact.data?.contact) continue;

    const tags = contact.data.contact.tags || [];
    const tagStr = tags.map(t => String(t).toLowerCase());

    // Must have reactivation-live, must not have exit tags
    if (!tagStr.includes('reactivation-live')) continue;
    if (tagStr.some(t => ['booking-made', 'do-not-contact', 'not-interested', 'campaign-complete'].includes(t))) continue;

    // Get the latest messages in this conversation
    const messages = await ghlFetch(`/conversations/${conv.id}/messages?limit=5`, options);
    if (!messages.ok) continue;

    const recentMessages = (messages.data?.messages || []).slice(-3);
    const lastContactMessage = recentMessages.find(m => m.type === 'inbound' || m.direction === 'inbound');

    if (lastContactMessage) {
      results.push({
        conversationId: conv.id,
        contactId,
        contactName: contact.data.contact.name || 'Customer',
        contactPhone: contact.data.contact.phone,
        contactEmail: contact.data.contact.email,
        tags,
        lastMessage: lastContactMessage.body || lastContactMessage.content || '',
        lastMessageAt: lastContactMessage.dateAdded || lastContactMessage.createdAt,
        messageHistory: recentMessages.map(m => ({
          direction: m.type || m.direction,
          body: m.body || m.content || '',
          at: m.dateAdded || m.createdAt
        }))
      });
    }
  }
  return { ok: true, conversations: results };
}

/**
 * Send a reply via GHL Conversation AI API or standard Conversations API.
 */
async function sendReply(conversationId, message, options = {}) {
  const payload = {
    conversationId,
    message,
    type: 'SMS',
    direction: 'outbound'
  };

  // Try Conversation AI API first
  const result = await ghlPost(`/conversations/${conversationId}/messages`, payload, options);
  return result;
}

/**
 * Tag a contact in GHL.
 */
async function tagContact(contactId, tag, options = {}) {
  const config = getConfig(options);
  const payload = {
    tags: [tag],
    locationId: config.locationId
  };
  return await ghlPost(`/contacts/${contactId}/tags`, payload, options);
}

module.exports = { findNewReplies, sendReply, tagContact, getConfig };
