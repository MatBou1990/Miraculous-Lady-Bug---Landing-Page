<script setup lang="ts">
const { t, locale, toggle } = useLocale()

function scrollToSignup() {
  document.getElementById('signup')?.scrollIntoView({ behavior: 'smooth' })
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

    <!-- ===================== HERO ===================== -->
    <section class="hero">
      <div class="hero__glow" aria-hidden="true"></div>

      <!-- Key art (left) -->
      <div class="hero__art" aria-hidden="true">
        <img src="/images/keyart-0707-trans.png" alt="" />
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

/* ------------------------------- HERO ------------------------------- */
.hero {
  position: relative;
  min-height: 100svh;
  display: flex;
  align-items: center;
  overflow: hidden;
  background:
    radial-gradient(90% 80% at 22% 42%, rgba(168, 0, 32, 0.28), transparent 55%),
    linear-gradient(180deg, #140809 0%, var(--ink) 70%);
}

/* Red "spotlight" sun-glow behind the art, echoing the key-art sun */
.hero__glow {
  position: absolute;
  left: -10%;
  top: 50%;
  transform: translateY(-50%);
  width: 55%;
  aspect-ratio: 1;
  background: radial-gradient(circle, rgba(228, 3, 46, 0.5) 0%, rgba(228, 3, 46, 0.12) 38%, transparent 66%);
  filter: blur(10px);
  pointer-events: none;
  z-index: 0;
}

/* Key art on the LEFT, edge feathered into the dark with a gradient mask */
.hero__art {
  position: absolute;
  left: -6%;
  top: 50%;
  transform: translateY(-50%);
  width: 52%;
  max-width: 820px;
  z-index: 1;
  filter: drop-shadow(0 40px 70px rgba(0, 0, 0, 0.55));
  /* Slick dissolve on the right + a touch on the bottom, into the stage dark */
  -webkit-mask-image:
    linear-gradient(90deg, #000 82%, transparent 100%),
    linear-gradient(0deg, transparent 0%, #000 12%);
  -webkit-mask-composite: source-in;
  mask-image:
    linear-gradient(90deg, #000 82%, transparent 100%),
    linear-gradient(0deg, transparent 0%, #000 12%);
  mask-composite: intersect;
}
.hero__art img {
  width: 100%;
  height: auto;
}

/* Content pushed to the RIGHT */
.hero__content {
  position: relative;
  z-index: 2;
  max-width: 640px;
  margin-left: auto;
  text-align: right;
}
.hero__logo {
  width: min(78%, 460px);
  margin-left: auto;
  filter: drop-shadow(0 6px 24px rgba(0, 0, 0, 0.6));
  margin-bottom: 1.5rem;
}
.hero__tagline {
  font-size: clamp(1.1rem, 2.6vw, 1.6rem);
  color: var(--cream);
  max-width: 22ch;
  margin-left: auto;
  margin-bottom: 2rem;
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
