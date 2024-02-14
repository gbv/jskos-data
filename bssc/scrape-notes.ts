import { DOMParser } from "https://deno.land/x/deno_dom/deno-dom-wasm.ts"
import * as csv from "https://deno.land/std@0.207.0/csv/mod.ts"

async function sleep(milliseconds: number) {
	return new Promise((resolve) => {
		setTimeout(resolve, milliseconds)
	})
}

const concepts = {}
const baseUrl = "https://ns.editeur.org"

async function parse(url: RequestInfo | URL) {
  await sleep(100)
  try {
    const res = await fetch(url)
    const html = await res.text()
    const document: any = new DOMParser().parseFromString(html, "text/html")
  
    const rows = document.querySelectorAll("table tbody tr")
    for (const row of rows) {
      const code = row.querySelector(".code")?.textContent
      const description = row.querySelector("[class^='description'] .popup")?.textContent
      const detailLink = row.querySelector("[class^='description'] a")?.getAttribute("href")
      if (code && !concepts[code]) {
        concepts[code] = {
          notation: code,
          scopeNote: description,
          url: baseUrl + detailLink,
        }
        if (detailLink) {
          await parse(`${baseUrl}${detailLink}`)
        }
      }
    }
  
  } catch(error) {
    console.error(error)
  }
}

await parse(`${baseUrl}/bic_categories`)

console.log(csv.stringify(Object.values(concepts), {
  columns: ["notation", "scopeNote", "url"]
}).trim())
