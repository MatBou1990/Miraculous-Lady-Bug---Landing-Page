// Resolve a country from a free-typed city name.
//
// The sign-up form ships the country only when the visitor PICKS an
// autocomplete suggestion. Many people just type the city and submit, which
// left `country` NULL. This looks the city up on the same provider (Photon)
// so the country is filled in server-side and per-country analysis stays clean.

interface PhotonFeature {
  properties?: {
    country?: string
    countrycode?: string
    type?: string
    osm_value?: string
    extent?: number[]
  }
}

const PLACE_TYPES = new Set(['city', 'town', 'village', 'municipality', 'district'])
// Prefer a real city over a tiny same-named village (e.g. Montréal QC over
// Montreal, Wisconsin). Rank by the OSM tag `osm_value` — Photon's coarse
// `type` is "city" for every populated place — then by geographic extent.
const TYPE_RANK: Record<string, number> = {
  city: 0, municipality: 1, town: 2, village: 3, hamlet: 4, district: 5,
}
const placeRank = (f: PhotonFeature) => TYPE_RANK[f.properties?.osm_value || ''] ?? 6
const extentArea = (f: PhotonFeature) => {
  const e = f.properties?.extent
  return !e || e.length < 4 ? 0 : Math.abs(e[2] - e[0]) * Math.abs(e[1] - e[3])
}
const comparePlaces = (a: PhotonFeature, b: PhotonFeature) =>
  placeRank(a) - placeRank(b) || extentArea(b) - extentArea(a)

export async function resolveCountryForCity(
  city: string,
): Promise<{ country?: string; countryCode?: string }> {
  const q = city.trim()
  if (q.length < 2) return {}

  try {
    const url =
      'https://photon.komoot.io/api/' +
      `?q=${encodeURIComponent(q)}` +
      '&limit=5' +
      '&layer=city'
    const res = await $fetch<{ features?: PhotonFeature[] }>(url)
    const feats = (res.features || []).slice().sort(comparePlaces)

    for (const f of feats) {
      const p = f.properties || {}
      const type = p.type || p.osm_value
      if (type && !PLACE_TYPES.has(type)) continue
      if (p.country) {
        return { country: p.country, countryCode: p.countrycode || undefined }
      }
    }
  } catch (err: any) {
    // Best-effort: never block a sign-up over a country lookup.
    console.error('[geocode] country lookup failed:', err?.message || err)
  }
  return {}
}
