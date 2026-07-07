<script setup lang="ts">
const loading = ref(false)
const done = ref(false)
const errorMsg = ref('')

const firstName = ref('')
const email = ref('')
const postalCode = ref('')
const phone = ref('')
const emailConsent = ref(false)
const smsConsent = ref(false)

const emailValid = computed(() => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim()))

async function submit() {
  errorMsg.value = ''
  if (!emailValid.value) {
    errorMsg.value = 'Merci de saisir une adresse e-mail valide.'
    return
  }

  loading.value = true
  try {
    await $fetch('/api/subscribe', {
      method: 'POST',
      body: {
        firstName: firstName.value,
        email: email.value,
        postalCode: postalCode.value,
        phone: phone.value,
        emailConsent: emailConsent.value,
        smsConsent: smsConsent.value,
      },
    })
    done.value = true
  } catch (err: any) {
    errorMsg.value =
      err?.data?.statusMessage || err?.statusMessage || "L'inscription a échoué. Réessayez."
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="signup">
    <!-- FORM -->
    <form v-if="!done" class="form" novalidate @submit.prevent="submit">
      <h2 class="form__title">Rejoignez l'aventure</h2>
      <p class="form__lead">
        Soyez les premiers informés de la billetterie, des dates et des coulisses du spectacle.
      </p>

      <div class="field">
        <label for="firstName">Prénom</label>
        <input id="firstName" v-model="firstName" type="text" autocomplete="given-name" placeholder="Marinette" />
      </div>

      <div class="field">
        <label for="email">E-mail <span class="req">*</span></label>
        <input
          id="email"
          v-model="email"
          type="email"
          required
          autocomplete="email"
          placeholder="vous@exemple.com"
        />
      </div>

      <div class="field-row">
        <div class="field">
          <label for="postalCode">Code postal <span class="opt">(optionnel)</span></label>
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
          <label for="phone">Téléphone <span class="opt">(optionnel)</span></label>
          <input
            id="phone"
            v-model="phone"
            type="tel"
            autocomplete="tel"
            placeholder="06 12 34 56 78"
          />
        </div>
      </div>

      <label class="check">
        <input v-model="emailConsent" type="checkbox" />
        <span>J'accepte de recevoir les actualités et offres du spectacle par e-mail.</span>
      </label>

      <label class="check">
        <input v-model="smsConsent" type="checkbox" />
        <span>J'accepte de recevoir des informations sur le spectacle par SMS.</span>
      </label>

      <p v-if="errorMsg" class="error" role="alert">{{ errorMsg }}</p>

      <button class="btn" type="submit" :disabled="loading">
        {{ loading ? 'Un instant…' : 'Je m’inscris' }}
      </button>

      <p class="legal">
        En vous inscrivant, vous acceptez que vos données soient utilisées pour vous envoyer
        les communications choisies. Vous pouvez vous désinscrire à tout moment. Pour en savoir
        plus, consultez notre
        <NuxtLink to="/confidentialite">politique de confidentialité</NuxtLink>.
      </p>
    </form>

    <!-- DONE -->
    <div v-else class="form done">
      <h2 class="form__title">Merci&nbsp;!</h2>
      <p class="form__lead">
        Votre inscription est confirmée. Gardez un œil sur votre boîte mail — le rideau se lève
        bientôt.
      </p>
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
  flex: 1;
}
.field-row {
  display: flex;
  gap: 0.9rem;
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

.field input {
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
.field input:focus {
  outline: none;
  border-color: var(--red);
  box-shadow: 0 0 0 3px rgba(228, 3, 46, 0.25);
}

.check {
  display: flex;
  gap: 0.65rem;
  align-items: flex-start;
  font-size: 0.9rem;
  color: var(--cream-dim);
  margin: 0.5rem 0 1rem;
  cursor: pointer;
}
.check:last-of-type {
  margin-bottom: 1.5rem;
}
.check input {
  margin-top: 0.2rem;
  width: 18px;
  height: 18px;
  accent-color: var(--red);
  flex: none;
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

@media (max-width: 480px) {
  .field-row {
    flex-direction: column;
    gap: 0;
  }
}
</style>
