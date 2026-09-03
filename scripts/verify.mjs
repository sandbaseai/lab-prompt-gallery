import { readFile } from 'node:fs/promises'
import { resolve } from 'node:path'

const root = process.cwd()
const parseJson = async (file) => JSON.parse(await readFile(resolve(root, file), 'utf8'))
const data = await parseJson('data/prompts.json')
const html = await readFile(resolve(root, 'index.html'), 'utf8')
const app = await readFile(resolve(root, 'app.js'), 'utf8')
const vercel = await parseJson('vercel.json')

if (!Array.isArray(data.categories) || data.categories.length < 2) throw new Error('categories must include all plus at least one category')
if (!Array.isArray(data.prompts) || data.prompts.length === 0) throw new Error('prompts must be a non-empty array')

const ids = new Set()
for (const prompt of data.prompts) {
  for (const field of ['id', 'title', 'prompt', 'category', 'model', 'aspect']) {
    if (typeof prompt[field] !== 'string' || prompt[field].trim() === '') throw new Error(`prompt ${prompt.id || '<unknown>'} is missing ${field}`)
  }
  if (ids.has(prompt.id)) throw new Error(`duplicate prompt id: ${prompt.id}`)
  ids.add(prompt.id)
  if (!prompt.source || typeof prompt.source.url !== 'string' || !/^https?:\/\//.test(prompt.source.url)) {
    throw new Error(`prompt ${prompt.id} has an invalid source URL`)
  }
}

if (!html.includes('id="heroPromptCount"') || !html.includes('POWERED BY SANDBASE')) throw new Error('brand/count contract missing from index.html')
if (!html.includes('aria-labelledby="modalTitle"') || !app.includes("event.key === 'Enter'") || !app.includes(".catch(() => toast('COPY FAILED'))")) {
  throw new Error('keyboard/modal/clipboard contract missing')
}
if (!app.includes('github.com/sandbaseai/prompt-gallery')) throw new Error('company repository link missing')
if (vercel.cleanUrls !== true || !Array.isArray(vercel.headers)) throw new Error('vercel.json must define clean URLs and headers')

const categoryCount = data.categories.filter((category) => category.id !== 'all').length
console.log(`verified ${data.prompts.length} prompts across ${categoryCount} categories`)
