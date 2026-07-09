<script setup lang="ts">
import { sortedCountries, countries } from '~/utils/countries'

const { t, locale } = useLocale()
const route = useRoute()

const loading = ref(false)
const done = ref(false)
const errorMsg = ref('')

const firstName = ref('')
const email = ref('')
const country = ref('') // ISO alpha-2, required
const postalCode = ref('')
const dialCode = ref('+33')
const phone = ref('')
const emailConsent = ref(false)
const smsConsent = ref(false)
const ageConfirmed = ref(false)

const countryOptions = computed(() => sortedCountries(locale.value))
const emailValid = computed(() => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim()))

// UTM attribution captured from the landing URL, forwarded with the contact.
const utm = {
  source: (route.query.utm_source as string) || '',
  medium: (route.query.utm_medium as string) || '',
  campaign: (route.query.utm_campaign as string) || '',
}

// Default the dialing code to the selected country.
watch(country, (code) => {
  const c = countries.find((x) => x.code === code)
  if (c) dialCode.value = c.dial
})

async function submit() {
  errorMsg.value = ''
  if (!emailValid.value) return void (errorMsg.value = t('form.errEmail'))
  if (!country.value) return void (errorMsg.value = t('form.errCountry'))
  if (!ageConfirmed.value) return void (errorMsg.value = t('form.errAge'))

  loading.value = true
  try {
    await $fetch('/api/subscribe', {
      method: 'POST',
      body: {
        firstName: firstName.value,
        email: email.value,
        country: country.value,
        postalCode: postalCode.value,
        phone: phone.value.trim() ? `${dialCode.value} ${phone.value.trim()}` : '',
        emailConsent: emailConsent.value,
        smsConsent: smsConsent.value,
        ageConfirmed: ageConfirmed.value,
        utmSource: utm.source,
        utmMedium: utm.medium,
        utmCampaign: utm.campaign,
      },
    })
    done.value = true
  } catch (err: any) {
    errorMsg.value =
      err?.data?.statusMessage || err?.statusMessage || t('form.errGeneric')
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="signup">
    <!-- FORM -->
    <form v-if="!done" class="form" novalidate @submit.prevent="submit">
      <h2 class="form__title">{{ t('form.title') }}</h2>
      <p class="form__lead">{{ t('form.lead') }}</p>

      <div class="field">
        <label for="firstName">{{ t('form.firstName') }}</label>
        <input
          id="firstName"
          v-model="firstName"
          type="text"
          autocomplete="given-name"
          :placeholder="t('form.firstNamePlaceholder')"
        />
      </div>

      <div class="field">
        <label for="email">{{ t('form.email') }} <span class="req">*</span></label>
        <input
          id="email"
          v-model="email"
          type="email"
          required
          autocomplete="email"
          :placeholder="t('form.emailPlaceholder')"
        />
      </div>

      <div class="field">
        <label for="country">{{ t('form.country') }} <span class="req">*</span></label>
        <select id="country" v-model="country" required class="select" :class="{ empty: !country }">
          <option value="" disabled>{{ t('form.countryPlaceholder') }}</option>
          <option v-for="c in countryOptions" :key="c.code" :value="c.code">
            {{ locale === 'fr' ? c.fr : c.en }}
          </option>
        </select>
      </div>

      <div class="field">
        <label for="postalCode">{{ t('form.postalCode') }} <span class="opt">{{ t('form.optional') }}</span></label>
        <input
          id="postalCode"
          v-model="postalCode"
          type="text"
          inputmode="numeric"
          autocomplete="postal-code"
          placeholder="75001"
        />
      </div>

      <div class="field">
        <label for="phone">{{ t('form.phone') }} <span class="opt">{{ t('form.optional') }}</span></label>
        <div class="phone-group">
          <select v-model="dialCode" class="select dial" :aria-label="t('form.dialCode')">
            <option v-for="c in countryOptions" :key="c.code" :value="c.dial">
              {{ c.code }} {{ c.dial }}
            </option>
          </select>
          <input
            id="phone"
            v-model="phone"
            type="tel"
            autocomplete="tel"
            :placeholder="t('form.phonePlaceholder')"
          />
        </div>
      </div>

      <label class="check">
        <input v-model="emailConsent" type="checkbox" />
        <span>{{ t('form.emailConsent') }}</span>
      </label>

      <label class="check">
        <input v-model="smsConsent" type="checkbox" />
        <span>{{ t('form.smsConsent') }}</span>
      </label>

      <label class="check check--required">
        <input v-model="ageConfirmed" type="checkbox" />
        <span>{{ t('form.age') }} <span class="req">*</span></span>
      </label>

      <p v-if="errorMsg" class="error" role="alert">{{ errorMsg }}</p>

      <button class="btn" type="submit" :disabled="loading">
        {{ loading ? t('form.submitting') : t('form.submit') }}
      </button>

      <p class="legal">
        {{ t('form.legalPre') }}
        <NuxtLink to="/confidentialite">{{ t('form.legalLink') }}</NuxtLink>.
      </p>
    </form>

    <!-- DONE -->
    <div v-else class="form done">
      <h2 class="form__title">{{ t('form.doneTitle') }}</h2>
      <p class="form__lead">{{ t('form.doneText') }}</p>
      <div class="done__mark" aria-hidden="true">🐞</div>
    </div>
  </div>
</template>

<style scoped>
.signup {
  width: 100%;
  max-width: 460px;
  margin-inline: auto;
  background: var(--ink-panel);
  border: 1px solid rgba(228, 3, 46, 0.35);
  border-radius: 18px;
  padding: 2rem 1.75rem 2.25rem;
  box-shadow: 0 30px 80px -30px rgba(0, 0, 0, 0.9), 0 0 0 1px rgba(255, 255, 255, 0.02) inset;
}

.form__title {
  font-size: clamp(1.6rem, 5vw, 2.1rem);
  color: var(--cream);
  margin-bottom: 0.4rem;
}
.form__lead {
  color: var(--cream-dim);
  font-size: 0.95rem;
  margin-bottom: 1.5rem;
}

.field {
  margin-bottom: 1rem;
}
.field label {
  display: block;
  font-size: 0.8rem;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: var(--cream-dim);
  margin-bottom: 0.4rem;
}
.req {
  color: var(--red);
}
.opt {
  text-transform: none;
  letter-spacing: 0;
  opacity: 0.65;
}

.field input,
.select {
  width: 100%;
  padding: 0.85rem 1rem;
  background: rgba(0, 0, 0, 0.35);
  border: 1px solid rgba(255, 255, 255, 0.14);
  border-radius: 10px;
  color: var(--cream);
  font-size: 1rem;
  font-family: var(--font-body);
  transition: border-color 0.15s ease, box-shadow 0.15s ease;
}
.field input::placeholder {
  color: rgba(203, 192, 174, 0.4);
}
.field input:focus,
.select:focus {
  outline: none;
  border-color: var(--red);
  box-shadow: 0 0 0 3px rgba(228, 3, 46, 0.25);
}

/* Native select styling */
.select {
  appearance: none;
  -webkit-appearance: none;
  cursor: pointer;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath fill='%23cbc0ae' d='M1 1l5 5 5-5'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 1rem center;
  padding-right: 2.4rem;
}
.select.empty {
  color: rgba(203, 192, 174, 0.4);
}
.select option {
  color: #111;
}

.phone-group {
  display: flex;
  gap: 0.5rem;
}
.phone-group .dial {
  width: 7rem;
  flex: none;
}
.phone-group input {
  flex: 1;
}

.check {
  display: flex;
  gap: 0.65rem;
  align-items: flex-start;
  font-size: 0.9rem;
  color: var(--cream-dim);
  margin: 0.5rem 0 0.75rem;
  cursor: pointer;
}
.check input {
  margin-top: 0.2rem;
  width: 18px;
  height: 18px;
  accent-color: var(--red);
  flex: none;
}
.check--required {
  margin-bottom: 1.25rem;
}

.sms-note {
  font-size: 0.72rem;
  line-height: 1.4;
  color: rgba(203, 192, 174, 0.5);
  margin: -0.35rem 0 1rem;
  padding-left: 1.85rem;
}

.btn {
  width: 100%;
  padding: 0.95rem 1rem;
  border: none;
  border-radius: 999px;
  background: var(--red);
  color: #fff;
  font-family: var(--font-display);
  font-size: 1.15rem;
  letter-spacing: 0.03em;
  cursor: pointer;
  transition: transform 0.12s ease, background 0.15s ease;
}
.btn:hover:not(:disabled) {
  background: #ff1f4a;
  transform: translateY(-1px);
}
.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.error {
  color: #ff6b81;
  font-size: 0.9rem;
  margin-bottom: 1rem;
}

.legal {
  margin-top: 1rem;
  font-size: 0.72rem;
  line-height: 1.5;
  color: rgba(203, 192, 174, 0.55);
}
.legal a {
  color: var(--cream-dim);
  text-decoration: underline;
}
.legal a:hover {
  color: var(--red);
}

.done {
  text-align: center;
}
.done__mark {
  font-size: 3rem;
  margin-top: 1rem;
}
</style>
