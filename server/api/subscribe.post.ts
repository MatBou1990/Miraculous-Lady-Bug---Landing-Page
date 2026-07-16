/**
 * POST /api/subscribe
 *
 * 1. Writes the subscriber to Postgres FIRST (source of truth) — with consent
 *    flags/dates, UTM attribution, IP and timestamp as proof of consent.
 * 2. Then best-effort syncs to the CRM, routed by channel:
 *      - email  → the email platform (Brevo by default)
 *      - SMS    → the SMS platform for the contact's country (only if consented)
 *    On CRM failure the DB record stays with crm_synced = false for later
 *    resynchronisation — the request still succeeds.
 *
 * Required: valid email, city, phone, age confirmation (16+).
 */
import { getEmailProvider, getSmsProvider, type CrmContact } from '../utils/crm'
import { upsertSubscriber, markCrmSynced, type SubscriberInput } from '../utils/subscribers'
import { resolveCountryForCity } from '../utils/geocode'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

interface SubscribeBody {
  email?: string
  firstName?: string
  city?: string
  country?: string
  phone?: string
  emailConsent?: boolean
  emailConsentText?: string
  smsConsent?: boolean
  smsConsentText?: string
  ageConfirmed?: boolean
  locale?: string
  utmSource?: string
  utmMedium?: string
  utmCampaign?: string
}

export default defineEventHandler(async (event) => {
  const body = await readBody<SubscribeBody>(event)

  const email = (body?.email || '').trim().toLowerCase()
  if (!email || !EMAIL_RE.test(email)) {
    throw createError({ statusCode: 400, statusMessage: 'Une adresse e-mail valide est requise.' })
  }

  const city = (body?.city || '').trim()
  if (!city) {
    throw createError({ statusCode: 400, statusMessage: 'La ville est requise.' })
  }

  // The form only sends a country when the visitor picked an autocomplete
  // suggestion. When they just typed the city, resolve the country server-side
  // so it's never left NULL.
  let country = (body?.country || '').trim() || undefined
  if (!country) {
    country = (await resolveCountryForCity(city)).country
  }

  if (body?.ageConfirmed !== true) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Vous devez confirmer avoir 16 ans ou plus.',
    })
  }

  const phone = normalizePhone(body.phone)
  if (!phone) {
    throw createError({ statusCode: 400, statusMessage: 'Un numéro de téléphone valide est requis.' })
  }

  const now = new Date().toISOString()
  const emailConsent = Boolean(body.emailConsent)
  const smsConsent = Boolean(body.smsConsent)
  // Archive the exact wording only when the matching box was actually ticked.
  const emailConsentText = emailConsent ? body.emailConsentText?.trim() || undefined : undefined
  const smsConsentText = smsConsent ? body.smsConsentText?.trim() || undefined : undefined
  const locale = body.locale?.trim().slice(0, 5) || undefined
  const ip = getRequestIP(event, { xForwardedFor: true }) || undefined

  // ---- 1. Persist to Postgres (source of truth) ----
  const subscriber: SubscriberInput = {
    email,
    firstName: body.firstName?.trim() || undefined,
    city,
    country,
    phone,
    emailConsent,
    emailConsentAt: emailConsent ? now : undefined,
    emailConsentText,
    smsConsent,
    smsConsentAt: smsConsent ? now : undefined,
    smsConsentText,
    ageConfirmed: true,
    locale,
    utmSource: body.utmSource?.trim() || undefined,
    utmMedium: body.utmMedium?.trim() || undefined,
    utmCampaign: body.utmCampaign?.trim() || undefined,
    ip,
  }

  try {
    await upsertSubscriber(subscriber)
  } catch (err: any) {
    console.error('[subscribe] DB write failed:', err?.message || err)
    throw createError({
      statusCode: 500,
      statusMessage: "Impossible d'enregistrer votre inscription. Veuillez réessayer.",
    })
  }

  // ---- 2. Best-effort CRM sync (channel-routed) ----
  const contact: CrmContact = {
    email,
    firstName: subscriber.firstName,
    city,
    country,
    phone,
    emailConsent,
    emailConsentDate: subscriber.emailConsentAt,
    smsConsent,
    smsConsentDate: subscriber.smsConsentAt,
    utmSource: subscriber.utmSource,
    utmMedium: subscriber.utmMedium,
    utmCampaign: subscriber.utmCampaign,
    signupDate: now,
  }

  try {
    const emailProvider = getEmailProvider()
    await emailProvider.upsertContact(contact)

    // SMS goes to its own platform only when consented; skip the second call
    // if it's the same platform as email (already covered above).
    if (smsConsent && phone) {
      const smsProvider = getSmsProvider()
      if (smsProvider.name !== emailProvider.name) {
        await smsProvider.upsertContact(contact)
      }
    }

    await markCrmSynced(email)
  } catch (err: any) {
    // Kept in Postgres with crm_synced = false → resynced later. Not fatal.
    console.error('[subscribe] CRM sync failed (kept for retry):', err?.message || err)
  }

  return { ok: true }
})

/**
 * Light normalisation to E.164. The phone already carries an international
 * dialing code from the front-end; this strips formatting characters.
 */
function normalizePhone(raw?: string): string | undefined {
  if (!raw) return undefined
  const trimmed = raw.trim()
  if (!trimmed) return undefined

  let digits = trimmed.replace(/[^\d+]/g, '')
  if (digits.startsWith('00')) digits = '+' + digits.slice(2)
  // A bare dialing code with no real number is not a phone.
  if (digits.replace('+', '').length < 4) return undefined
  return digits.startsWith('+') ? digits : '+' + digits
}
