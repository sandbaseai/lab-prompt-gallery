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

if (!Array.isArray(data.categories) || data.categories.length < 2) throw new Error('categories must include at least two upstream categories')
if (!Array.isArray(data.cases) || data.cases.length === 0) throw new Error('cases must be a non-empty array')

const ids = new Set()
for (const prompt of data.cases) {
  for (const field of ['id', 'title', 'prompt', 'category', 'image']) {
    if ((field === 'id' && !Number.isInteger(prompt[field])) || (field !== 'id' && (typeof prompt[field] !== 'string' || prompt[field].trim() === ''))) {
      throw new Error(`case ${prompt.id || '<unknown>'} is missing ${field}`)
    }
  }
  if (ids.has(prompt.id)) throw new Error(`duplicate case id: ${prompt.id}`)
  ids.add(prompt.id)
  if (!/^\/images\//.test(prompt.image) || (!prompt.sourceUrl && !prompt.githubUrl)) {
    throw new Error(`case ${prompt.id} has an invalid image or source reference`)
  }
}

if (!html.includes('id="heroPromptCount"') || !html.includes('POWERED BY SANDBASE')) throw new Error('brand/count contract missing from index.html')
if (!html.includes('aria-labelledby="modalTitle"') || !app.includes("event.key === 'Enter'") || !app.includes(".catch(() => toast('COPY FAILED'))")) {
  throw new Error('keyboard/modal/clipboard contract missing')
}
if (!html.includes('id="langBtn"') || !app.includes('const copy = {') || !app.includes('setLanguage(next)') || !app.includes("localStorage.setItem('meimind-language'")) {
  throw new Error('bilingual switch contract missing')
}
if (!app.includes('github.com/sandbaseai/lab-prompt-gallery')) throw new Error('company repository link missing')
if (!app.includes('awesome-gpt-image-2/main/data')) throw new Error('upstream image source missing')
if (!html.includes('href="privacy.html"') || !html.includes('href="terms.html"') || !privacy.includes('Privacy / 隐私说明') || !terms.includes('Terms / 使用说明')) throw new Error('legal pages are not linked')
if (vercel.cleanUrls !== true || !Array.isArray(vercel.headers)) throw new Error('vercel.json must define clean URLs and headers')

console.log(`verified ${data.cases.length} upstream cases across ${data.categories.length} categories`)
