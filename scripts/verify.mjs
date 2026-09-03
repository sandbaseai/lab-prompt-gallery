import { readFile } from 'node:fs/promises'
import { resolve } from 'node:path'

const root = process.cwd()
const parseJson = async (file) => JSON.parse(await readFile(resolve(root, file), 'utf8'))
const data = await parseJson('data/cases.json')
const html = await readFile(resolve(root, 'index.html'), 'utf8')
const app = await readFile(resolve(root, 'app.js'), 'utf8')
const vercel = await parseJson('vercel.json')
const privacy = await readFile(resolve(root, 'privacy.html'), 'utf8')
const terms = await readFile(resolve(root, 'terms.html'), 'utf8')
const legalJs = await readFile(resolve(root, 'legal.js'), 'utf8')
const robots = await readFile(resolve(root, 'robots.txt'), 'utf8')
const sitemap = await readFile(resolve(root, 'sitemap.xml'), 'utf8')

if (!Array.isArray(data.categories) || data.categories.length < 2) throw new Error('categories must include at least two upstream categories')
if (!Array.isArray(data.cases) || data.cases.length === 0) throw new Error('cases must be a non-empty array')
if (!Array.isArray(data.sources) || data.sources.filter(source => !source.external).length < 3) throw new Error('sources must include at least three connected prompt libraries')

const ids = new Set()
for (const prompt of data.cases) {
  for (const field of ['id', 'title', 'prompt', 'category']) {
    if ((field === 'id' && !Number.isInteger(prompt[field])) || (field !== 'id' && (typeof prompt[field] !== 'string' || prompt[field].trim() === ''))) {
      throw new Error(`case ${prompt.id || '<unknown>'} is missing ${field}`)
    }
  }
  if (ids.has(prompt.id)) throw new Error(`duplicate case id: ${prompt.id}`)
  ids.add(prompt.id)
  const imageValid = /^\/images\//.test(prompt.image) || /^https?:\/\//.test(prompt.imageUrl || '')
  const imageExplicitlyOmitted = prompt.previewAvailable === false && !prompt.image && !prompt.imageUrl
  if ((!imageValid && !imageExplicitlyOmitted) || (!prompt.sourceUrl && !prompt.githubUrl)) {
    throw new Error(`case ${prompt.id} has an invalid image or source reference`)
  }
}

if (!html.includes('id="heroStatPromptCount"') || !html.includes('POWERED BY SANDBASE')) throw new Error('brand/count contract missing from index.html')
if (html.includes('class="hero__sub"')) throw new Error('hero sub copy should remain removed')
if (!html.includes('<main id="main-content">') || !html.includes('class="skip-link"') || !html.includes('id="menuBtn"') || !html.includes('for="searchInput"')) {
  throw new Error('semantic navigation/accessibility contract missing')
}
if (!html.includes('aria-labelledby="modalTitle"') || !app.includes("event.key === 'Enter'") || !app.includes("copyFailed")) {
  throw new Error('keyboard/modal/clipboard contract missing')
}
if (!html.includes('id="langBtn"') || !app.includes('const copy = {') || !app.includes('setLanguage(next)') || !app.includes("localStorage.setItem('meimind-language'")) {
  throw new Error('bilingual switch contract missing')
}
if (!html.includes('github.com/sandbaseai/lab-prompt-gallery')) throw new Error('company repository link missing')
if (!app.includes('titleEn') || !app.includes('summaryEn') || !app.includes('displayTitle') || !app.includes('containsCjk')) {
  throw new Error('localized case metadata contract missing')
}
if (!app.includes('syncUrl') || !app.includes('hydrateUrlState') || !app.includes('noResultsTitle') || !app.includes('imageFallback') || app.includes('p.views') || app.includes('p.imageCount')) {
  throw new Error('shareable state, empty state, or image fallback contract missing')
}
if (!app.includes('cdn.jsdelivr.net/gh/freestylefly/awesome-gpt-image-2@main/data') || !app.includes('raw/refs/heads/main/data')) throw new Error('upstream image source or fallback missing')
if (!html.includes('href="privacy.html"') || !html.includes('href="terms.html"') || !privacy.includes('data-lang="en"') || !privacy.includes('data-lang="zh"') || !terms.includes('data-lang="en"') || !terms.includes('data-lang="zh"') || !legalJs.includes('meimind-language')) throw new Error('legal pages are not linked or bilingual')
if (!html.includes('href="terms.html#licenses"') || html.includes('README.md#-data-sources')) throw new Error('source license link must target the in-site legal section')
if (!robots.includes('Sitemap: https://lab-prompt-gallery-sandbase.vercel.app/sitemap.xml') || !sitemap.includes('<urlset')) throw new Error('SEO crawl files are missing')
if (vercel.cleanUrls !== true || !Array.isArray(vercel.headers) || !vercel.rewrites?.some(rule => rule.source === '/favicon.ico' && rule.destination === '/assets/favicon.svg')) {
  throw new Error('vercel.json must define clean URLs, headers, and favicon rewrite')
}
if (!html.includes('id="submitBtn"') || !html.includes('href="https://github.com/sandbaseai/lab-prompt-gallery/issues/new"') || !html.includes('target="_blank"') || !app.includes("window.confirm(t('submitConfirm'))")) {
  throw new Error('confirmed GitHub prompt submission flow missing')
}
if (/meimind\.app/i.test(`${html}\n${app}`) || /href="submit\.html"/i.test(html) || app.includes('CASE ${escapeHTML(p.id)}')) {
  throw new Error('legacy MeiMind navigation or CASE metadata still present')
}

const i18nKeys = new Set([
  ...[...html.matchAll(/data-i18n(?:-html|-placeholder|-aria-label)?="([^"]+)"/g)].map(match => match[1]),
])
for (const key of i18nKeys) {
  if (!app.includes(`${key}:`)) throw new Error(`missing translation key: ${key}`)
}

console.log(`verified ${data.cases.length} cases from ${data.sources.length} libraries across ${data.categories.length} categories`)
