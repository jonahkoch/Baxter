---
layout: default
title: Archive
---

# Archived Proposals

<div class="proposals-list">
  {% assign archived = site.proposals | where_exp: "p", "p.status != 'active'" | sort: "expiration" | reverse %}
  {% if archived.size > 0 %}
    {% for proposal in archived %}
    <article class="proposal-card {{ proposal.status }}">
      <div class="card-header">
        <h2><a href="{{ proposal.url | relative_url }}">{{ proposal.title }}</a></h2>
        <span class="amount">{{ proposal.amount_ada | default: "?" }} ADA</span>
      </div>
      <div class="card-meta">
        <span class="type">{{ proposal.proposal_type }}</span>
        <span class="expires">Epoch {{ proposal.expiration | default: "?" }}</span>
        <span class="status-badge {{ proposal.status }}">{{ proposal.status | capitalize }}</span>
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
  {% else %}
    <p class="empty-state"><em>No archived proposals yet. All active proposals can be found on the <a href="{{ '/' | relative_url }}">home page</a>.</em></p>
  {% endif %}
</div>
