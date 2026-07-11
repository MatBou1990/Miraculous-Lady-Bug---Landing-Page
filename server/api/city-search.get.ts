/**
 * GET /api/city-search?q=mont&lang=fr
 *
 * City autocomplete for the sign-up form. The provider is proxied server-side so
 * the front-end never holds an API key and results come back normalised
 * (city + country + country code) for clean per-city geo-demand analysis.
 *
 * Default provider is Photon (Komoot / OpenStreetMap): free, no API key. It can
 * be swapped for a paid provider (e.g. Google Places) later without touching the
 * front-end — only this file changes.
 */

export interface CitySuggestion {
  /** Display string shown in the dropdown, e.g. "Montréal, Québec, Canada". */
  label: string
  /** City name stored as the `city` field, e.g. "Montréal". */
  city: string
  /** Country name, e.g. "Canada". */
  country?: string
  /** ISO country code, e.g. "CA". */
  countryCode?: string
  /** Region/state, used only to disambiguate the label. */
  state?: string
}

// Photon's `layer=city` already narrows to populated places; this is a safety
// net against the occasional region/county slipping through.
const PLACE_TYPES = new Set(['city', 'town', 'village', 'municipality', 'district'])

export default defineEventHandler(async (event): Promise<CitySuggestion[]> => {
  const query = getQuery(event)
  const q = ((query.q as string) || '').trim()
  const lang = normLang(query.lang as string)
  if (q.length < 2) return []

  try {
    return await searchPhoton(q, lang)
  } catch (err: any) {
    console.error('[city-search] provider failed:', err?.message || err)
    return []
  }
})

// Photon only supports a handful of UI languages; fall back to English.
function normLang(raw?: string): string {
  const l = (raw || 'en').slice(0, 2).toLowerCase()
  return ['fr', 'en', 'de', 'it'].includes(l) ? l : 'en'
}

interface PhotonFeature {
  properties?: {
    name?: string
    country?: string
    countrycode?: string
    state?: string
    type?: string
    osm_value?: string
  }
}

async function searchPhoton(q: string, lang: string): Promise<CitySuggestion[]> {
  const url =
    'https://photon.komoot.io/api/' +
    `?q=${encodeURIComponent(q)}` +
    `&lang=${lang}` +
    '&limit=10' +
    '&layer=city'

  const res = await $fetch<{ features?: PhotonFeature[] }>(url)
  const seen = new Set<string>()
  const out: CitySuggestion[] = []

  for (const f of res.features || []) {
    const p = f.properties || {}
    const type = p.type || p.osm_value
    if (type && !PLACE_TYPES.has(type)) continue

    const city = p.name?.trim()
    if (!city) continue

    const label = [city, p.state, p.country].filter(Boolean).join(', ')
    const key = label.toLowerCase()
    if (seen.has(key)) continue
    seen.add(key)

    out.push({
      label,
      city,
      country: p.country || undefined,
      countryCode: p.countrycode || undefined,
      state: p.state || undefined,
    })
    if (out.length >= 6) break
  }

  return out
}
