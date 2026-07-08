<script setup lang="ts">
const { t, locale, toggle } = useLocale()
const route = useRoute()

function scrollToSignup() {
  document.getElementById('signup')?.scrollIntoView({ behavior: 'smooth' })
}

// ---- Live layout tuner (only visible with ?tune=1 in the URL) ----
const tuning = computed(() => route.query.tune !== undefined)
const heroH = ref(80) // hero height (svh)
const artW = ref(64) // key-art width (% of viewport)
const artX = ref(-4) // key-art horizontal offset (%)
const artY = ref(0) // key-art vertical offset (%)
const textScale = ref(1) // scale of the centered logo/tagline/CTA block

const heroStyle = computed(() => ({
  '--hero-h': heroH.value + 'svh',
  '--art-w': artW.value + '%',
  '--art-x': artX.value + '%',
  '--art-y': artY.value + '%',
  '--content-scale': String(textScale.value),
}))

const tuneSummary = computed(
  () => `hero-h:${heroH.value}svh art-w:${artW.value}% x:${artX.value}% y:${artY.value}% text:${textScale.value}`,
)
const copied = ref(false)

// Persist tuner values in the browser (only in ?tune=1 mode) so adjustments
// survive a reload. The public site (no ?tune) always uses the baked defaults.
onMounted(() => {
  if (!tuning.value) return
  try {
    const s = JSON.parse(localStorage.getItem('heroTune') || 'null')
    if (s) {
      heroH.value = s.heroH ?? heroH.value
      artW.value = s.artW ?? artW.value
      artX.value = s.artX ?? artX.value
      artY.value = s.artY ?? artY.value
      textScale.value = s.textScale ?? textScale.value
    }
  } catch {}
  watch([heroH, artW, artX, artY, textScale], () => {
    try {
      localStorage.setItem(
        'heroTune',
        JSON.stringify({
          heroH: heroH.value,
          artW: artW.value,
          artX: artX.value,
          artY: artY.value,
          textScale: textScale.value,
        }),
      )
    } catch {}
  })
})

function copyTune() {
  try {
    navigator.clipboard?.writeText(tuneSummary.value)
    copied.value = true
    setTimeout(() => (copied.value = false), 1500)
  } catch {}
}
</script>

<template>
  <div class="page">
    <!-- Language toggle (French launch default; English for client review) -->
    <button class="lang" type="button" @click="toggle">
      <span :class="{ on: locale === 'fr' }">FR</span>
      <span class="sep">/</span>
      <span :class="{ on: locale === 'en' }">EN</span>
    </button>

    <!-- Live layout tuner — add ?tune=1 to the URL to show it -->
    <div v-if="tuning" class="tuner">
      <strong>Réglages hero</strong>
      <label>Hauteur&nbsp;: {{ heroH }}svh
        <input v-model.number="heroH" type="range" min="45" max="100" />
      </label>
      <label>Image&nbsp;: {{ artW }}%
        <input v-model.number="artW" type="range" min="20" max="80" />
      </label>
      <label>Image X&nbsp;: {{ artX }}%
        <input v-model.number="artX" type="range" min="-25" max="40" />
      </label>
      <label>Image Y&nbsp;: {{ artY }}%
        <input v-model.number="artY" type="range" min="-20" max="20" />
      </label>
      <label>Texte&nbsp;: {{ textScale }}×
        <input v-model.number="textScale" type="range" min="0.6" max="1.6" step="0.05" />
      </label>
      <code>{{ tuneSummary }}</code>
      <button type="button" class="tuner__copy" @click="copyTune">
        {{ copied ? 'Copié ✓' : 'Copier les valeurs' }}
      </button>
    </div>

    <!-- ===================== HERO ===================== -->
    <section class="hero" :style="heroStyle">
      <img class="hero__bug" src="/images/ladybug-icon.png" alt="" aria-hidden="true" />
      <div class="hero__glow" aria-hidden="true"></div>

      <!-- Key art (bottom-left) -->
      <div class="hero__art" aria-hidden="true">
        <img src="/images/keyart-0808-trans.png" alt="" />
      </div>

      <!-- Content (right) -->
      <div class="hero__content container">
        <img class="hero__logo" src="/images/logo.png" :alt="t('hero.logoAlt')" />
        <p class="hero__tagline">{{ t('hero.tagline') }}</p>
        <button class="cta" type="button" @click="scrollToSignup">
          {{ t('hero.cta') }}
          <span class="cta__arrow" aria-hidden="true">↓</span>
        </button>
      </div>

      <button class="scroll-hint" type="button" :aria-label="t('hero.scrollAria')" @click="scrollToSignup">
        <span></span>
      </button>
    </section>

    <!-- ===================== SIGNUP ===================== -->
    <section id="signup" class="signup-section">
      <div class="container signup-section__inner">
        <div class="signup-section__intro">
          <h1 class="signup-section__title">
            {{ t('signup.introTitleA') }}<br />{{ t('signup.introTitleB') }}
          </h1>
          <p class="signup-section__text">{{ t('signup.introText') }}</p>
        </div>
        <SignupForm />
      </div>
    </section>

    <footer class="footer">
      <div class="container footer__inner">
        <nav class="footer__links">
          <NuxtLink to="/mentions-legales">{{ t('footer.legal') }}</NuxtLink>
          <span aria-hidden="true">·</span>
          <NuxtLink to="/confidentialite">{{ t('footer.privacy') }}</NuxtLink>
        </nav>
        <p class="footer__license">{{ t('footer.license') }}</p>
        <p>© {{ new Date().getFullYear() }} Miraculous — Le Spectacle Live. {{ t('footer.rights') }}</p>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.page {
  min-height: 100dvh;
}

/* --------------------------- LANG TOGGLE --------------------------- */
.lang {
  position: fixed;
  top: 1.1rem;
  right: 1.1rem;
  z-index: 50;
  display: flex;
  gap: 0.35rem;
  align-items: center;
  padding: 0.4rem 0.75rem;
  background: rgba(10, 5, 7, 0.6);
  border: 1px solid rgba(243, 233, 216, 0.25);
  border-radius: 999px;
  color: var(--cream-dim);
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  cursor: pointer;
  backdrop-filter: blur(6px);
}
.lang span.on {
  color: var(--red);
}
.lang .sep {
  opacity: 0.4;
}

/* --------------------------- LIVE TUNER --------------------------- */
.tuner {
  position: fixed;
  bottom: 1rem;
  right: 1rem;
  z-index: 60;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 230px;
  padding: 0.9rem 1rem;
  background: rgba(10, 5, 7, 0.85);
  border: 1px solid rgba(228, 3, 46, 0.5);
  border-radius: 12px;
  color: var(--cream);
  font-size: 0.78rem;
  backdrop-filter: blur(8px);
}
.tuner strong {
  color: var(--red);
  font-size: 0.8rem;
}
.tuner label {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}
.tuner input[type='range'] {
  width: 100%;
  accent-color: var(--red);
}
.tuner code {
  margin-top: 0.25rem;
  font-size: 0.68rem;
  color: var(--cream-dim);
  word-break: break-all;
}
.tuner__copy {
  margin-top: 0.35rem;
  padding: 0.45rem;
  border: none;
  border-radius: 8px;
  background: var(--red);
  color: #fff;
  font-size: 0.78rem;
  font-weight: 700;
  cursor: pointer;
}
.tuner__copy:hover {
  background: #ff1f4a;
}

/* ------------------------------- HERO ------------------------------- */
.hero {
  position: relative;
  min-height: var(--hero-h, 78svh);
  display: flex;
  align-items: flex-start;
  padding-top: 6vh;
  overflow: hidden;
  background:
    radial-gradient(90% 80% at 22% 42%, rgba(168, 0, 32, 0.28), transparent 55%),
    linear-gradient(180deg, #140809 0%, var(--ink) 70%);
}

/* Miraculous ladybug emblem, top-left */
.hero__bug {
  position: absolute;
  top: 1.3rem;
  left: 1.5rem;
  width: 58px;
  height: auto;
  z-index: 4;
  filter: drop-shadow(0 3px 10px rgba(0, 0, 0, 0.5));
}

/* Red "spotlight" sun-glow behind the art, echoing the key-art sun */
.hero__glow {
  position: absolute;
  left: -12%;
  top: 46%;
  transform: translateY(-50%);
  width: 56%;
  aspect-ratio: 1;
  background: radial-gradient(circle, rgba(228, 3, 46, 0.5) 0%, rgba(228, 3, 46, 0.12) 38%, transparent 66%);
  filter: blur(10px);
  pointer-events: none;
  z-index: 0;
}

/* Key art anchored BOTTOM-LEFT, right edge feathered into the dark.
   Size/position driven by CSS vars so the ?tune=1 panel can adjust them live. */
.hero__art {
  position: absolute;
  left: 0;
  bottom: 0;
  top: auto;
  transform: translate(var(--art-x, 0%), var(--art-y, 0%));
  width: var(--art-w, 56%);
  max-width: 1000px;
  z-index: 1;
  filter: drop-shadow(0 30px 60px rgba(0, 0, 0, 0.5));
  -webkit-mask-image: linear-gradient(90deg, #000 86%, transparent 100%);
  mask-image: linear-gradient(90deg, #000 86%, transparent 100%);
}
.hero__art img {
  width: 100%;
  height: auto;
  display: block;
}

/* Content centered */
.hero__content {
  position: relative;
  z-index: 2;
  max-width: 640px;
  margin: 0 auto;
  text-align: center;
  transform: scale(var(--content-scale, 1));
  transform-origin: top center;
}
.hero__logo {
  width: min(74%, 440px);
  margin: 0 auto 1.5rem;
  filter: drop-shadow(0 6px 24px rgba(0, 0, 0, 0.6));
}
.hero__tagline {
  font-size: clamp(1.1rem, 2.6vw, 1.6rem);
  color: var(--cream);
  max-width: 26ch;
  margin: 0 auto 2rem;
  text-shadow: 0 2px 12px rgba(0, 0, 0, 0.8);
}

.cta {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  padding: 1rem 2.2rem;
  border: none;
  border-radius: 999px;
  background: var(--red);
  color: #fff;
  font-family: var(--font-display);
  font-size: 1.25rem;
  letter-spacing: 0.03em;
  cursor: pointer;
  box-shadow: 0 12px 30px -8px rgba(228, 3, 46, 0.7);
  transition: transform 0.15s ease, background 0.15s ease;
}
.cta:hover {
  background: #ff1f4a;
  transform: translateY(-2px);
}
.cta__arrow {
  animation: bob 1.6s ease-in-out infinite;
}

.scroll-hint {
  position: absolute;
  left: 50%;
  bottom: 1.5rem;
  transform: translateX(-50%);
  width: 26px;
  height: 42px;
  border: 2px solid rgba(243, 233, 216, 0.5);
  border-radius: 20px;
  background: transparent;
  cursor: pointer;
  z-index: 3;
}
.scroll-hint span {
  position: absolute;
  left: 50%;
  top: 8px;
  width: 4px;
  height: 8px;
  margin-left: -2px;
  border-radius: 2px;
  background: var(--cream);
  animation: bob 1.6s ease-in-out infinite;
}

@keyframes bob {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(6px); }
}

/* ------------------------------ SIGNUP ------------------------------ */
.signup-section {
  position: relative;
  padding: 5rem 0 4rem;
  background:
    radial-gradient(80% 60% at 20% 0%, rgba(168, 0, 32, 0.25), transparent 60%),
    var(--ink-soft);
  border-top: 1px solid rgba(228, 3, 46, 0.25);
}
.signup-section__inner {
  display: grid;
  grid-template-columns: 1fr;
  gap: 3rem;
  align-items: center;
}
.signup-section__title {
  font-size: clamp(2.2rem, 7vw, 3.8rem);
  color: var(--red);
  text-transform: uppercase;
  margin-bottom: 1rem;
}
.signup-section__text {
  color: var(--cream-dim);
  font-size: 1.05rem;
  max-width: 40ch;
}

/* ------------------------------ FOOTER ------------------------------ */
.footer {
  padding: 2rem 0;
  background: var(--ink);
  border-top: 1px solid rgba(255, 255, 255, 0.06);
}
.footer__inner {
  text-align: center;
  color: rgba(203, 192, 174, 0.5);
  font-size: 0.85rem;
}
.footer__links {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: center;
  margin-bottom: 0.75rem;
}
.footer__links a {
  color: var(--cream-dim);
  transition: color 0.15s ease;
}
.footer__links a:hover {
  color: var(--red);
}
.footer__license {
  max-width: 60ch;
  margin: 0 auto 0.6rem;
  font-size: 0.72rem;
  line-height: 1.5;
  color: rgba(203, 192, 174, 0.4);
}

/* ---------------------------- RESPONSIVE ---------------------------- */
@media (min-width: 860px) {
  .signup-section__inner {
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
  }
}

/* Mobile: key art sits at the TOP, full and sharp; content stacks below */
@media (max-width: 859px) {
  .hero {
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    padding: 0 1.5rem 3rem;
    text-align: center;
  }
  .hero__art {
    position: static;
    order: -1;
    width: 100%;
    max-width: 540px;
    left: auto;
    top: auto;
    bottom: auto;
    transform: none;
    opacity: 1;
    margin-top: 3.5rem; /* clear the language toggle */
    filter: drop-shadow(0 24px 44px rgba(0, 0, 0, 0.55));
    /* Melt the bottom of the art into the content below */
    -webkit-mask-image: linear-gradient(180deg, #000 66%, transparent 100%);
    mask-image: linear-gradient(180deg, #000 66%, transparent 100%);
  }
  .hero__glow {
    left: 50%;
    top: 34%;
    width: 110%;
    transform: translate(-50%, -50%);
    opacity: 0.75;
  }
  .hero__content {
    margin: -1.5rem auto 0;
    text-align: center;
  }
  .hero__logo {
    width: min(80%, 340px);
    margin-inline: auto;
  }
  .hero__tagline {
    margin-inline: auto;
  }
  .scroll-hint {
    display: none;
  }
}
</style>
