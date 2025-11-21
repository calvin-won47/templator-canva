// Node 18+ ESM script to generate sitemap.xml and robots.txt into ./dist
// Inputs via env: SITE_URL (required), strapi_url, strapi_site_slug, STRAPI_API_TOKEN (optional)

import fs from 'node:fs';
import path from 'node:path';

const SITE_URL = process.env.SITE_URL || '';
const STRAPI_URL = process.env.strapi_url || '';
const SITE_SLUG = process.env.strapi_site_slug || '';
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN || '';

if (!SITE_URL) {
  console.error('SITE_URL is required');
  process.exit(1);
}

const siteBase = SITE_URL.replace(/\/$/, '');

function readLocalConfig() {
  try {
    const p = path.join(process.cwd(), 'public', 'config.json');
    const txt = fs.readFileSync(p, 'utf-8');
    const json = JSON.parse(txt);
    return json;
  } catch (e) {
    return null;
  }
}

const localCfg = readLocalConfig();
const effectiveStrapiUrl = STRAPI_URL || localCfg?.basic?.strapi_url || '';
const effectiveSiteSlug = SITE_SLUG || localCfg?.basic?.strapi_site_slug || '';

async function fetchStrapiBlogPages({ url, slug }) {
  if (!url || !slug) return [];
  const headers = STRAPI_API_TOKEN ? { Authorization: `Bearer ${STRAPI_API_TOKEN}` } : {};

  const pageSize = 100;
  let page = 1;
  let urls = [];
  while (true) {
    const query = `/api/blog-posts?filters[site][slug][$eq]=${encodeURIComponent(
      slug
    )}&pagination[page]=${page}&pagination[pageSize]=${pageSize}&sort=createdAt:desc`;
    const endpoint = `${url.replace(/\/$/, '')}${query}`;
    let res;
    try {
      res = await fetch(endpoint, { headers });
    } catch (e) {
      console.error('Failed to request Strapi:', e?.message || e);
      break;
    }
    if (!res || !res.ok) {
      console.error('Strapi response not OK:', res?.status, res?.statusText);
      break;
    }
    const json = await res.json();
    const data = json?.data || [];
    const pagination = json?.meta?.pagination;
    for (const item of data) {
      const slugVal = item?.slug ?? item?.attributes?.slug ?? null;
      const createdAt = item?.createdAt ?? item?.attributes?.createdAt ?? null;
      if (!slugVal) continue;
      urls.push({
        loc: `${siteBase}/blog/${slugVal}`,
        lastmod: createdAt ? String(createdAt).slice(0, 10) : undefined,
      });
    }
    const total = pagination?.total ?? data.length;
    const pageCount = pagination?.pageCount ?? 1;
    if (page >= pageCount || data.length === 0) break;
    page += 1;
  }
  return urls;
}

function buildSitemapXml(entries) {
  const urlsXml = entries
    .map((u) => {
      const lastmodTag = u.lastmod ? `\n    <lastmod>${u.lastmod}</lastmod>` : '';
      return `  <url>\n    <loc>${u.loc}</loc>${lastmodTag}\n  </url>`;
    })
    .join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urlsXml}\n</urlset>\n`;
}

function buildRobotsTxt() {
  return `User-agent: *\nAllow: /\nSitemap: ${siteBase}/sitemap.xml\n`;
}

async function main() {
  const distDir = path.join(process.cwd(), 'dist');
  fs.mkdirSync(distDir, { recursive: true });

  const staticEntries = [
    { loc: `${siteBase}/` },
    { loc: `${siteBase}/blog` },
  ];

  let dynamicEntries = [];
  try {
    dynamicEntries = await fetchStrapiBlogPages({ url: effectiveStrapiUrl, slug: effectiveSiteSlug });
  } catch {}

  const allEntries = [...staticEntries, ...dynamicEntries];
  const sitemapXml = buildSitemapXml(allEntries);
  fs.writeFileSync(path.join(distDir, 'sitemap.xml'), sitemapXml, 'utf-8');

  const robotsTxt = buildRobotsTxt();
  fs.writeFileSync(path.join(distDir, 'robots.txt'), robotsTxt, 'utf-8');

  console.log(`Generated ${allEntries.length} URLs into dist/sitemap.xml`);
}

main().catch((e) => {
  console.error('Failed to generate sitemap:', e);
  process.exit(1);
});