const fs = require('fs');
const readline = require('readline');

// We need to parse the JSON array. Since it's 80MB, we'll use a streaming approach.
// The file format is: window.YTD.tweets.part0 = [ {tweet}, {tweet}, ... ]

async function processTweets() {
  const fileStream = fs.createReadStream('/root/.openclaw/workspace/projects/x-archive/tweets_full.js');
  const rl = readline.createInterface({ input: fileStream });

  let buffer = '';
  let inArray = false;
  let braceDepth = 0;
  let tweetCount = 0;
  const allTexts = [];
  const stats = {
    totalLikes: 0,
    totalRT: 0,
    replies: 0,
    withMedia: 0,
    withURLs: 0,
    years: {},
    hours: {},
    days: {},
    sources: {},
    langs: {},
    hashtags: new Set(),
    mentions: new Set(),
    domains: new Set(),
    emojiCounts: {},
    bigrams: {},
    lengths: [],
    topLiked: [],
    samples: []
  };

  // Skip the first line (window.YTD.tweets.part0 = [)
  let firstLine = true;

  for await (const line of rl) {
    if (firstLine) {
      firstLine = false;
      continue;
    }

    buffer += line + '\n';

    // Count braces to find complete tweet objects
    for (const char of line) {
      if (char === '{') braceDepth++;
      else if (char === '}') braceDepth--;
    }

    // When we hit braceDepth 0 after being inside, we have a complete tweet object
    // But we need to be careful - the array structure is [ {tweet}, {tweet}, ]
    // Let's look for lines that end with "}," or "}" before the closing "]"

    if (line.trim() === '}' || line.trim().endsWith('},') || line.trim().endsWith('}')) {
      // Try to parse the buffer as a tweet object
      let jsonStr = buffer.trim();
      if (jsonStr.endsWith(',')) jsonStr = jsonStr.slice(0, -1);

      try {
        const obj = JSON.parse(jsonStr);
        if (obj.tweet) {
          tweetCount++;
          const tw = obj.tweet;
          const text = tw.full_text || '';

          stats.lengths.push(text.length);
          allTexts.push(text);

          stats.totalLikes += parseInt(tw.favorite_count || 0);
          stats.totalRT += parseInt(tw.retweet_count || 0);
          if (tw.in_reply_to_status_id) stats.replies++;

          const d = new Date(tw.created_at);
          if (!isNaN(d)) {
            stats.years[d.getFullYear()] = (stats.years[d.getFullYear()] || 0) + 1;
            stats.hours[d.getHours()] = (stats.hours[d.getHours()] || 0) + 1;
            const dayName = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'][d.getDay()];
            stats.days[dayName] = (stats.days[dayName] || 0) + 1;
          }

          const src = tw.source?.replace(/<.*?>/g, '').trim() || 'unknown';
          stats.sources[src] = (stats.sources[src] || 0) + 1;
          stats.langs[tw.lang] = (stats.langs[tw.lang] || 0) + 1;

          if (tw.entities?.media?.length) stats.withMedia++;
          if (tw.entities?.urls?.length) stats.withURLs++;

          tw.entities?.hashtags?.forEach(h => stats.hashtags.add(h.text.toLowerCase()));
          tw.entities?.user_mentions?.forEach(m => stats.mentions.add(m.screen_name));
          tw.entities?.urls?.forEach(u => {
            try {
              const host = new URL(u.expanded_url).hostname.replace(/^www\./, '');
              stats.domains.add(host);
            } catch(e) {}
          });

          // Emojis
          const emojiPattern = /[\u{1F300}-\u{1F9FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/gu;
          const em = text.match(emojiPattern);
          if (em) em.forEach(e => stats.emojiCounts[e] = (stats.emojiCounts[e] || 0) + 1);

          // Bigrams
          const words = text.toLowerCase().replace(/[^\w\s#@]/g, '').split(/\s+/).filter(w => w.length > 2);
          for (let i = 0; i < words.length - 1; i++) {
            const bg = words[i] + ' ' + words[i+1];
            stats.bigrams[bg] = (stats.bigrams[bg] || 0) + 1;
          }

          stats.topLiked.push({
            text: text.substring(0, 120),
            likes: parseInt(tw.favorite_count || 0),
            rt: parseInt(tw.retweet_count || 0),
            date: tw.created_at
          });

          // Sample tweets
          if (tweetCount % 5000 === 0) {
            stats.samples.push({ text: text.substring(0, 200), date: tw.created_at });
          }
        }
      } catch (e) {
        // Not a complete object yet, keep buffering
        continue;
      }

      buffer = '';
      braceDepth = 0;

      if (tweetCount % 10000 === 0) {
        console.log(`Processed ${tweetCount} tweets...`);
      }
    }
  }

  console.log(`\n=== ANALYSIS COMPLETE ===`);
  console.log(`Total tweets: ${tweetCount}`);

  // Sort top liked
  stats.topLiked.sort((a, b) => b.likes - a.likes);

  // Build report
  const avgLen = stats.lengths.reduce((a,b) => a+b, 0) / stats.lengths.length;
  const shortTweets = stats.lengths.filter(l => l < 60).length;
  const medTweets = stats.lengths.filter(l => l >= 60 && l < 140).length;
  const longTweets = stats.lengths.filter(l => l >= 140).length;
  const exclam = allTexts.filter(t => t.includes('!')).length;
  const question = allTexts.filter(t => t.includes('?')).length;
  const ellipses = allTexts.filter(t => t.includes('...')).length;

  let report = `# X / Twitter Archive — Voice & Context Analysis\n\n`;
  report += `> Generated: ${new Date().toISOString().split('T')[0]}\n`;
  report += `> Source: ${tweetCount.toLocaleString()} tweets\n\n`;

  report += `## 📊 Overview\n\n`;
  report += `- **Total tweets:** ${tweetCount.toLocaleString()}\n`;

  const yearsSorted = Object.entries(stats.years).sort();
  if (yearsSorted.length > 0) {
    const first = yearsSorted[0][0];
    const last = yearsSorted[yearsSorted.length - 1][0];
    report += `- **Years:** ${first} → ${last}\n`;
  }

  report += `\n### By Year\n`;
  yearsSorted.forEach(([y, c]) => report += `- **${y}:** ${c.toLocaleString()}\n`);

  report += `\n### Engagement\n`;
  report += `- **Likes:** ${stats.totalLikes.toLocaleString()} (avg ${(stats.totalLikes/tweetCount).toFixed(1)}/tweet)\n`;
  report += `- **Retweets:** ${stats.totalRT.toLocaleString()}\n`;
  report += `- **Replies:** ${stats.replies.toLocaleString()} (${(stats.replies/tweetCount*100).toFixed(1)}%)\n`;
  report += `- **With media:** ${stats.withMedia.toLocaleString()} (${(stats.withMedia/tweetCount*100).toFixed(1)}%)\n`;
  report += `- **With URLs:** ${stats.withURLs.toLocaleString()} (${(stats.withURLs/tweetCount*100).toFixed(1)}%)\n`;

  report += `\n### Posting Patterns\n`;
  report += `- **Avg length:** ${avgLen.toFixed(0)} chars\n`;
  report += `- **Short (<60ch):** ${shortTweets} | **Medium:** ${medTweets} | **Long (140+):** ${longTweets}\n\n`;

  report += `**Top hours (UTC):**\n`;
  Object.entries(stats.hours).sort((a,b) => b[1]-a[1]).slice(0,5).forEach(([h,c]) => {
    const est = (parseInt(h)-5+24)%24;
    report += `- ${h}:00 UTC (${est}:00 EST): ${c}\n`;
  });

  report += `\n**By day:**\n`;
  ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].forEach(d => {
    if (stats.days[d]) report += `- ${d}: ${stats.days[d]}\n`;
  });

  report += `\n**Top sources:**\n`;
  Object.entries(stats.sources).sort((a,b) => b[1]-a[1]).slice(0,5).forEach(([s,c]) => report += `- ${s}: ${c}\n`);

  report += `\n---\n\n`;
  report += `## 🎭 Voice Style\n\n`;
  report += `- **Exclamations (!):** ${exclam} (${(exclam/tweetCount*100).toFixed(1)}%)\n`;
  report += `- **Questions (?):** ${question} (${(question/tweetCount*100).toFixed(1)}%)\n`;
  report += `- **Ellipses (...):** ${ellipses} (${(ellipses/tweetCount*100).toFixed(1)}%)\n`;
  report += `- **Unique emojis:** ${Object.keys(stats.emojiCounts).length}\n`;

  report += `\n### Top Emojis\n`;
  Object.entries(stats.emojiCounts).sort((a,b) => b[1]-a[1]).slice(0, 15).forEach(([e,c]) => report += `- ${e} : ${c}x\n`);

  report += `\n### Common Bigrams\n`;
  Object.entries(stats.bigrams).sort((a,b) => b[1]-a[1]).slice(0, 20).forEach(([bg,c]) => report += `- "${bg}" — ${c}x\n`);

  report += `\n---\n\n`;
  report += `## 🔗 Topics & Connections\n\n`;
  report += `### Hashtags (${stats.hashtags.size})\n`;
  [...stats.hashtags].sort().slice(0, 30).forEach(h => report += `- #${h}\n`);
  if (stats.hashtags.size > 30) report += `- ... and ${stats.hashtags.size - 30} more\n`;

  report += `\n### Mentioned Accounts (${stats.mentions.size})\n`;
  [...stats.mentions].sort().slice(0, 30).forEach(m => report += `- @${m}\n`);
  if (stats.mentions.size > 30) report += `- ... and ${stats.mentions.size - 30} more\n`;

  report += `\n### Domains Linked (${stats.domains.size})\n`;
  [...stats.domains].sort().slice(0, 30).forEach(d => report += `- ${d}\n`);
  if (stats.domains.size > 30) report += `- ... and ${stats.domains.size - 30} more\n`;

  // Save main report
  fs.writeFileSync('/root/.openclaw/workspace/projects/x-archive/voice-analysis.md', report);

  // Save top tweets separately
  let topReport = `## 🏆 Top 20 Most Liked Tweets\n\n`;
  stats.topLiked.slice(0, 20).forEach((t, i) => {
    topReport += `**${i+1}.** ❤️ ${t.likes} · 🔄 ${t.rt} · ${t.date}\n`;
    topReport += `> ${t.text}${t.text.length >= 120 ? '...' : ''}\n\n`;
  });
  fs.writeFileSync('/root/.openclaw/workspace/projects/x-archive/top-tweets.md', topReport);

  // Save samples separately
  let sampleReport = `## 📝 Sample Tweets Over Time\n\n`;
  stats.samples.forEach(t => {
    sampleReport += `**${t.date}**\n`;
    sampleReport += `> ${t.text}${t.text.length >= 200 ? '...' : ''}\n\n`;
  });
  fs.writeFileSync('/root/.openclaw/workspace/projects/x-archive/samples.md', sampleReport);

  console.log(`\n✅ Saved:`);
  console.log(`   voice-analysis.md — main stats & voice analysis`);
  console.log(`   top-tweets.md — top 20 most liked`);
  console.log(`   samples.md — sample tweets over time`);
}

processTweets().catch(console.error);
