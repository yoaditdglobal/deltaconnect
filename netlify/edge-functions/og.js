// Serve link-preview crawlers (Teams, WhatsApp, LinkedIn, Slack, iMessage, etc.)
// a tiny meta-only page so they don't have to download the ~7MB bundled site
// (Teams' unfurl service times out on large pages). Real visitors fall through
// to the full static page untouched.

const BASE = "https://deltaconnect.netlify.app";
const IMG = BASE + "/og-image.jpg?v=2";
const TITLE = "Delta Connect Summit — 8 July 2026, Uncommon Rooftop, London";
const DESC = "Where brands scale and founders connect — an evening with the Delta Connect community.";

const PAGES = {
  "/": BASE + "/",
  "/guests": BASE + "/guests",
};

// crawler signatures only — must NOT match real browsers (no "mozilla"/"chrome"/etc.)
const BOT = /(bot|crawler|spider|crawling|facebookexternalhit|facebot|slackbot|slack-imgproxy|linkedinbot|whatsapp|twitterbot|telegrambot|discordbot|embedly|pinterest|redditbot|applebot|vkshare|skypeuripreview|skype|preview|bingpreview|google-inspectiontool|teams|microsofturl)/i;

function page(url) {
  return `<!doctype html><html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${TITLE}</title>
<meta name="description" content="${DESC}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="Delta Connect Summit">
<meta property="og:title" content="${TITLE}">
<meta property="og:description" content="${DESC}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${IMG}">
<meta property="og:image:secure_url" content="${IMG}">
<meta property="og:image:type" content="image/jpeg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="${TITLE}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${TITLE}">
<meta name="twitter:description" content="${DESC}">
<meta name="twitter:image" content="${IMG}">
</head><body><a href="${url}">Delta Connect Summit</a></body></html>`;
}

export default async (request, context) => {
  try {
    const ua = request.headers.get("user-agent") || "";
    if (!BOT.test(ua)) return; // real visitor -> full static site
    let path = new URL(request.url).pathname.replace(/\/+$/, "");
    if (path === "") path = "/";
    const url = PAGES[path] || PAGES["/"];
    return new Response(page(url), {
      headers: {
        "content-type": "text/html; charset=utf-8",
        "cache-control": "public, max-age=0, must-revalidate",
      },
    });
  } catch (e) {
    return; // on any error, fall through to the static site
  }
};

export const config = { path: ["/", "/guests"] };
