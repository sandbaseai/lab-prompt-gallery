import { writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'

const sourceUrl = 'https://raw.githubusercontent.com/freestylefly/awesome-gpt-image-2/main/data/cases.json'
const response = await fetch(sourceUrl, { cache: 'no-store' })
if (!response.ok) throw new Error(`upstream cases request failed: ${response.status}`)

const data = await response.json()
if (!Array.isArray(data.cases) || !Array.isArray(data.categories) || data.cases.length === 0) {
  throw new Error('upstream cases payload is invalid')
}

await writeFile(resolve(process.cwd(), 'data/cases.json'), `${JSON.stringify(data, null, 2)}\n`, 'utf8')
console.log(`synced ${data.cases.length} upstream cases across ${data.categories.length} categories`)
