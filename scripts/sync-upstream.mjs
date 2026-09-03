import { writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'

const primaryUrl = 'https://raw.githubusercontent.com/freestylefly/awesome-gpt-image-2/main/data/cases.json'
const secondaryUrl = 'https://raw.githubusercontent.com/no-chili/awesome-gpt-image-2-prompts/main/data/prompts.json'
const cc0Url = 'https://raw.githubusercontent.com/Pixmind-io/awesome-midjourney-v7-example-prompts/main/data/prompts.json'

async function fetchJson(url) {
  const response = await fetch(url, { cache: 'no-store' })
  if (!response.ok) throw new Error(`source request failed (${response.status}): ${url}`)
  return response.json()
}

const primary = await fetchJson(primaryUrl)
if (!Array.isArray(primary.cases) || !Array.isArray(primary.categories) || primary.cases.length === 0) {
  throw new Error('upstream cases payload is invalid')
}

const secondary = await fetchJson(secondaryUrl)
if (!Array.isArray(secondary.prompts) || secondary.prompts.length === 0) {
  throw new Error('secondary prompt library payload is invalid')
}

const cc0 = await fetchJson(cc0Url)
if (!Array.isArray(cc0.prompts) || cc0.prompts.length === 0) {
  throw new Error('CC0 prompt library payload is invalid')
}

const categoryMap = {
  brand_logo: 'Brand & Logos',
  commercial_product: 'Products & E-commerce',
  creative_poster: 'Posters & Typography',
  illustration_3d: 'Illustration & Art',
  portrait_photography: 'Photography & Realism',
  video: 'Scenes & Storytelling',
  wallpaper: 'Scenes & Storytelling',
}
const existingKeys = new Set(primary.cases.map(item => item.sourceUrl || item.githubUrl || item.prompt))
const secondaryCases = secondary.prompts
  .filter(item => item && typeof item.prompt === 'string' && item.prompt.trim())
  .map((item, index) => {
    const canonicalUrl = item.rights?.canonicalUrl || item.url || ''
    const sourceUrl = item.rights?.sourceUrl || item.source?.postUrl || ''
    const dedupeKey = canonicalUrl || sourceUrl || item.prompt
    if (existingKeys.has(dedupeKey)) return null
    existingKeys.add(dedupeKey)
    const sourceHandle = item.source?.author?.handle || item.rights?.sourceCreator || 'Virloom'
    const images = Array.isArray(item.images) ? item.images.filter(image => typeof image?.url === 'string') : []
    const category = categoryMap[item.category] || 'Other Use Cases'
    return {
      id: 100000 + index,
      title: item.title || `GPT Image 2 prompt ${index + 1}`,
      image: '/assets/favicon.svg',
      imageUrl: images[0]?.url || '',
      imageFallback: images[1]?.url || '',
      imageAlt: item.title || '',
      sourceLabel: sourceHandle.startsWith('@') ? sourceHandle : `@${sourceHandle}`,
      sourceUrl,
      prompt: item.prompt,
      promptPreview: item.prompt.slice(0, 420),
      category,
      styles: [item.category || 'GPT Image 2'],
      scenes: [],
      featured: Boolean(item.stats?.featured),
      githubUrl: canonicalUrl || 'https://github.com/no-chili/awesome-gpt-image-2-prompts',
      sourceId: 'virloom',
      sourceName: 'Awesome GPT Image 2 Prompts',
    }
  })
  .filter(Boolean)

const cc0CategoryMap = {
  cinematic: 'Scenes & Storytelling',
  photography: 'Photography & Realism',
  architecture: 'Architecture & Spaces',
  'concept-art': 'Illustration & Art',
  anime: 'Illustration & Art',
  '3d': 'Illustration & Art',
  nature: 'Scenes & Storytelling',
  product: 'Products & E-commerce',
  abstract: 'Illustration & Art',
  text: 'Posters & Typography',
}
const cc0Cases = cc0.prompts
  .filter(item => item && typeof item.prompt === 'string' && item.prompt.trim())
  .map(item => {
    const category = cc0CategoryMap[item.category] || 'Other Use Cases'
    const parameterText = Object.entries(item.parameters || {})
      .map(([key, value]) => `${key} ${value}`)
      .join(' ')
    const prompt = [item.prompt.trim(), parameterText].filter(Boolean).join('\n\n')
    return {
      id: 200000 + Number(item.id),
      title: item.title || `Midjourney V7 prompt ${item.id}`,
      image: '',
      imageAlt: item.title || '',
      sourceLabel: 'Pixmind',
      sourceUrl: 'https://github.com/Pixmind-io/awesome-midjourney-v7-example-prompts',
      prompt,
      promptPreview: item.prompt,
      category,
      styles: [item.category || 'midjourney-v7'],
      scenes: Array.isArray(item.best_for) ? item.best_for.slice(0, 3) : [],
      featured: false,
      model: 'midjourney-v7',
      aspect: item.parameters?.['--ar'] || '1:1',
      previewAvailable: false,
      githubUrl: 'https://github.com/Pixmind-io/awesome-midjourney-v7-example-prompts',
      sourceId: 'pixmind',
      sourceName: 'awesome-midjourney-v7-example-prompts',
    }
  })

const data = {
  ...primary,
  totalCases: primary.cases.length + secondaryCases.length + cc0Cases.length,
  sources: [
    {
      id: 'freestylefly',
      name: 'awesome-gpt-image-2',
      url: 'https://github.com/freestylefly/awesome-gpt-image-2',
      cases: primary.cases.length,
      license: 'MIT repo; case media/source rights vary',
    },
    {
      id: 'virloom',
      name: 'Awesome GPT Image 2 Prompts',
      url: 'https://github.com/no-chili/awesome-gpt-image-2-prompts',
      cases: secondaryCases.length,
      license: 'CC-BY-4.0 metadata; third-party content reserved',
    },
    {
      id: 'pixmind',
      name: 'awesome-midjourney-v7-example-prompts',
      url: 'https://github.com/Pixmind-io/awesome-midjourney-v7-example-prompts',
      cases: cc0Cases.length,
      license: 'CC0 1.0 prompt examples; images omitted',
    },
    {
      id: 'toolcentral',
      name: 'Image Prompt Gallery · GPT Image 2',
      url: 'https://github.com/Toolcentral-ai/awesome-gpt-image-2-prompts',
      cases: null,
      license: 'External catalog · verify record rights before reuse',
      external: true,
    },
  ],
  cases: [...primary.cases, ...secondaryCases, ...cc0Cases],
}

await writeFile(resolve(process.cwd(), 'data/cases.json'), `${JSON.stringify(data, null, 2)}\n`, 'utf8')
console.log(`synced ${data.cases.length} cases from ${data.sources.length} libraries across ${data.categories.length} categories`)
