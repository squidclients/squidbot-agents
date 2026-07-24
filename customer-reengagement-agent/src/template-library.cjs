'use strict';

/**
 * Template Library
 *
 * Loads the 9 swipe campaign templates from the First Win PDF.
 * Matches contact tags to the right campaign type.
 * Customizes templates with brand voice, audience, and offer details.
 */

const CAMPAIGN_TYPES = {
  'past-customer': {
    id: 'past-customer',
    name: 'Past Customer Check-In',
    type: 'relationship',
    description: 'Contact hasn\'t heard from you in a while. Warmth play.',
    matchTags: ['past-customer', 'lapsed-client', 'returning', 'inactive']
  },
  'inactive-patient': {
    id: 'inactive-patient',
    name: 'Inactive Patient/Client',
    type: 'opportunity',
    description: 'Overdue for routine appointment or checkup.',
    matchTags: ['overdue', 'inactive-patient', 'missed-appointment', 'recall']
  },
  'previous-quote': {
    id: 'previous-quote',
    name: 'Previous Quote',
    type: 'opportunity',
    description: 'Received a quote but didn\'t move forward. Intent was there.',
    matchTags: ['previous-quote', 'estimates-sent', 'proposal', 'stale-quote']
  },
  'old-lead': {
    id: 'old-lead',
    name: 'Old Lead',
    type: 'opportunity',
    description: 'Inquired but never committed. Need to re-spark interest.',
    matchTags: ['old-lead', 'cold-lead', 'past-inquiry', 'former-prospect']
  },
  'seasonal': {
    id: 'seasonal',
    name: 'Seasonal Reactivation',
    type: 'relationship',
    description: 'Past seasonal customer. Time-based re-engagement.',
    matchTags: ['seasonal', 'weather-dependent', 'seasonal-client', 'annual']
  },
  'customer-appreciation': {
    id: 'customer-appreciation',
    name: 'Customer Appreciation Offer',
    type: 'relationship',
    description: 'Loyalty bonus or lifecycle milestone (lease-end, renewal).',
    matchTags: ['loyalty', 'appreciation', 'milestone', 'lease-end', 'renewal']
  },
  'maintenance-reminder': {
    id: 'maintenance-reminder',
    name: 'Maintenance or Review Reminder',
    type: 'opportunity',
    description: 'Due for annual/seasonal maintenance or service review.',
    matchTags: ['maintenance', 'service-due', 'inspection', 'tune-up']
  },
  'new-service': {
    id: 'new-service',
    name: 'New Service for Past Customers',
    type: 'opportunity',
    description: 'Existing client who could benefit from an additional service.',
    matchTags: ['cross-sell', 'new-service', 'existing-client', 'add-on']
  },
  'limited-availability': {
    id: 'limited-availability',
    name: 'Limited Availability / First Dibs',
    type: 'opportunity',
    description: 'High-demand provider or service with limited slots.',
    matchTags: ['limited', 'waitlist', 'high-demand', 'first-dibs', 'vip']
  }
};

function matchCampaign(contactTags = []) {
  const normalized = contactTags.map(t => t.toLowerCase().trim());
  for (const [id, campaign] of Object.entries(CAMPAIGN_TYPES)) {
    const match = campaign.matchTags.some(tag => normalized.includes(tag));
    if (match) return { id, ...campaign };
  }
  // Default to past-customer if no match
  return { id: 'past-customer', ...CAMPAIGN_TYPES['past-customer'] };
}

function getFiveStageFramework(campaign, brandVoice = {}, offer = {}) {
  // Returns the 5-stage structure for the matched campaign
  // customized with brand voice and offer details
  return {
    reconnect: {
      stage: 1,
      goal: 'Remind who you are, acknowledge the gap',
      channel: 'SMS',
      template: `Hey {{name}}, it's {{business}} here. It's been a while — hope you're doing well! Just wanted to check in.`
    },
    reply: {
      stage: 2,
      goal: 'Follow up naturally, ask a question',
      channel: 'Email',
      template: `Subject: How have you been, {{name}}?\n\nHi {{name}},\n\nI was thinking about our last conversation and wanted to check in. {{personalized_message}}\n\nHope to hear from you!`
    },
    permission: {
      stage: 3,
      goal: 'Ask before presenting the offer',
      channel: 'Email',
      template: `Would it be alright if I shared something that might be relevant for you right now? It'll just take a minute.`
    },
    offer: {
      stage: 4,
      goal: 'Present clear value after permission granted',
      channel: 'Email',
      template: `Here's what I've put together for you:\n\n{{offer_details}}\n\nI think you'll find this valuable.`
    },
    booking: {
      stage: 5,
      goal: 'One specific action — book the appointment',
      channel: 'SMS',
      template: `Ready to book? I've got {{availability}} this week. Just reply with a time that works and I'll lock it in!`
    }
  };
}

function getAvailableCampaigns() {
  return Object.values(CAMPAIGN_TYPES).map(c => ({
    id: c.id,
    name: c.name,
    type: c.type,
    description: c.description,
    matchTags: c.matchTags
  }));
}

module.exports = { matchCampaign, getFiveStageFramework, getAvailableCampaigns, CAMPAIGN_TYPES };
