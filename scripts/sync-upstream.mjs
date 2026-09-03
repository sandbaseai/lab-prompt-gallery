import { writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'

const primaryUrl = 'https://raw.githubusercontent.com/freestylefly/awesome-gpt-image-2/main/data/cases.json'
const secondaryUrl = 'https://raw.githubusercontent.com/no-chili/awesome-gpt-image-2-prompts/main/data/prompts.json'

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

const data = {
  ...primary,
  totalCases: primary.cases.length + secondaryCases.length,
  sources: [
    {
      id: 'freestylefly',
      name: 'awesome-gpt-image-2',
      url: 'https://github.com/freestylefly/awesome-gpt-image-2',
      cases: primary.cases.length,
      license: 'CC-BY-4.0',
    },
    {
      id: 'virloom',
      name: 'Awesome GPT Image 2 Prompts',
      url: 'https://github.com/no-chili/awesome-gpt-image-2-prompts',
      cases: secondaryCases.length,
      license: 'CC-BY-4.0 metadata; third-party content reserved',
    },
    {
      id: 'toolcentral',
      name: 'Image Prompt Gallery · GPT Image 2',
      url: 'https://github.com/Toolcentral-ai/awesome-gpt-image-2-prompts',
      cases: null,
      license: 'External catalog · verify record rights before reuse',
      external: true,
    },
    {
      id: 'pixmind',
      name: 'Midjourney V7 Example Prompts',
      url: 'https://github.com/Pixmind-io/awesome-midjourney-v7-example-prompts',
      cases: null,
      license: 'External catalog · CC0 examples',
      external: true,
    },
  ],
  cases: [...primary.cases, ...secondaryCases],
}

await writeFile(resolve(process.cwd(), 'data/cases.json'), `${JSON.stringify(data, null, 2)}\n`, 'utf8')
console.log(`synced ${data.cases.length} cases from ${data.sources.length} libraries across ${data.categories.length} categories`)
