<script setup lang="ts">
type Step = 1 | 2 | 'done'

const step = ref<Step>(1)
const loading = ref(false)
const errorMsg = ref('')

// Step 1
const firstName = ref('')
const email = ref('')
const postalCode = ref('')
const emailConsent = ref(false)

// Step 2
const phone = ref('')
const smsConsent = ref(false)

const emailValid = computed(() => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim()))

async function submitStep1() {
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
        emailConsent: emailConsent.value,
        smsConsent: false,
      },
    })
    step.value = 2
  } catch (err: any) {
    errorMsg.value =
      err?.data?.statusMessage || err?.statusMessage || "L'inscription a échoué. Réessayez."
  } finally {
    loading.value = false
  }
}

async function submitStep2() {
  errorMsg.value = ''
  // Nothing to send if no phone was given — just finish.
  if (!phone.value.trim()) {
    step.value = 'done'
    return
  }

  loading.value = true
  try {
    await $fetch('/api/subscribe', {
      method: 'POST',
      body: {
        email: email.value,
        phone: phone.value,
        smsConsent: smsConsent.value,
      },
    })
    step.value = 'done'
  } catch (err: any) {
    errorMsg.value =
      err?.data?.statusMessage || err?.statusMessage || 'La mise à jour a échoué. Réessayez.'
  } finally {
    loading.value = false
  }
}

function skipStep2() {
  step.value = 'done'
}
</script>

<template>
  <div class="signup">
    <!-- Step indicator -->
    <div v-if="step !== 'done'" class="steps" aria-hidden="true">
      <span class="dot" :class="{ active: step === 1, past: step === 2 }">1</span>
      <span class="bar" :class="{ past: step === 2 }"></span>
      <span class="dot" :class="{ active: step === 2 }">2</span>
    </div>

    <!-- STEP 1 -->
    <form v-if="step === 1" class="form" novalidate @submit.prevent="submitStep1">
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

      <label class="check">
        <input v-model="emailConsent" type="checkbox" />
        <span>J'accepte de recevoir les actualités et offres du spectacle par e-mail.</span>
      </label>

      <p v-if="errorMsg" class="error" role="alert">{{ errorMsg }}</p>

      <button class="btn" type="submit" :disabled="loading">
        {{ loading ? 'Un instant…' : 'Continuer' }}
      </button>
    </form>

    <!-- STEP 2 -->
    <form v-else-if="step === 2" class="form" novalidate @submit.prevent="submitStep2">
      <h2 class="form__title">Presque terminé&nbsp;!</h2>
      <p class="form__lead">
        Vous préférez être prévenu·e par SMS&nbsp;? Ajoutez votre numéro — c'est facultatif.
      </p>

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

      <label class="check">
        <input v-model="smsConsent" type="checkbox" />
        <span>J'accepte de recevoir des informations sur le spectacle par SMS.</span>
      </label>

      <p v-if="errorMsg" class="error" role="alert">{{ errorMsg }}</p>

      <button class="btn" type="submit" :disabled="loading">
        {{ loading ? 'Un instant…' : 'Valider' }}
      </button>
      <button class="btn btn--ghost" type="button" :disabled="loading" @click="skipStep2">
        Passer cette étape
      </button>
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

.steps {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}
.dot {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--cream-dim);
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.1);
}
.dot.active {
  color: #fff;
  background: var(--red);
  border-color: var(--red);
}
.dot.past {
  color: var(--red);
  border-color: var(--red);
}
.bar {
  width: 46px;
  height: 2px;
  background: rgba(255, 255, 255, 0.12);
}
.bar.past {
  background: var(--red);
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
  margin: 0.75rem 0 1.5rem;
  cursor: pointer;
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
.btn--ghost {
  margin-top: 0.6rem;
  background: transparent;
  color: var(--cream-dim);
  border: 1px solid rgba(255, 255, 255, 0.15);
  font-size: 0.95rem;
}
.btn--ghost:hover:not(:disabled) {
  background: rgba(255, 255, 255, 0.05);
  color: var(--cream);
}

.error {
  color: #ff6b81;
  font-size: 0.9rem;
  margin-bottom: 1rem;
}

.done {
  text-align: center;
}
.done__mark {
  font-size: 3rem;
  margin-top: 1rem;
}
</style>
