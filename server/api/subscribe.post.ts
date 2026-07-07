/**
 * POST /api/subscribe
 *
 * Upserts a contact in Brevo (Sendinblue). Called twice by the front-end:
 *   - Step 1: prénom, email (required), code postal (optional), email consent.
 *   - Step 2 (optional): phone + SMS consent for the same email.
 *
 * Consent flags and the postal code are stored as contact attributes.
 * `updateEnabled: true` makes the call an upsert, so step 2 updates the
 * contact created in step 1.
 */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

interface SubscribeBody {
  email?: string
  firstName?: string
  postalCode?: string
  phone?: string
  emailConsent?: boolean
  smsConsent?: boolean
}

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const apiKey = config.brevoApiKey

  if (!apiKey) {
    throw createError({
      statusCode: 500,
      statusMessage: 'BREVO_API_KEY manquante côté serveur.',
    })
  }

  const body = await readBody<SubscribeBody>(event)

  const email = (body?.email || '').trim().toLowerCase()
  if (!email || !EMAIL_RE.test(email)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Une adresse e-mail valide est requise.',
    })
  }

  // Build Brevo attributes. Only send what we actually have.
  const attributes: Record<string, unknown> = {}

  if (body.firstName?.trim()) attributes.PRENOM = body.firstName.trim()
  if (body.postalCode?.trim()) attributes.CODE_POSTAL = body.postalCode.trim()

  // Consent flags — always record the explicit choice.
  attributes.OPT_IN_EMAIL = Boolean(body.emailConsent)
  attributes.OPT_IN_SMS = Boolean(body.smsConsent)

  // Phone is stored in Brevo's built-in SMS attribute (needs E.164 format).
  const phone = normalizePhone(body.phone)
  if (phone) attributes.SMS = phone

  const payload: Record<string, unknown> = {
    email,
    attributes,
    updateEnabled: true,
  }

  const listId = Number(config.brevoListId)
  if (listId) payload.listIds = [listId]

  try {
    await $fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: {
        'api-key': apiKey,
        'content-type': 'application/json',
        accept: 'application/json',
      },
      body: payload,
    })

    return { ok: true }
  } catch (err: any) {
    const data = err?.data
    // Brevo returns this when the contact already exists AND updateEnabled
    // was ignored for some reason — treat an existing contact as success.
    if (data?.code === 'duplicate_parameter') {
      return { ok: true, existing: true }
    }

    console.error('[subscribe] Brevo error:', data || err?.message || err)
    throw createError({
      statusCode: 502,
      statusMessage:
        data?.message || "L'inscription a échoué. Veuillez réessayer.",
    })
  }
})

/**
 * Best-effort normalisation to E.164. Assumes a French number when no country
 * code is supplied (leading 0 → +33). Returns undefined for empty input.
 */
function normalizePhone(raw?: string): string | undefined {
  if (!raw) return undefined
  const trimmed = raw.trim()
  if (!trimmed) return undefined

  let digits = trimmed.replace(/[^\d+]/g, '')
  if (digits.startsWith('00')) digits = '+' + digits.slice(2)

  if (digits.startsWith('+')) return digits
  if (digits.startsWith('0')) return '+33' + digits.slice(1)
  return '+' + digits
}
