// Shared CRM contact shape and provider contract. The rest of the app talks
// to this interface only — never to a specific CRM SDK — so providers are
// interchangeable via the CRM_PROVIDER env var.

export interface CrmContact {
  email: string
  firstName?: string
  /** City the contact wants the show in (from the autocomplete field). Required. */
  city: string
  /** Country resolved alongside the picked city, if any. */
  country?: string
  /** Kept for back-compat; no longer collected on the form. */
  postalCode?: string
  /** Phone in international form (with dialing code), if provided. */
  phone?: string
  emailConsent: boolean
  /** ISO timestamp of email consent (set only when emailConsent is true). */
  emailConsentDate?: string
  smsConsent: boolean
  /** ISO timestamp of SMS consent (set only when smsConsent is true). */
  smsConsentDate?: string
  /** UTM attribution captured from the landing URL, if any. */
  utmSource?: string
  utmMedium?: string
  utmCampaign?: string
  /** ISO timestamp of the signup. */
  signupDate: string
}

export interface CrmProvider {
  /** Machine name, e.g. "brevo" | "klaviyo". */
  readonly name: string
  /** Create the contact or update it if it already exists (idempotent). */
  upsertContact(contact: CrmContact): Promise<void>
}
