// Generate static fallbacks for blog detail routes: dist/blog/<slug>/index.html
// Env:
// - CONFIG_PATH (optional): path to config.json containing basic.strapi_url and basic.strapi_site_slug
// - STRAPI_API_TOKEN (optional): Strapi API token for authenticated requests
// - strapi_url / strapi_site_slug (optional fallback): used only when config is missing values

import fs from 'node:fs';
import path from 'node:path';

const CONFIG_PATH = process.env.CONFIG_PATH || path.join(process.cwd(), 'public', 'config.json');
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN || '';
const DIST_DIR = path.join(process.cwd(), 'dist');
const INDEX_HTML_PATH = path.join(DIST_DIR, 'index.html');

function readConfig(configPath) {
  try {
    const raw = fs.readFileSync(configPath, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    console.warn(`Failed to read config at ${configPath}:`, err?.message || err);
    return null;
  }
}

function resolveStrapiConfig() {
  const config = readConfig(CONFIG_PATH) || {};
  const cfgUrl = config?.basic?.strapi_url || '';
  const cfgSiteSlug = config?.basic?.strapi_site_slug || '';

  const STRAPI_URL = cfgUrl || process.env.strapi_url || '';
  const SITE_SLUG = cfgSiteSlug || process.env.strapi_site_slug || '';

  if (!STRAPI_URL || !SITE_SLUG) {
    throw new Error('Missing strapi_url or strapi_site_slug. Please ensure CONFIG_PATH points to a config.json with basic.strapi_url and basic.strapi_site_slug.');
  }

  return { STRAPI_URL, SITE_SLUG };
}

async function fetchBlogSlugs({ url, siteSlug }) {
  const slugs = new Set();
  const headers = STRAPI_API_TOKEN ? { Authorization: `Bearer ${STRAPI_API_TOKEN}` } : {};

  let page = 1;
  const pageSize = 100;
  while (true) {
    const query = `/api/blog-posts?fields[0]=slug&filters[site][slug][$eq]=${encodeURIComponent(
      siteSlug
    )}&pagination[page]=${page}&pagination[pageSize]=${pageSize}`;
    const endpoint = `${url.replace(/\/$/, '')}${query}`;
    const res = await fetch(endpoint, { headers });
    if (!res.ok) {
      const body = await res.text().catch(() => '');
      throw new Error(`Failed to fetch blog slugs from Strapi (${res.status} ${res.statusText}): ${body.slice(0, 200)}`);
    }
    const json = await res.json();
    const data = json?.data ?? [];
    for (const item of data) {
      const slug = item?.slug ?? item?.attributes?.slug ?? '';
      const normalized = String(slug || '').trim();
      if (!normalized || normalized.includes('..') || normalized.startsWith('/')) continue;
      slugs.add(normalized);
    }
    const pagination = json?.meta?.pagination;
    const pageCount = pagination?.pageCount ?? 1;
    if (page >= pageCount || data.length === 0) break;
    page += 1;
  }

  return Array.from(slugs);
}

function ensureIndexHtml() {
  if (!fs.existsSync(INDEX_HTML_PATH)) {
    throw new Error(`Cannot find ${INDEX_HTML_PATH}. Please run the Vite build before generating fallbacks.`);
  }
}

function writeFallbacks(slugs) {
  const templateHtml = fs.readFileSync(INDEX_HTML_PATH, 'utf-8');
  for (const slug of slugs) {
    const targetDir = path.join(DIST_DIR, 'blog', slug);
    fs.mkdirSync(targetDir, { recursive: true });
    fs.writeFileSync(path.join(targetDir, 'index.html'), templateHtml, 'utf-8');
  }
}

async function main() {
  ensureIndexHtml();
  const { STRAPI_URL, SITE_SLUG } = resolveStrapiConfig();
  const slugs = await fetchBlogSlugs({ url: STRAPI_URL, siteSlug: SITE_SLUG });

  if (!slugs.length) {
    console.warn('No blog slugs returned from Strapi; skipping blog fallbacks.');
    return;
  }

  writeFallbacks(slugs);
  console.log(`Generated ${slugs.length} blog fallback page(s) under dist/blog`);
}

main().catch((err) => {
  console.error('Failed to generate blog fallbacks:', err?.message || err);
  process.exit(1);
});
