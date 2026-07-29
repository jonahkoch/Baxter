---
layout: default
title: Active Proposals
---

# Active Governance Proposals

<div class="ncl-banner">
  <strong>NCL Status:</strong> Check current net change limit before voting.
  <a href="https://governancespace.com/en-us/budget/2026-2027" target="_blank">View on GovernanceSpace →</a>
</div>

<div class="proposals-list">
  {% assign active = site.proposals | where: "status", "active" | sort: "amount_ada" | reverse %}
  {% for proposal in active %}
  <article class="proposal-card {{ proposal.status }}">
    <div class="card-header">
      <h2><a href="{{ proposal.url | relative_url }}">{{ proposal.title }}</a></h2>
      <span class="amount">{{ proposal.amount_ada | default: "?" }} ADA</span>
    </div>
    <div class="card-meta">
      <span class="type">{{ proposal.proposal_type }}</span>
      <span class="expires">Epoch {{ proposal.expiration | default: "?" }}</span>
      {% if proposal.context and proposal.context.size > 0 %}
      <span class="has-context">📌 Context</span>
      {% endif %}
    </div>
    <div class="vote-preview">
      <div class="bar">
        <div class="yes" style="width: {{ proposal.drep_yes_pct | default: 0 }}%"></div>
        <div class="no" style="width: {{ proposal.drep_no_pct | default: 0 }}%"></div>
      </div>
      <span class="yes-label">{{ proposal.drep_yes_pct | default: "?" }}% Yes</span>
      <span class="no-label">{{ proposal.drep_no_pct | default: "?" }}% No</span>
    </div>
    {% if proposal.abstract %}
    <p class="abstract">{{ proposal.abstract | truncate: 200 }}</p>
    {% endif %}
  </article>
  {% endfor %}
</div>

## Recently Added Context

{% assign with_context = site.proposals | where_exp: "p", "p.context and p.context.size > 0" %}
{% for proposal in with_context limit: 5 %}
- **[{{ proposal.title }}]({{ proposal.url | relative_url }})** — {{ proposal.context.last.summary | truncate: 100 }}
{% endfor %}
