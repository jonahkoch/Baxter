const fs = require('fs');

function loadTweets(path, varName) {
  let raw = fs.readFileSync(path, 'utf8');
  raw = raw.replace(new RegExp(`^window\\.YTD\\.${varName}\\.part\\d+\\s*=\\s*`), '');
  return JSON.parse(raw);
}

const tweets = loadTweets('/root/.openclaw/workspace/projects/x-archive/tweets.js', 'tweets');
const community = loadTweets('/root/.openclaw/workspace/projects/x-archive/community_tweet.js', 'community_tweet');
const all = [...tweets, ...community];

// Sort by date
all.sort((a, b) => new Date(a.tweet.created_at) - new Date(b.tweet.created_at));

// --- BASIC STATS ---
const dates = all.map(t => new Date(t.tweet.created_at));
const first = dates[0];
const last = dates[dates.length - 1];
const years = {};
dates.forEach(d => years[d.getFullYear()] = (years[d.getFullYear()] || 0) + 1);

let totalLikes = 0, totalRT = 0, replies = 0, withMedia = 0, withURLs = 0;
const sources = {}, langs = {}, hours = {}, days = {};
const topLiked = [];
const allTexts = [];
const hashtags = new Set();
const mentions = new Set();
const domains = new Set();
const bigrams = {};

all.forEach(t => {
  const tw = t.tweet;
  const text = tw.full_text || '';
  allTexts.push(text);

  totalLikes += parseInt(tw.favorite_count || 0);
  totalRT += parseInt(tw.retweet_count || 0);
  if (tw.in_reply_to_status_id) replies++;

  const src = tw.source?.replace(/<.*?>/g, '').trim() || 'unknown';
  sources[src] = (sources[src] || 0) + 1;
  langs[tw.lang] = (langs[tw.lang] || 0) + 1;

  const d = new Date(tw.created_at);
  hours[d.getHours()] = (hours[d.getHours()] || 0) + 1;
  const dayName = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'][d.getDay()];
  days[dayName] = (days[dayName] || 0) + 1;

  if (tw.entities?.media?.length) withMedia++;
  if (tw.entities?.urls?.length) withURLs++;
  tw.entities?.hashtags?.forEach(h => hashtags.add(h.text.toLowerCase()));
  tw.entities?.user_mentions?.forEach(m => mentions.add(m.screen_name));
  tw.entities?.urls?.forEach(u => {
    try {
      const host = new URL(u.expanded_url).hostname.replace(/^www\./, '');
      domains.add(host);
    } catch(e) {}
  });

  // Word bigrams
  const words = text.toLowerCase().replace(/[^\w\s#@]/g, '').split(/\s+/).filter(w => w.length > 2);
  for (let i = 0; i < words.length - 1; i++) {
    const bg = words[i] + ' ' + words[i+1];
    bigrams[bg] = (bigrams[bg] || 0) + 1;
  }

  topLiked.push({ text: text.substring(0, 100), likes: parseInt(tw.favorite_count || 0), rt: parseInt(tw.retweet_count || 0), date: tw.created_at });
});

topLiked.sort((a, b) => b.likes - a.likes);

// --- VOICE ANALYSIS ---
const lengths = allTexts.map(t => t.length);
const avgLen = lengths.reduce((a,b) => a+b, 0) / lengths.length;
const shortTweets = allTexts.filter(t => t.length < 60);
const medTweets = allTexts.filter(t => t.length >= 60 && t.length < 140);
const longTweets = allTexts.filter(t => t.length >= 140);

// Common phrases / patterns
const commonOpens = {};
allTexts.forEach(t => {
  const open = t.split(/[.!?\n]/)[0].trim();
  if (open.length > 5 && open.length < 80) {
    commonOpens[open] = (commonOpens[open] || 0) + 1;
  }
});

// Emoji detection
const emojiPattern = /[\u{1F300}-\u{1F9FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/gu;
const emojiCounts = {};
allTexts.forEach(t => {
  const em = t.match(emojiPattern);
  if (em) em.forEach(e => emojiCounts[e] = (emojiCounts[e] || 0) + 1);
});

// Punctuation patterns
const exclam = allTexts.filter(t => t.includes('!')).length;
const question = allTexts.filter(t => t.includes('?')).length;
const ellipses = allTexts.filter(t => t.includes('...')).length;
const allCapsWords = allTexts.flatMap(t => t.match(/\b[A-Z]{2,}\b/g) || []);

// Top bigrams
const topBigrams = Object.entries(bigrams).sort((a,b) => b[1]-a[1]).slice(0, 20);

// --- OUTPUT ---
let out = `# X / Twitter Archive — Voice & Context Analysis\n\n`;
out += `> Generated: ${new Date().toISOString().split('T')[0]}\n`;
out += `> Source: ${all.length.toLocaleString()} tweets (${tweets.length.toLocaleString()} regular + ${community.length.toLocaleString()} community)\n\n`;

out += `---\n\n`;
out += `## 📊 Overview\n\n`;
out += `- **Total tweets:** ${all.length.toLocaleString()}\n`;
out += `- **Date range:** ${first.toDateString()} → ${last.toDateString()}\n`;
out += `- **Timespan:** ~${Math.round((last-first)/(365.25*86400000))} years\n\n`;
out += `### By Year\n`;
Object.entries(years).sort().forEach(([y,c]) => out += `- **${y}:** ${c.toLocaleString()}\n`);

out += `\n### Engagement Totals\n`;
out += `- **Likes:** ${totalLikes.toLocaleString()} (avg ${(totalLikes/all.length).toFixed(1)}/tweet)\n`;
out += `- **Retweets:** ${totalRT.toLocaleString()}\n`;
out += `- **Replies:** ${replies.toLocaleString()} (${(replies/all.length*100).toFixed(1)}%)\n`;
out += `- **With media:** ${withMedia.toLocaleString()} (${(withMedia/all.length*100).toFixed(1)}%)\n`;
out += `- **With URLs:** ${withURLs.toLocaleString()} (${(withURLs/all.length*100).toFixed(1)}%)\n`;

out += `\n### Posting Patterns\n`;
out += `- **Avg tweet length:** ${avgLen.toFixed(0)} characters\n`;
out += `- **Short (<60ch):** ${shortTweets.length} | **Medium:** ${medTweets.length} | **Long (140+):** ${longTweets.length}\n\n`;
out += `**Top hours (UTC):**\n`;
Object.entries(hours).sort((a,b) => b[1]-a[1]).slice(0,5).forEach(([h,c]) => {
  const est = (parseInt(h)-5+24)%24;
  out += `- ${h}:00 UTC (${est}:00 EST): ${c} tweets\n`;
});
out += `\n**By day:**\n`;
['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].forEach(d => {
  if (days[d]) out += `- ${d}: ${days[d]}\n`;
});

out += `\n**Top sources:**\n`;
Object.entries(sources).sort((a,b) => b[1]-a[1]).slice(0,5).forEach(([s,c]) => out += `- ${s}: ${c}\n`);

out += `\n---\n\n`;
out += `## 🎭 Voice Style Analysis\n\n`;

out += `### Tone Markers\n`;
out += `- **Exclamations (!):** ${exclam} tweets (${(exclam/all.length*100).toFixed(1)}%)\n`;
out += `- **Questions (?):** ${question} tweets (${(question/all.length*100).toFixed(1)}%)\n`;
out += `- **Ellipses (...):** ${ellipses} tweets (${(ellipses/all.length*100).toFixed(1)}%)\n`;
out += `- **Unique emojis used:** ${Object.keys(emojiCounts).length}\n`;
out += `- **All-caps words:** ${allCapsWords.length} instances\n`;

out += `\n### Top Emojis\n`;
Object.entries(emojiCounts).sort((a,b) => b[1]-a[1]).slice(0, 10).forEach(([e,c]) => out += `- ${e} : ${c}x\n`);

out += `\n### Common Phrases (Bigrams)\n`;
topBigrams.forEach(([bg,c]) => out += `- "${bg}" — ${c}x\n`);

out += `\n---\n\n`;
out += `## 🔗 Topics & Connections\n\n`;
out += `### Hashtags Used\n`;
[...hashtags].sort().forEach(h => out += `- #${h}\n`);

out += `\n### Frequently Mentioned Accounts\n`;
[...mentions].sort().forEach(m => out += `- @${m}\n`);

out += `\n### Domains Linked\n`;
[...domains].sort().forEach(d => out += `- ${d}\n`);

out += `\n---\n\n`;
out += `## 🏆 Top 15 Most Liked Tweets\n\n`;
topLiked.slice(0, 15).forEach((t, i) => {
  out += `**${i+1}.** ❤️ ${t.likes} · 🔄 ${t.rt} · ${t.date}\n`;
  out += `> ${t.text}${t.text.length >= 100 ? '...' : ''}\n\n`;
});

out += `---\n\n`;
out += `## 📝 Sample Tweets by Era\n\n`;
const eraSamples = all.filter((_, i) => {
  const pct = i / all.length;
  return pct < 0.05 || (pct > 0.3 && pct < 0.35) || (pct > 0.6 && pct < 0.65) || pct > 0.95;
}).slice(0, 12);

eraSamples.forEach(t => {
  out += `**${new Date(t.tweet.created_at).toDateString()}**\n`;
  out += `> ${t.tweet.full_text.substring(0, 200)}${t.tweet.full_text.length > 200 ? '...' : ''}\n\n`;
});

fs.writeFileSync('/root/.openclaw/workspace/projects/x-archive/voice-analysis.md', out);
console.log('✅ Analysis saved to voice-analysis.md');
console.log(`   ${all.length} tweets analyzed`);
console.log(`   ${Object.keys(emojiCounts).length} unique emojis`);
console.log(`   ${hashtags.size} hashtags`);
console.log(`   ${mentions.size} accounts mentioned`);
