import postgres from 'postgres'

// Single pooled Postgres connection (Supabase / Neon via DATABASE_URL).
// `prepare: false` keeps it compatible with transaction-mode poolers.
let sql: ReturnType<typeof postgres> | null = null
let schemaReady: Promise<void> | null = null

export function getSql() {
  if (!sql) {
    const url = process.env.DATABASE_URL
    if (!url) throw new Error('DATABASE_URL manquante côté serveur.')
    sql = postgres(url, {
      prepare: false,
      idle_timeout: 20,
      max: 1,
    })
  }
  return sql
}

/**
 * Create the subscribers table on first use (idempotent). Runs once per
 * server instance thanks to the cached promise.
 */
export function ensureSchema(): Promise<void> {
  if (!schemaReady) {
    const db = getSql()
    schemaReady = (async () => {
      await db`
        CREATE TABLE IF NOT EXISTS subscribers (
          id                bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
          email             text UNIQUE NOT NULL,
          first_name        text,
          city              text,
          country           text,
          postal_code       text,
          phone             text,
          email_consent     boolean NOT NULL DEFAULT false,
          email_consent_at  timestamptz,
          sms_consent       boolean NOT NULL DEFAULT false,
          sms_consent_at    timestamptz,
          age_confirmed     boolean NOT NULL DEFAULT false,
          utm_source        text,
          utm_medium        text,
          utm_campaign      text,
          ip                text,
          crm_synced        boolean NOT NULL DEFAULT false,
          created_at        timestamptz NOT NULL DEFAULT now(),
          updated_at        timestamptz NOT NULL DEFAULT now()
        )
      `
      // Fast lookups for per-country export / CRM backfill.
      await db`CREATE INDEX IF NOT EXISTS subscribers_country_idx ON subscribers (country)`
      await db`CREATE INDEX IF NOT EXISTS subscribers_crm_synced_idx ON subscribers (crm_synced)`
    })().catch((err) => {
      // Reset so a later request can retry schema creation.
      schemaReady = null
      throw err
    })
  }
  return schemaReady
}
