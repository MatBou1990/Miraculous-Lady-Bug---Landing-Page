import type { CrmContact, CrmProvider } from './types'

// Brevo (ex-Sendinblue) Contacts API. Consent flags, dates, country, zip, UTM
// and signup date are all stored as contact attributes. `updateEnabled: true`
// makes the call an idempotent upsert.
//
// Attributes used (create them in Brevo → Contacts → Settings → Attributes):
//   PRENOM, PAYS, CODE_POSTAL, SMS (phone), OPT_IN_EMAIL, OPT_IN_EMAIL_DATE,
//   OPT_IN_SMS, OPT_IN_SMS_DATE, UTM_SOURCE, DATE_INSCRIPTION
export function createBrevoProvider(apiKey: string, listId?: number): CrmProvider {
  return {
    name: 'brevo',
    async upsertContact(contact: CrmContact): Promise<void> {
      const attributes: Record<string, unknown> = {
        PAYS: contact.country,
        OPT_IN_EMAIL: contact.emailConsent,
        OPT_IN_SMS: contact.smsConsent,
        DATE_INSCRIPTION: contact.signupDate,
      }
      if (contact.firstName) attributes.PRENOM = contact.firstName
      if (contact.postalCode) attributes.CODE_POSTAL = contact.postalCode
      if (contact.phone) attributes.SMS = contact.phone
      if (contact.emailConsentDate) attributes.OPT_IN_EMAIL_DATE = contact.emailConsentDate
      if (contact.smsConsentDate) attributes.OPT_IN_SMS_DATE = contact.smsConsentDate
      if (contact.utmSource) attributes.UTM_SOURCE = contact.utmSource
      if (contact.utmMedium) attributes.UTM_MEDIUM = contact.utmMedium
      if (contact.utmCampaign) attributes.UTM_CAMPAIGN = contact.utmCampaign

      const payload: Record<string, unknown> = {
        email: contact.email,
        attributes,
        updateEnabled: true,
      }
      if (listId) payload.listIds = [listId]

      await $fetch('https://api.brevo.com/v3/contacts', {
        method: 'POST',
        headers: {
          'api-key': apiKey,
          'content-type': 'application/json',
          accept: 'application/json',
        },
        body: payload,
      })
    },
  }
}
