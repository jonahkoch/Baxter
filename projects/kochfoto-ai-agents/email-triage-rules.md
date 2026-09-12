# Email Triage Rules

## Inbox Categories

### 🔴 Urgent — Notify Immediately
- New booking inquiry (venue + date mentioned)
- Client emergency (day-of issue, urgent rescheduling)
- Vendor conflict (double-booking, cancellation)
- Payment issue (failed charge, overdue invoice)

**Action:** Alert Jonah within 15 minutes. Draft response ready for review.

---

### 🟡 High — Respond Today
- Consultation request (specific date mentioned)
- Follow-up from prospective client
- Vendor partnership inquiry
- Media/feature request
- Review/feedback request

**Action:** Draft response within 2 hours. Queue for Jonah approval.

---

### 🟢 Normal — Respond This Week
- General inquiry (no date/venue)
- Collaboration request (non-urgent)
- Newsletter reply
- Administrative (contractor, supplier)

**Action:** Draft response within 24 hours. Batch for review.

---

### ⚪ Low — Process When Convenient
- Newsletter subscriptions
- Marketing/promotional emails
- Industry newsletters
- Social media notifications

**Action:** Auto-archive or file. No response needed.

---

## Triage Logic Flow

```
1. Is it from a current client?
   → YES: Check for keywords ("cancel", "reschedule", "emergency", "problem")
      → MATCH: URGENT
      → NO MATCH: HIGH (if needs response) or NORMAL (if FYI)

2. Is it a new inquiry?
   → YES: Does it include date + venue?
      → YES: URGENT (hot lead)
      → NO: HIGH (needs nurturing)

3. Is it from a vendor/partner?
   → YES: Check for conflict or opportunity language
      → CONFLICT: URGENT
      → OPPORTUNITY: HIGH
      → GENERAL: NORMAL

4. Is it automated/marketing?
   → YES: LOW (auto-file)

5. Everything else
   → NORMAL (manual review)
```

---

## Response Templates

### New Inquiry — Hot Lead (has date + venue)

**Subject:** Re: [Their Subject]

Hi [Name],

Thanks for reaching out! I'd love to hear more about your wedding at [Venue] on [Date].

A few quick questions to make sure we're a good fit:
- What's your vision for the day? (Big party, intimate gathering, something else?)
- Are you working with a planner?
- What's most important to you about your wedding photos?

I typically respond to inquiries within 24 hours, but since you included details upfront, here's what happens next: we schedule a 20-minute call, I send you a customized proposal, and if it feels right, we lock it in.

Looking forward to learning more.

— Jonah

---

### New Inquiry — Warm Lead (missing details)

**Subject:** Re: [Their Subject]

Hi [Name],

Thanks for getting in touch! I'm excited to hear about your wedding plans.

To send you the right information, could you share:
- Your wedding date (even tentative)
- Your venue or location
- What drew you to my work?

Once I have those, I can send a tailored proposal and we can find a time to chat.

Talk soon,

— Jonah

---

### Consultation Request

**Subject:** Re: [Their Subject]

Hi [Name],

I'd love to chat! Here are a few times that work for me this week:

• [Day, Date] at [Time] ET
• [Day, Date] at [Time] ET
• [Day, Date] at [Time] ET

We can do Zoom or a phone call — whatever's easier. The call usually takes 20-30 minutes and I'll send you a proposal afterward.

Let me know what works!

— Jonah

---

### Vendor Partnership Inquiry

**Subject:** Re: [Their Subject]

Hi [Name],

Thanks for reaching out! I love connecting with great vendors in the DC area.

A few questions to see if we're aligned:
- What kind of partnership are you thinking? (Referral, styled shoot, preferred vendor, etc.)
- What's your typical client like?
- Have we worked together before?

I'm always open to collaborations that benefit couples. Let's chat.

— Jonah

---

## Escalation Rules

**Escalate to Jonah immediately if:**
- Client uses words: "cancel", "refund", "lawyer", "dispute", "unhappy", "disappointed"
- Email is from a current client and mentions a problem with delivered work
- Payment/billing dispute
- Anything that feels like it could become a public/review issue

**Never auto-send without approval:**
- Any email mentioning cancellation or refund
- Any response to a negative review or complaint
- Any pricing negotiation
- Any contract modification

---

## Automation Rules

**Can auto-send (pre-approved templates):**
- Out-of-office / availability confirmation
- "Got your inquiry, I'll respond within 24 hours" acknowledgment
- Meeting confirmation with calendar link
- Invoice reminder (standard 7-day follow-up)

**Must queue for approval:**
- Everything else
