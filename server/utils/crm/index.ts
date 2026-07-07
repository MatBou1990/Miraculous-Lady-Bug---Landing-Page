import type { CrmContact, CrmProvider } from './types'
import { createBrevoProvider } from './brevo'
import { createKlaviyoProvider } from './klaviyo'

export type { CrmContact, CrmProvider }

/**
 * Channel-based CRM routing.
 *
 *  - EMAIL is always sent from one platform worldwide (Brevo by default) so
 *    there is a single email list and a single unsubscribe surface.
 *  - SMS is routed by country, so the permanent EU show and the US tour can
 *    use different SMS platforms.
 *
 * Each channel has exactly one sending platform per contact → no double-send,
 * clean per-channel unsubscribe. All env-driven, no redeploy to change:
 *
 *   CRM_PROVIDER            global default (e.g. "brevo")
 *   CRM_EMAIL_PROVIDER      email platform (defaults to CRM_PROVIDER)
 *   CRM_SMS_PROVIDER        SMS default when no country match (defaults to CRM_PROVIDER)
 *   CRM_SMS_COUNTRY_ROUTING JSON map, e.g. {"US":"klaviyo","CA":"klaviyo"}
 */
export function getEmailProvider(): CrmProvider {
  const config = useRuntimeConfig()
  const name = (config.crmEmailProvider || config.crmProvider || 'brevo').toLowerCase()
  return buildProvider(name, config)
}

export function getSmsProvider(country?: string): CrmProvider {
  const config = useRuntimeConfig()
  const routed = routeByCountry(country, config.crmSmsCountryRouting)
  const name = (routed || config.crmSmsProvider || config.crmProvider || 'brevo').toLowerCase()
  return buildProvider(name, config)
}

function buildProvider(name: string, config: any): CrmProvider {
  switch (name) {
    case 'klaviyo': {
      if (!config.klaviyoApiKey) {
        throw new Error('KLAVIYO_API_KEY manquante côté serveur.')
      }
      return createKlaviyoProvider(config.klaviyoApiKey)
    }
    case 'brevo':
    default: {
      if (!config.brevoApiKey) {
        throw new Error('BREVO_API_KEY manquante côté serveur.')
      }
      return createBrevoProvider(config.brevoApiKey, Number(config.brevoListId) || undefined)
    }
  }
}

/** Look up a per-country provider override from a JSON routing map. */
function routeByCountry(country?: string, routing?: unknown): string | undefined {
  if (!country || !routing) return undefined
  try {
    const map = typeof routing === 'string' ? JSON.parse(routing) : (routing as Record<string, string>)
    return map?.[country.toUpperCase()]
  } catch {
    return undefined
  }
}
