import type { CrmContact, CrmProvider } from './types'

// Klaviyo Profiles API (JSON:API). Standard fields map to native profile
// attributes; consent flags/dates, UTM and signup date are stored as custom
// profile `properties`. Upsert = POST, then PATCH the returned duplicate id.
const KLAVIYO_REVISION = '2024-10-15'

export function createKlaviyoProvider(apiKey: string): CrmProvider {
  const headers = {
    Authorization: `Klaviyo-API-Key ${apiKey}`,
    'content-type': 'application/json',
    accept: 'application/json',
    revision: KLAVIYO_REVISION,
  }

  function buildAttributes(contact: CrmContact): Record<string, unknown> {
    const properties: Record<string, unknown> = {
      email_consent: contact.emailConsent,
      sms_consent: contact.smsConsent,
      signup_date: contact.signupDate,
    }
    if (contact.emailConsentDate) properties.email_consent_date = contact.emailConsentDate
    if (contact.smsConsentDate) properties.sms_consent_date = contact.smsConsentDate
    if (contact.utmSource) properties.utm_source = contact.utmSource
    if (contact.utmMedium) properties.utm_medium = contact.utmMedium
    if (contact.utmCampaign) properties.utm_campaign = contact.utmCampaign

    const attributes: Record<string, unknown> = {
      email: contact.email,
      location: { country: contact.country, zip: contact.postalCode || null },
      properties,
    }
    if (contact.firstName) attributes.first_name = contact.firstName
    if (contact.phone) attributes.phone_number = contact.phone
    return attributes
  }

  return {
    name: 'klaviyo',
    async upsertContact(contact: CrmContact): Promise<void> {
      const attributes = buildAttributes(contact)
      try {
        await $fetch('https://a.klaviyo.com/api/profiles/', {
          method: 'POST',
          headers,
          body: { data: { type: 'profile', attributes } },
        })
      } catch (err: any) {
        // On a duplicate, Klaviyo returns the existing profile id — patch it.
        const dupId = err?.data?.errors?.[0]?.meta?.duplicate_profile_id
        if (dupId) {
          await $fetch(`https://a.klaviyo.com/api/profiles/${dupId}/`, {
            method: 'PATCH',
            headers,
            body: { data: { type: 'profile', id: dupId, attributes } },
          })
          return
        }
        throw err
      }
    },
  }
}
