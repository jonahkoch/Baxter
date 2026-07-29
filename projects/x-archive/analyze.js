const fs = require('fs');

// Read tweets.js (strip the window.YTD prefix)
let raw = fs.readFileSync('/root/.openclaw/workspace/projects/x-archive/tweets.js', 'utf8');
raw = raw.replace(/^window\.YTD\.tweets\.part\d+\s*=\s*/, '');
const tweets = JSON.parse(raw);

// Read community_tweet.js
let commRaw = fs.readFileSync('/root/.openclaw/workspace/projects/x-archive/community_tweet.js', 'utf8');
commRaw = commRaw.replace(/^window\.YTD\.community_tweet\.part\d+\s*=\s*/, '');
const communityTweets = JSON.parse(commRaw);

const all = [...tweets, ...communityTweets];

// Stats
const totalTweets = all.length;
const totalRegular = tweets.length;
const totalCommunity = communityTweets.length;

// Date range
const dates = all.map(t => new Date(t.tweet.created_at)).sort((a, b) => a - b);
const first = dates[0];
const last = dates[dates.length - 1];
const years = {};
dates.forEach(d => {
  const y = d.getFullYear();
  years[y] = (years[y] || 0) + 1;
});

// Engagement
let totalLikes = 0;
let totalRetweets = 0;
let totalReplies = 0;
const topLiked = [];
const sources = {};
const langs = {};

all.forEach(t => {
  const tw = t.tweet;
  totalLikes += parseInt(tw.favorite_count || 0);
  totalRetweets += parseInt(tw.retweet_count || 0);
  if (tw.in_reply_to_status_id) totalReplies++;

  const source = tw.source?.replace(/<.*?>/g, '').trim() || 'unknown';
  sources[source] = (sources[source] || 0) + 1;

  langs[tw.lang] = (langs[tw.lang] || 0) + 1;

  topLiked.push({
    text: tw.full_text?.substring(0, 80) + (tw.full_text?.length > 80 ? '...' : ''),
    likes: parseInt(tw.favorite_count || 0),
    retweets: parseInt(tw.retweet_count || 0),
    date: tw.created_at,
  });
});

topLiked.sort((a, b) => b.likes - a.likes);

console.log('=== X / Twitter Archive Analysis ===\n');
console.log(`Total tweets: ${totalTweets.toLocaleString()}`);
console.log(`  - Regular tweets: ${totalRegular.toLocaleString()}`);
console.log(`  - Community tweets: ${totalCommunity.toLocaleString()}`);
console.log(`\nDate range: ${first.toDateString()} → ${last.toDateString()}`);
console.log(`Span: ~${Math.round((last - first) / (365.25 * 24 * 60 * 60 * 1000))} years`);
console.log('\nBy year:');
Object.entries(years).sort().forEach(([y, c]) => console.log(`  ${y}: ${c.toLocaleString()}`));

console.log(`\nTotal likes: ${totalLikes.toLocaleString()}`);
console.log(`Total retweets: ${totalRetweets.toLocaleString()}`);
console.log(`Replies: ${totalReplies.toLocaleString()}`);
console.log(`Avg likes/tweet: ${(totalLikes / totalTweets).toFixed(1)}`);

console.log('\nTop sources:');
Object.entries(sources).sort((a, b) => b[1] - a[1]).slice(0, 5).forEach(([s, c]) => console.log(`  ${s}: ${c.toLocaleString()}`));

console.log('\nTop languages:');
Object.entries(langs).sort((a, b) => b[1] - a[1]).slice(0, 5).forEach(([l, c]) => console.log(`  ${l}: ${c.toLocaleString()}`));

console.log('\n=== Top 10 Most Liked Tweets ===');
topLiked.slice(0, 10).forEach((t, i) => {
  console.log(`\n${i + 1}. ❤️ ${t.likes} | 🔄 ${t.retweets} | ${t.date}`);
  console.log(`   "${t.text}"`);
});
