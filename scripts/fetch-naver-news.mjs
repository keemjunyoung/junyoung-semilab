import { createHash } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import { dirname } from "node:path";

const clientId = process.env.NAVER_CLIENT_ID;
const clientSecret = process.env.NAVER_CLIENT_SECRET;

if (!clientId || !clientSecret) {
  console.log("NAVER_CLIENT_ID / NAVER_CLIENT_SECRET are not configured. Skipping news collection.");
  process.exit(0);
}

const keywords = [
  "반도체 공정",
  "반도체 장비",
  "HBM",
  "EUV 반도체",
  "반도체 식각",
  "반도체 증착",
  "첨단 패키징 반도체",
  "반도체 AI",
];

const stripHtml = (value = "") =>
  value
    .replace(/<[^>]*>/g, "")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&")
    .trim();

const getSource = (value) => {
  try {
    return new URL(value).hostname.replace(/^www\./, "");
  } catch {
    return "";
  }
};

const collected = [];

for (const keyword of keywords) {
  const endpoint = new URL("https://naverapihub.apigw.ntruss.com/search/v1/news");
  endpoint.searchParams.set("query", keyword);
  endpoint.searchParams.set("display", "10");
  endpoint.searchParams.set("sort", "date");
  endpoint.searchParams.set("format", "json");

  const response = await fetch(endpoint, {
    headers: {
      "X-NCP-APIGW-API-KEY-ID": clientId,
      "X-NCP-APIGW-API-KEY": clientSecret,
    },
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`NAVER API HUB failed for ${keyword}: ${response.status} ${body}`);
  }

  const data = await response.json();

  for (const item of data.items ?? []) {
    const title = stripHtml(item.title);
    const description = stripHtml(item.description);
    const originalLink = item.originallink || "";
    const link = item.link || originalLink;
    const canonical = originalLink || link || title;
    const id = createHash("sha1").update(canonical).digest("hex").slice(0, 12);

    collected.push({
      id,
      title,
      description,
      link,
      originalLink,
      pubDate: item.pubDate || "",
      keyword,
      source: getSource(originalLink || link),
    });
  }
}

const deduped = [];
const seen = new Set();

for (const item of collected.sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime())) {
  const key = item.originalLink || item.link || item.title;
  if (seen.has(key)) continue;
  seen.add(key);
  deduped.push(item);
  if (deduped.length >= 40) break;
}

const outputPath = "public/data/news.json";
await mkdir(dirname(outputPath), { recursive: true });
await writeFile(
  outputPath,
  JSON.stringify({ generatedAt: new Date().toISOString(), items: deduped }, null, 2) + "\n",
  "utf8",
);

console.log(`Saved ${deduped.length} semiconductor news items to ${outputPath}`);
