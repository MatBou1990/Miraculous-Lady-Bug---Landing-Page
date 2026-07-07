import { getSql, ensureSchema } from './db'

// Postgres is the source of truth. The API writes here first, then best-effort
// syncs to the CRM and flips crm_synced. Failed CRM syncs stay recoverable.
export interface SubscriberInput {
  email: string
  firstName?: string
  country: string
  postalCode?: string
  phone?: string
  emailConsent: boolean
  emailConsentAt?: string
  smsConsent: boolean
  smsConsentAt?: string
  ageConfirmed: boolean
  utmSource?: string
  utmMedium?: string
  utmCampaign?: string
  ip?: string
}

/** Insert the subscriber, or update it on email conflict. Returns the row id. */
export async function upsertSubscriber(input: SubscriberInput): Promise<number> {
  await ensureSchema()
  const db = getSql()
  const rows = await db<{ id: number }[]>`
    INSERT INTO subscribers (
      email, first_name, country, postal_code, phone,
      email_consent, email_consent_at, sms_consent, sms_consent_at,
      age_confirmed, utm_source, utm_medium, utm_campaign, ip, crm_synced
    ) VALUES (
      ${input.email}, ${input.firstName ?? null}, ${input.country}, ${input.postalCode ?? null}, ${input.phone ?? null},
      ${input.emailConsent}, ${input.emailConsentAt ?? null}, ${input.smsConsent}, ${input.smsConsentAt ?? null},
      ${input.ageConfirmed}, ${input.utmSource ?? null}, ${input.utmMedium ?? null}, ${input.utmCampaign ?? null},
      ${input.ip ?? null}, false
    )
    ON CONFLICT (email) DO UPDATE SET
      first_name       = COALESCE(EXCLUDED.first_name, subscribers.first_name),
      country          = EXCLUDED.country,
      postal_code      = COALESCE(EXCLUDED.postal_code, subscribers.postal_code),
      phone            = COALESCE(EXCLUDED.phone, subscribers.phone),
      email_consent    = EXCLUDED.email_consent,
      email_consent_at = COALESCE(EXCLUDED.email_consent_at, subscribers.email_consent_at),
      sms_consent      = EXCLUDED.sms_consent,
      sms_consent_at   = COALESCE(EXCLUDED.sms_consent_at, subscribers.sms_consent_at),
      age_confirmed    = EXCLUDED.age_confirmed,
      utm_source       = COALESCE(EXCLUDED.utm_source, subscribers.utm_source),
      utm_medium       = COALESCE(EXCLUDED.utm_medium, subscribers.utm_medium),
      utm_campaign     = COALESCE(EXCLUDED.utm_campaign, subscribers.utm_campaign),
      ip               = EXCLUDED.ip,
      crm_synced       = false,
      updated_at       = now()
    RETURNING id
  `
  return rows[0]!.id
}

/** Mark a subscriber as successfully pushed to the CRM. */
export async function markCrmSynced(email: string): Promise<void> {
  const db = getSql()
  await db`UPDATE subscribers SET crm_synced = true, updated_at = now() WHERE email = ${email}`
}
