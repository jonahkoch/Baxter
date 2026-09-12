# Agent Handoff Protocols

## How Agents Signal Each Other

### Research → Content

**Trigger:** Research Agent discovers content-worthy intelligence

**Signal format:**
```
CONTENT_OPPORTUNITY
Source: [research finding]
Suggested angle: [how to turn this into content]
Urgency: [timely / evergreen]
Recommended pillar: [1-4]
Recommended channel: [Instagram / Blog / Newsletter]
```

**Example:**
```
CONTENT_OPPORTUNITY
Source: Competitor X dropped engagement sessions from base package
Suggested angle: "Why we include engagement sessions in every package" 
Urgency: timely
Recommended pillar: Client Tips
Recommended channel: Blog
```

---

### Research → Operations

**Trigger:** Research Agent discovers competitive move affecting current clients

**Signal format:**
```
OPERATIONS_ALERT
Priority: [high / medium]
Client impact: [which clients might be affected]
Suggested action: [what Operations Agent should do]
Deadline: [if time-sensitive]
```

**Example:**
```
OPERATIONS_ALERT
Priority: high
Client impact: Client Y's venue just raised preferred vendor requirements
Suggested action: Check if Client Y needs additional insurance/certificate
Deadline: Before final walkthrough (3 weeks)
```

---

### Content → Operations

**Trigger:** Content Agent publishes vendor spotlight or partnership content

**Signal format:**
```
VENDOR_RELATIONSHIP_UPDATE
Vendor: [name]
Content published: [link]
Type: [spotlight / education / collaboration]
Follow-up needed: [yes / no]
Suggested action: [send thank you, schedule collaboration, etc.]
```

---

### Operations → Research

**Trigger:** Operations Agent notices pattern in client inquiries or feedback

**Signal format:**
```
RESEARCH_REQUEST
Topic: [what to investigate]
Source: [client feedback / inquiry pattern / complaint]
Priority: [high / medium]
Desired output: [competitive intel / market trend / pricing data]
```

**Example:**
```
RESEARCH_REQUEST
Topic: Pricing for micro-weddings (under 50 guests)
Source: 3 inquiries this week asked about smaller packages
Priority: medium
Desired output: Competitor micro-wedding offerings and pricing
```

---

### Operations → Content

**Trigger:** Operations Agent identifies content opportunity from client interaction

**Signal format:**
```
CONTENT_IDEA
Source: [client conversation / meeting / feedback]
Topic: [what the content should cover]
Format: [Instagram / Blog / Newsletter]
Client permission: [yes / pending / anonymous]
```

**Example:**
```
CONTENT_IDEA
Source: Timeline review with Smith wedding
Topic: "Why your cocktail hour should be 90 minutes, not 60"
Format: Blog
Client permission: anonymous (won't name them)
```

---

## Shared Knowledge Base Structure

```
shared-kb/
├── market-intel/          # Research Agent writes, all read
│   ├── competitor-updates.md
│   ├── pricing-trends.md
│   └── venue-partnerships.md
├── content-calendar/      # Content Agent owns, Research contributes ideas
│   ├── upcoming-posts.md
│   ├── published-content.md
│   └── content-ideas-queue.md
├── client-context/        # Operations Agent owns, sensitive
│   ├── active-clients.md      # (restricted — no full details)
│   └── pipeline-summary.md    # (high-level only)
└── agent-memory/          # What all agents should know
    ├── kochfoto-basics.md
    ├── voice-reminders.md
    └── seasonal-notes.md
```

## Coordination Rules

1. **Research Agent runs Monday mornings** → feeds Content and Operations for the week
2. **Content Agent runs mid-week** → checks Research queue for ideas
3. **Operations Agent runs daily** → flags patterns for Research, opportunities for Content
4. **All agents read shared-kb/agent-memory/ before producing output**

## What NOT to Share

- Full client contact info (keep in Operations only)
- Pricing negotiations (Operations only)
- Negative vendor experiences without context (flag for human review)
- Anything that could violate client privacy
