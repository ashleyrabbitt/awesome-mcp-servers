#!/usr/bin/env node
// Generate llms.txt (https://llmstxt.org) from a built static site.
//
// Usage: node scripts/build-llms.mjs <web-root> <https://origin> ["One-line site summary"]
//
// Reads <web-root>/sitemap.xml, maps each URL to its HTML file, and lists every page with its
// <title> and meta description, grouped by first path segment. Pages marked noindex are skipped.
// Writes <web-root>/llms.txt. No dependencies; safe to run on every build.
import { existsSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const [root, originArg, summaryArg] = process.argv.slice(2);
if (!root || !originArg) {
  console.error("usage: build-llms.mjs <web-root> <origin> [summary]");
  process.exit(1);
}
const origin = originArg.replace(/\/$/, "");

const decode = (s) => s.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#39;|&#x27;/g, "'").replace(/&nbsp;/g, " ");
const meta = (page, name) => {
  for (const re of [
    new RegExp(`<meta[^>]+(?:name|property)=["']${name}["'][^>]*content=["']([^"']*)`, "i"),
    new RegExp(`<meta[^>]+content=["']([^"']*)["'][^>]*(?:name|property)=["']${name}["']`, "i"),
  ]) {
    const m = page.match(re);
    if (m) return decode(m[1]).trim();
  }
  return "";
};
const pageFile = (path) => {
  const p = path.replace(/^\//, "");
  for (const cand of [p, p ? `${p.replace(/\/$/, "")}/index.html` : "index.html", `${p.replace(/\/$/, "")}.html`]) {
    const f = join(root, cand);
    if (cand && existsSync(f) && statSync(f).isFile()) return f;
  }
  return null;
};

const sitemap = readFileSync(join(root, "sitemap.xml"), "utf8");
let pages = [];
for (const [, loc] of sitemap.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/g)) {
  const path = new URL(decode(loc)).pathname || "/";
  const f = pageFile(path);
  if (!f || !f.endsWith(".html")) continue;
  const text = readFileSync(f, "utf8");
  if (meta(text, "robots").toLowerCase().includes("noindex")) continue;
  const t = text.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  const title = t ? decode(t[1].replace(/\s+/g, " ")).trim() : path;
  pages.push({ path, title, desc: meta(text, "description") || meta(text, "og:description") });
}
pages = [...pages.filter((p) => p.path === "/"), ...pages.filter((p) => p.path !== "/")];
if (!pages.length) {
  console.error("build-llms: no pages found from sitemap");
  process.exit(1);
}

const home = pages.find((p) => p.path === "/") || pages[0];
const sep = /\s[|—–·-]\s/;
const site = sep.test(home.title) ? home.title.split(sep).pop().trim() : home.title;
const summary = summaryArg || home.desc;
const groups = new Map();
for (const p of pages) {
  const segs = p.path.split("/").filter(Boolean);
  const key = segs.length > 1 || (segs.length === 1 && pages.some((q) => q.path.startsWith(`/${segs[0]}/`) && q.path !== p.path)) ? segs[0] : "";
  if (!groups.has(key)) groups.set(key, []);
  groups.get(key).push(p);
}
const keys = [...groups.keys()].sort((a, b) => (a === "" ? -1 : b === "" ? 1 : a.localeCompare(b)));
const out = [`# ${site}`, "", `> ${summary}`, ""];
for (const k of keys) {
  out.push(`## ${k ? k[0].toUpperCase() + k.slice(1).replace(/-/g, " ") : "Main pages"}`, "");
  for (const p of groups.get(k)) out.push(`- [${p.title}](${origin}${p.path})${p.desc ? `: ${p.desc}` : ""}`);
  out.push("");
}
writeFileSync(join(root, "llms.txt"), out.join("\n"));
console.log(`build-llms: ${pages.length} pages -> ${join(root, "llms.txt")}`);
