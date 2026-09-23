/**
 * Event Management Knowledge Base and Assistant Service
 * Provides comprehensive knowledge on all aspects of event management,
 * as well as real-time queries against the portal's active events.
 */

// Comprehensive Event Management Knowledge Categories
const EVENT_TOPICS = [
  {
    id: 'planning_timeline',
    keywords: ['plan', 'planning', 'timeline', 'checklist', 'step', 'organize', 'start', 'schedule', 'preparation', 'guide'],
    title: 'Event Planning Checklist & Timeline',
    response: `### 📋 Comprehensive Event Planning Timeline & Checklist

Planning a successful event requires structured milestones:

#### 🗓️ 6–12 Months Before: Foundation & Strategy
* **Define Objective & Scope:** Purpose (lead gen, brand awareness, education, community), target audience persona, and expected attendee count.
* **Determine Format:** In-person, virtual, or hybrid.
* **Establish Budget:** List all revenue streams (tickets, sponsors, merchandise) and projected expenses.
* **Select Date & Venue:** Confirm primary and backup dates (avoiding major holidays or competing industry conferences).
* **Form Core Committee:** Assign leads for Logistics, Sponsorship, Marketing, Speaker Curation, and Finance.

#### 🗓️ 3–6 Months Before: Content & Partnerships
* **Speaker Sourcing:** Send invitations, establish agreements, and outline talk topics.
* **Sponsorship Outreach:** Send tailored pitch decks with clear tier benefits (Title, Platinum, Gold).
* **Launch Event Website & Ticketing:** Open Early Bird registrations with tier discounts.
* **Procure Vendors:** Audio/Visual (AV), stage fabricators, catering, photography, and event security.

#### 🗓️ 1–2 Months Before: Promotion & Operations
* **Marketing Blitz:** Email marketing cadences, paid ads (LinkedIn/Meta), speaker-led social campaigns.
* **Finalize Agenda:** Time slots, panel moderators, break durations, and VIP tracks.
* **Permits & Insurance:** Acquire municipal permissions, sound permits, fire clearances, and public liability insurance.
* **Registration & Tech Testing:** Test QR code ticketing and check-in workflows.

#### 🗓️ 1–2 Weeks Before: Final Polish
* **Dry Runs & AV Checks:** Test speaker slides, remote links, lapel mics, and confidence monitors.
* **Vendor Confirmation:** Lock in final food headcount, delivery windows, and seating charts.
* **Attendee Briefing:** Send "Know Before You Go" emails with parking, badge pickup instructions, and agenda.

#### 🎯 Day of Event
* **Early Setup (3 hours prior):** Registration desks, directional signage, green room, AV console.
* **Volunteer Briefing:** Roles, walkie-talkie channels, and emergency escalations.`
  },
  {
    id: 'budgeting_finance',
    keywords: ['budget', 'cost', 'expense', 'finance', 'financial', 'pricing', 'price', 'ticket price', 'revenue', 'roi', 'break-even', 'money', 'calculate'],
    title: 'Event Budgeting & Pricing Strategy',
    response: `### 💰 Event Budgeting & Revenue Optimization

A healthy event budget prevents financial overruns and ensures high ROI.

#### 📊 Recommended Budget Allocation Breakdown:
1. **Venue & Rentals (30–35%):** Hall hire, staging, tables/chairs, green room, security deposit.
2. **Food & Beverage (25–30%):** Coffee breaks, buffet lunch, networking cocktails, dietary meal options.
3. **Audio-Visual & Tech Production (15–20%):** Sound systems, LED walls/projectors, mics, streaming gear, lighting.
4. **Marketing & Advertising (10–15%):** Paid ad campaigns, PR, landing page optimization, banners, signage.
5. **Speakers & Entertainment (5–10%):** Honorariums, travel, accommodation, VIP gifting.
6. **Contingency Reserve (10%):** Essential buffer for unexpected permits, overtime, or last-minute equipment.

#### 🎟️ Ticketing Pricing Framework:
* **Early Bird (20–30% discount):** Creates early cash flow and social validation.
* **Standard / General Admission:** Primary revenue driver covering baseline operational cost.
* **VIP / Executive Pass (2x–4x standard):** Includes reserved front seating, VIP lounge access, speaker meet-and-greet, and premium meals.
* **Group Discounts (10–25% off for 3+ delegates):** Encourages corporate team bookings.

#### 📈 Break-Even Formula:
\`\`\`
Break-Even Attendees = Total Fixed Costs / (Ticket Price - Variable Cost per Attendee)
\`\`\`
*Always budget your break-even at 60–70% of maximum venue capacity.*`
  },
  {
    id: 'venue_logistics',
    keywords: ['venue', 'location', 'hall', 'space', 'inspection', 'layout', 'seating', 'permit', 'parking', 'contract', 'hotel'],
    title: 'Venue Selection, Negotiation & Layout',
    response: `### 🏢 Venue Selection, Sourcing & Logistics

The venue sets the atmosphere and operational foundation of your event.

#### 🔍 Site Inspection Checklist:
* **Capacity & Flow:** Ensure capacity fits your attendee count comfortably with space for registration, stage, dining, and sponsor booths.
* **Ceiling Height & Acoustics:** Ensure minimum 12–14 ft ceiling height for stage screens and check for echo or outside noise bleed.
* **Tech Infrastructure:** Dedicated high-speed Wi-Fi (separate network for AV streaming and live check-in desks), sufficient 3-phase power supply.
* **Accessibility:** Wheelchair ramps, ample elevators, freight elevator for heavy AV loading, and parking space (1 space per 2-3 attendees).

#### 💡 Negotiation Secrets:
1. **Food & Beverage Minimums vs Hall Rental:** Ask to waive hall rental fees if meeting an agreed F&B spending minimum.
2. **Complimentary Perks:** Negotiate complimentary Wi-Fi, podium mics, green room suite, and 1 complimentary hotel room per 30 booked.
3. **Attrition Clauses:** Ensure flexible drop clauses (e.g., ability to reduce room blocks by 15-20% without penalty up to 30 days prior).

#### 🪑 Layout Options:
* **Theater Style:** Maximum seating capacity, ideal for lectures & keynotes.
* **Classroom Style:** Tables for laptops/notepads, ideal for workshops and technical trainings.
* **Banquet / Round Tables:** Facilitates team networking, dining, and interactive roundtables.`
  },
  {
    id: 'marketing_promotion',
    keywords: ['market', 'marketing', 'promotion', 'promote', 'ticket sales', 'social media', 'advertising', 'ads', 'email', 'campaign', 'sell out', 'audience', 'attendee'],
    title: 'Event Marketing & Attendee Acquisition',
    response: `### 📢 Proven Event Marketing & Promotion Blueprint

To drive sell-out registrations, deploy a multi-channel campaign:

#### 🎯 1. Omnichannel Promotion Strategy:
* **Email Marketing (Highest Conversion):**
  * *Announcement:* 8 weeks before.
  * *Early Bird Deadline:* 4 weeks before (urgency driver).
  * *Speaker & Agenda Reveals:* Weekly spotlights.
  * *Final Call:* 48 & 24 hours before prices rise or tickets close.
* **LinkedIn (Best for B2B & Conferences):**
  * Create an official LinkedIn Event page.
  * Provide speakers and sponsors with co-branded badges & graphics ("I'm Speaking at [Event]").
  * Share video teasers, thought leadership snippets, and past event highlights.
* **Instagram & Reels (Best for Festivals & Lifestyle):**
  * Behind-the-scenes venue visits, speaker shoutouts, and countdown stories.

#### 🚀 2. Conversion Optimization:
* Keep registration forms short (Name, Email, Job Title/Company).
* Prominently display countdown timers, testimonials, and past attendee numbers.
* Offer team discounts to encourage group purchases.`
  },
  {
    id: 'sponsorship_management',
    keywords: ['sponsor', 'sponsorship', 'pitch', 'deck', 'partner', 'partnership', 'package', 'exhibitor', 'booth', 'monetize'],
    title: 'Sponsorship Pitching & Tier Management',
    response: `### 🤝 High-Impact Event Sponsorship Strategy

Sponsors fund your production and enhance delegate experience.

#### 📦 Structuring Sponsor Tiers:
* **Title / Presenting Sponsor (Exclusive):**
  * "Event Name Presented by [Brand]" branding on all collateral, opening keynote, top-tier exhibition booth, 10 VIP passes, opt-in attendee lead list.
* **Platinum / Gold Sponsors:**
  * Panel speaking slot, prime booth location, branding on main stage screen during breaks, 5 VIP passes.
* **Silver / Associate Sponsors:**
  * Standard 2x2m booth, logo on banners, program guide, 2 complimentary passes.
* **Specialty Sponsorships (High Margin):**
  * Official Wi-Fi Sponsor (custom SSID/password), Lanyard/Badge Sponsor, Coffee Lounge Sponsor, Happy Hour Sponsor.

#### 📑 Sponsor Pitch Deck Framework:
1. **The Hook:** Audience demographic profile (Seniority, Decision-makers, Job titles).
2. **The Reach:** Expected attendees, email subscriber reach, social media impressions.
3. **Deliverables:** Tangible lead capture opportunities (QR badge scanning, custom workshops).
4. **Post-Event Proof:** Deliver a post-event ROI report within 7 days showing photos, attendee stats, and social reach.`
  },
  {
    id: 'av_tech_production',
    keywords: ['av', 'audio', 'visual', 'sound', 'mic', 'microphone', 'screen', 'led', 'projector', 'light', 'lighting', 'streaming', 'tech', 'production'],
    title: 'Audiovisual (AV) & Technical Production',
    response: `### 🎬 AV, Sound, Lighting & Stage Production

Technical glitches destroy event credibility. Here is how to guarantee flawless production:

#### 🎙️ Sound & Microphones:
* **Keynote Speakers:** Wireless lapel / lavalier or countryman headset mic (leaves hands free).
* **Panel Discussions:** 1 wireless handheld mic for every 2 panelists (or gooseneck table mics).
* **Audience Q&A:** 2 roaming handheld microphones with dedicated ushers.

#### 🖥️ Visuals & Display:
* **LED Video Walls vs Projection:** Use high-contrast P2.6 or P3.9 LED walls for well-lit rooms.
* **Confidence Monitors (Comfort Monitors):** Position 2 screens on the stage floor facing the speakers showing current slide, speaker notes, and a digital countdown timer.
* **Slide Remotes:** Professional wireless presentation clickers with green laser pointer (e.g., Logitech Spotlight or DSan PerfectCue).

#### ⚡ Technical Redundancies:
* Dedicated hardwired LAN connection for live streaming (minimum 30 Mbps upload speed).
* Backup laptop running duplicate presentation deck on an HDMI switcher.
* Uninterruptible Power Supply (UPS) for audio mixing desk and stage lighting.`
  },
  {
    id: 'catering_hospitality',
    keywords: ['food', 'catering', 'caterer', 'lunch', 'dinner', 'beverage', 'drinks', 'coffee', 'dietary', 'hospitality', 'menu'],
    title: 'Catering, Food & Beverage Planning',
    response: `### ☕ Catering & Hospitality Best Practices

Great food leaves a lasting positive impression on attendees.

#### 🍽️ Portion & Headcount Ratios:
* **Attrition Rate:** Typically 10–15% of registered attendees skip lunch or arrive late. Plan meals for 90% of registered count unless strictly RSVP'd.
* **Coffee & Tea:** Calculate 2–3 cups per attendee for full-day events (Morning arrival, mid-morning break, post-lunch energy slump).
* **Water Stations:** Place water dispensers throughout the venue to reduce plastic waste and avoid hydration queues.

#### 🥗 Dietary Accommodations:
* Clearly label all buffet items: Vegetarian, Vegan, Halal, Gluten-Free, Nut-Free, and Dairy-Free.
* Ask for dietary restrictions during the online registration process.
* Arrange separate buffet counters for quick flow (1 buffet line per 75–100 guests to avoid long queues).`
  },
  {
    id: 'onsite_operations',
    keywords: ['onsite', 'checkin', 'check-in', 'qr', 'badge', 'crowd', 'usher', 'volunteer', 'emergency', 'safety', 'crisis', 'first aid', 'operations'],
    title: 'On-Site Operations & Crowd Control',
    response: `### 🎟️ On-Site Operations & Crowd Flow

A smooth registration desk guarantees a stellar first impression.

#### 📱 Check-In & Badge Collection:
* **QR Code Scanning:** Attendees present their digital QR ticket on their smartphone; staff scan in seconds using the portal scanner.
* **Alphabetical Desks:** Divide lines alphabetically (A–F, G–M, N–S, T–Z) or provide self-check-in kiosks to prevent bottlenecking.
* **Badge Assembly:** Pre-print badges or use instant thermal badge printers to eliminate wait times.

#### 🚨 Emergency & Safety Protocols:
* Clear emergency exits marked with unblocked pathways.
* Onsite first-aid station with a certified medic and AED defibrillator.
* Create a dedicated WhatsApp / Walkie-Talkie group for organizers with defined escalation roles.`
  },
  {
    id: 'post_event',
    keywords: ['post', 'after', 'feedback', 'survey', 'nps', 'follow up', 'lead score', 'analytics', 'recap', 'recording'],
    title: 'Post-Event Workflows, Surveys & ROI',
    response: `### 📊 Post-Event Execution & Lead Conversion

Your event doesn't end when the attendees leave. 50% of value is created post-event:

#### 📬 24–48 Hours Post-Event:
1. **Attendee Thank-You Email:** Include a link to presentation slides, official event recap video, and a 3-minute NPS survey.
2. **Speaker & Sponsor Gratitude:** Send personal thank-you notes with photo galleries and engagement statistics.
3. **Survey & NPS Calculation:**
   \`\`\`
   NPS = % Promoters (Score 9-10) - % Detractors (Score 0-6)
   \`\`\`
   A score of +50 is excellent for live conferences.

#### 📈 7 Days Post-Event:
* **Lead Scoring & Sales Handover:** Route high-scoring leads (from workshops and booth check-ins) to the sales team while memory is fresh.
* **Team Debrief (Post-Mortem):** Review what worked, what failed, vendor performance, and final financial reconciliation.`
  },
  {
    id: 'rsr_portal_guide',
    keywords: ['rsr', 'portal', 'platform', 'how to', 'register', 'ticket', 'create event', 'list event', 'check in', 'dashboard', 'lead capture', 'organizer'],
    title: 'How to Use the RSR Event Growth Platform',
    response: `### 🚀 Using the RSR Event Growth Platform

Here is how to get the most out of our features:

#### 1. 🔍 Discover & Book Events:
* Navigate to **[Discover Events](/events)** to filter events by category (Technology, Business, Finance, etc.), city, or price (Free/Paid).
* Click any event to review speakers, agenda, and select your ticket tier (Free, Premium, VIP).
* Once booked, view your digital ticket with instant QR code in **[My Tickets](/my-tickets)**.

#### 2. 📝 List & Host an Event:
* Organizers can click **[List Your Event](/create-event)** to publish an event in minutes.
* Add event details, venue, dates, pricing tiers, speaker profiles, and agenda items.

#### 3. 📱 Ticket Check-In Scanner:
* On event day, organizers can visit \`/checkin/:eventId\` to scan attendee QR codes for instant, paperless check-in.

#### 4. 🎯 Lead Capture & Scoring:
* Access \`/lead-capture/:eventId\` during the event to record delegate leads.
* Our platform automatically assigns AI lead scores based on engagement and company size.
* Track total attendees, conversion rates, and leads directly in the **[Dashboard](/dashboard)**.`
  }
];

// Fallback general event management advisor framework
const GENERAL_EVENT_GUIDE = `### 🌟 Event Management Best Practice Framework

Here is a 5-pillar master framework for any event question:

1. **Strategic Intent & Audience:** Clarify the core value proposition (why will people take time off to attend?) and set measurable KPIs.
2. **Financial Viability:** Model worst-case, realistic, and best-case attendance to guarantee break-even at 60% capacity.
3. **Attendee Journey:** Map the experience from initial invitation, arrival, badge pickup, session engagement, dining, to post-event networking.
4. **Technical & Logistical Rigor:** Verify AV specs, backup power, redundant internet, and safety clearances with written vendor contracts.
5. **Data & Follow-Through:** Capture leads digitally with QR check-in, issue instant post-event surveys, and follow up within 24 hours.

*Feel free to ask me specifically about budgeting, marketing, venue checklists, sponsor decks, AV requirements, or exploring events on this portal!*`;

/**
 * Searches the live portal events in Zustand store / events data
 */
export function queryPortalEvents(userText, events = []) {
  if (!events || events.length === 0) return [];
  const text = userText.toLowerCase();

  return events.filter(e => {
    const titleMatch = e.title.toLowerCase().includes(text);
    const catMatch = e.category.toLowerCase().includes(text);
    const cityMatch = e.city.toLowerCase().includes(text);
    const tagMatch = e.tags && e.tags.some(t => t.toLowerCase().includes(text));
    const speakerMatch = e.speakers && e.speakers.some(s => s.name.toLowerCase().includes(text));
    const organizerMatch = e.organizer && e.organizer.toLowerCase().includes(text);

    // Free filter
    if (text.includes('free') && e.isFree) return true;
    // Specific queries
    if (text.includes('tech') && (e.category === 'Technology' || e.tags?.includes('Tech'))) return true;
    if (text.includes('startup') && (e.category === 'Business' || e.tags?.includes('Startup'))) return true;
    if (text.includes('marketing') && e.category === 'Marketing') return true;
    if (text.includes('finance') || text.includes('fintech')) return (e.category === 'Finance' || e.tags?.includes('FinTech'));
    if (text.includes('women') && e.tags?.includes('WomenInTech')) return true;
    if (text.includes('ecommerce') || text.includes('e-commerce')) return (e.tags?.includes('Ecommerce'));

    return titleMatch || catMatch || cityMatch || tagMatch || speakerMatch || organizerMatch;
  });
}

/**
 * Generates an event-specific response when the query targets events on the platform
 */
function buildEventMatchesResponse(matches) {
  if (matches.length === 0) return null;

  const eventListStr = matches.slice(0, 4).map(e => {
    const minPrice = e.tickets && e.tickets.length > 0
      ? Math.min(...e.tickets.map(t => t.price))
      : 0;
    const priceText = minPrice === 0 ? 'FREE' : `₹${minPrice.toLocaleString('en-IN')}`;
    const speakersText = e.speakers ? e.speakers.map(s => s.name).join(', ') : 'Industry Leaders';

    return `
* **[${e.title}](/events/${e.id})**
  * 📍 **Venue & City:** ${e.venue} (${e.city})
  * 🗓️ **Date & Time:** ${e.date} at ${e.time}
  * 🏷️ **Category:** ${e.category} | **Starting from:** ${priceText}
  * 🎤 **Featured Speakers:** ${speakersText}
  * 📌 *[Click here to view details & book tickets](/events/${e.id})*`;
  }).join('\n');

  return `### 🎟️ Matching Events Found on RSR Platform (${matches.length})

Here are the relevant events matching your request:
${eventListStr}

💡 *You can click any event link to check tickets, review full agenda, or register instantly!*`;
}

/**
 * Main query handler for the chatbot.
 * Inspects query against Event Management Knowledge Base and live portal events.
 */
export async function getChatbotResponse(userMessage, liveEvents = [], apiKey = null) {
  const query = userMessage.trim();
  const lower = query.toLowerCase();

  // 1. Check if user configured a custom Gemini API Key
  if (apiKey && apiKey.trim() !== '') {
    try {
      const geminiResponse = await callGeminiAPI(query, liveEvents, apiKey);
      if (geminiResponse) return { text: geminiResponse, source: 'gemini' };
    } catch (err) {
      console.warn('Gemini API call failed, falling back to built-in knowledge base:', err);
    }
  }

  // 2. Check if the user is asking about specific events on the portal
  const isAskingForEvents = 
    lower.includes('event') ||
    lower.includes('summit') ||
    lower.includes('conference') ||
    lower.includes('bangalore') ||
    lower.includes('mumbai') ||
    lower.includes('delhi') ||
    lower.includes('hyderabad') ||
    lower.includes('pune') ||
    lower.includes('chennai') ||
    lower.includes('tech') ||
    lower.includes('marketing') ||
    lower.includes('fintech') ||
    lower.includes('startup') ||
    lower.includes('ticket') ||
    lower.includes('what is happening') ||
    lower.includes('recommend');

  if (isAskingForEvents) {
    const matchedEvents = queryPortalEvents(query, liveEvents);
    if (matchedEvents.length > 0) {
      const portalResponse = buildEventMatchesResponse(matchedEvents);
      // If it's specifically about tickets, prices, or dates of these events
      if (lower.includes('ticket') || lower.includes('price') || lower.includes('date') || lower.includes('when') || lower.includes('where')) {
        return {
          text: portalResponse,
          matchedEvents: matchedEvents.slice(0, 4),
          source: 'portal_events'
        };
      }
    }
  }

  // 3. Match against structured Event Management knowledge topics
  let bestTopic = null;
  let highestScore = 0;

  for (const topic of EVENT_TOPICS) {
    let score = 0;
    for (const keyword of topic.keywords) {
      if (lower.includes(keyword)) {
        score += keyword.length > 4 ? 2 : 1;
      }
    }
    if (score > highestScore) {
      highestScore = score;
      bestTopic = topic;
    }
  }

  // 4. Return matched topic or intelligent synthesized response
  if (bestTopic && highestScore >= 2) {
    let extraContext = '';
    // Append related portal events if relevant
    if (bestTopic.id === 'rsr_portal_guide' || bestTopic.id === 'marketing_promotion') {
      const sampleEvents = liveEvents.slice(0, 2);
      if (sampleEvents.length > 0) {
        extraContext = `\n\n#### 🌟 Live Examples on RSR Portal:\n` +
          sampleEvents.map(e => `* **[${e.title}](/events/${e.id})** in ${e.city} (${e.category})`).join('\n');
      }
    }

    return {
      text: bestTopic.response + extraContext,
      source: 'knowledge_base',
      topicId: bestTopic.id
    };
  }

  // 5. Check if query matches any portal events generally
  const anyMatched = queryPortalEvents(query, liveEvents);
  if (anyMatched.length > 0) {
    return {
      text: buildEventMatchesResponse(anyMatched),
      matchedEvents: anyMatched.slice(0, 4),
      source: 'portal_events'
    };
  }

  // 6. Intelligent Fallback for specialized event management questions
  return {
    text: `### 🎯 Event Management Guidance

Regarding: **"${query}"**

${GENERAL_EVENT_GUIDE}

---
💡 **Quick Shortcuts:**
* Ask **"Planning Checklist"** for timelines.
* Ask **"Budget breakdown"** for financial templates.
* Ask **"Sponsorship deck"** for pitch guides.
* Ask **"AV & Stage setup"** for tech equipment specs.
* Ask **"Upcoming events"** to see what is currently hosted on RSR!`,
    source: 'fallback'
  };
}

/**
 * Optional integration with Google Gemini API for dynamic generative answers
 */
async function callGeminiAPI(prompt, events, apiKey) {
  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
  
  const systemPrompt = `You are "EventGenie", the elite AI Event Management Consultant built into the RSR Event Growth Platform.
You are an expert in all aspects of corporate conferences, festivals, summits, hackathons, and corporate workshops.
You provide clear, structured, actionable answers with markdown headings, bullet points, and practical tips.
Current events on RSR Platform: ${JSON.stringify(events.map(e => ({ id: e.id, title: e.title, city: e.city, date: e.date, category: e.category })))}.
Always encourage good event planning practices and invite users to explore or list events on RSR!`;

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [
        {
          role: 'user',
          parts: [{ text: `${systemPrompt}\n\nUser Question: ${prompt}` }]
        }
      ]
    })
  });

  if (!response.ok) {
    throw new Error(`Gemini API Error: ${response.statusText}`);
  }

  const data = await response.json();
  const candidate = data.candidates?.[0]?.content?.parts?.[0]?.text;
  return candidate || null;
}
