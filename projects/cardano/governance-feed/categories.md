---
layout: default
title: Ecosystem Categories
---

# Ecosystem Categories

<p class="intro">Browse proposals by focus area. This helps identify crossover, parallel efforts, and funding overlap across similar problem spaces.</p>

{% assign all_tags = site.proposals | map: 'tags' | join: ',' | split: ',' | sort | uniq %}

<div class="tag-grid">
{% for tag in all_tags %}
  {% assign clean_tag = tag | strip %}
  {% if clean_tag != "" %}
  <div class="tag-section">
    <h2 id="{{ clean_tag }}">{{ clean_tag | capitalize }}</h2>
    <div class="proposals-list compact">
      {% assign tagged = site.proposals | where_exp: "p", "p.tags contains clean_tag" %}
      {% for proposal in tagged %}
      <article class="proposal-card {{ proposal.status }}">
        <div class="card-header">
          <h3><a href="{{ proposal.url | relative_url }}">{{ proposal.title }}</a></h3>
          <span class="amount">{{ proposal.amount_ada | default: "?" }} ADA</span>
        </div>
        <div class="card-meta">
          <span class="status-badge {{ proposal.status }}">{{ proposal.status | capitalize }}</span>
          <span class="expires">Epoch {{ proposal.expiration | default: "?" }}</span>
        </div>
      </article>
      {% endfor %}
    </div>
  </div>
  {% endif %}
{% endfor %}
</div>

## About Crossover Tracking

When multiple teams seek funding for similar problems, this view surfaces the overlap. Tags are manually curated and should be checked against:

- **Parallel builds:** Two teams building similar infrastructure
- **Sequential asks:** Same team returning for follow-on funding
- **Ecosystem dependencies:** Projects that build on or compete with each other

<p class="note">Tags are applied based on proposal content and ecosystem context. <a href="https://github.com/jonahkoch/governance-feed">Submit corrections via GitHub</a>.</p>
