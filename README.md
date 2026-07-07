# Miraculous : Ladybug & Cat Noir — Le Spectacle Live

Landing page (Nuxt 3) for the live stage show. Full-screen hero with the key
art, tagline and CTA, plus a two-step newsletter signup that pushes contacts to
[Brevo](https://www.brevo.com/).

## Stack

- **Nuxt 3** (Vue 3, Nitro server)
- Server route `/api/subscribe` → Brevo Contacts API
- French, mobile-first, dark theatrical aesthetic

## Getting started

```bash
npm install
cp .env.example .env    # then fill in BREVO_API_KEY
npm run dev             # http://localhost:3000
```

## Environment

| Variable         | Required | Description                                            |
| ---------------- | -------- | ------------------------------------------------------ |
| `BREVO_API_KEY`  | yes      | Brevo API key (used server-side only).                 |
| `BREVO_LIST_ID`  | no       | Numeric Brevo list ID to add each contact to.          |

## Signup flow

A single screen collects prénom, e-mail (required), code postal (optional) and
phone (optional), with two independent, unchecked-by-default opt-in checkboxes —
one for e-mail updates and one for SMS updates. Submitting upserts the contact
in Brevo with the consent flags recorded explicitly.

Consent choices are stored as Brevo contact attributes:

| Attribute      | Meaning                          |
| -------------- | -------------------------------- |
| `PRENOM`       | First name                       |
| `CODE_POSTAL`  | Postal code                      |
| `SMS`          | Phone (E.164, Brevo SMS field)   |
| `OPT_IN_EMAIL` | Consent to e-mail updates        |
| `OPT_IN_SMS`   | Consent to SMS updates           |

> Create these attributes in your Brevo account (Contacts → Settings →
> Contact attributes) if they don't exist yet.

## Assets & fonts

- Key art and logo live in `public/images/` (original source files, incl.
  `.ai`, in `design-source/`).
- The display font is **Aquavit (TT)** — drop the web font into
  `public/fonts/` as `Aquavit.woff2` (see `public/fonts/README.md`).

## Production

```bash
npm run build
node .output/server/index.mjs
```
