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
  }
}

const PLACE_TYPES = new Set(['city', 'town', 'village', 'municipality', 'district'])

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

    for (const f of res.features || []) {
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
