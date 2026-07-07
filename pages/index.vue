<script setup lang="ts">
function scrollToSignup() {
  document.getElementById('signup')?.scrollIntoView({ behavior: 'smooth' })
}
</script>

<template>
  <div class="page">
    <!-- ===================== HERO ===================== -->
    <section class="hero">
      <div class="hero__glow" aria-hidden="true"></div>

      <!-- Key art -->
      <div class="hero__art" aria-hidden="true">
        <img src="/images/keyart-trans.png" alt="" />
      </div>

      <!-- Content -->
      <div class="hero__content container">
        <img
          class="hero__logo"
          src="/images/logo.png"
          alt="Miraculous : Ladybug & Cat Noir — Le Spectacle Live"
        />
        <p class="hero__tagline">Vos héros préférés prennent enfin vie sur scène.</p>
        <button class="cta" type="button" @click="scrollToSignup">
          Restez informé·e
          <span class="cta__arrow" aria-hidden="true">↓</span>
        </button>
      </div>

      <button class="scroll-hint" type="button" aria-label="Aller à l'inscription" @click="scrollToSignup">
        <span></span>
      </button>
    </section>

    <!-- ===================== SIGNUP ===================== -->
    <section id="signup" class="signup-section">
      <div class="container signup-section__inner">
        <div class="signup-section__intro">
          <h1 class="signup-section__title">Ne manquez pas<br />le lever de rideau</h1>
          <p class="signup-section__text">
            Inscrivez-vous pour recevoir en avant-première les dates, l'ouverture de la
            billetterie et les secrets de fabrication du spectacle.
          </p>
        </div>
        <SignupForm />
      </div>
    </section>

    <footer class="footer">
      <div class="container footer__inner">
        <nav class="footer__links">
          <NuxtLink to="/mentions-legales">Mentions légales</NuxtLink>
          <span aria-hidden="true">·</span>
          <NuxtLink to="/confidentialite">Politique de confidentialité</NuxtLink>
        </nav>
        <p>© {{ new Date().getFullYear() }} Miraculous — Le Spectacle Live. Tous droits réservés.</p>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.page {
  min-height: 100dvh;
}

/* ------------------------------- HERO ------------------------------- */
.hero {
  position: relative;
  min-height: 100svh;
  display: flex;
  align-items: center;
  overflow: hidden;
  background:
    radial-gradient(120% 90% at 85% 20%, rgba(168, 0, 32, 0.35), transparent 60%),
    linear-gradient(180deg, #120809 0%, var(--ink) 100%);
}

.hero__glow {
  position: absolute;
  inset: 0;
  background: radial-gradient(60% 50% at 80% 45%, rgba(228, 3, 46, 0.25), transparent 70%);
  pointer-events: none;
}

.hero__art {
  position: absolute;
  right: -4%;
  top: 50%;
  transform: translateY(-50%);
  width: 62%;
  max-width: 900px;
  z-index: 1;
  filter: drop-shadow(0 30px 60px rgba(0, 0, 0, 0.6));
}
.hero__art img {
  width: 100%;
  height: auto;
  /* Blend the light key-art background into the dark stage */
  mix-blend-mode: normal;
}
.hero__art::after {
  /* Fade the left edge of the art into the background */
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, var(--ink) 0%, transparent 22%);
  pointer-events: none;
}

.hero__content {
  position: relative;
  z-index: 2;
  max-width: 640px;
}
.hero__logo {
  width: min(78%, 460px);
  filter: drop-shadow(0 6px 24px rgba(0, 0, 0, 0.6));
  margin-bottom: 1.5rem;
}
.hero__tagline {
  font-size: clamp(1.1rem, 2.6vw, 1.6rem);
  color: var(--cream);
  max-width: 22ch;
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

/* ---------------------------- RESPONSIVE ---------------------------- */
@media (min-width: 860px) {
  .signup-section__inner {
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
  }
}

/* Mobile: key art becomes a faded backdrop behind the content */
@media (max-width: 859px) {
  .hero {
    align-items: flex-start;
    padding-top: 12vh;
    text-align: center;
  }
  .hero__art {
    width: 130%;
    right: -15%;
    top: auto;
    bottom: 0;
    transform: none;
    opacity: 0.4;
  }
  .hero__art::after {
    background: linear-gradient(0deg, transparent 0%, var(--ink) 85%);
  }
  .hero__content {
    margin-inline: auto;
  }
  .hero__logo {
    width: min(85%, 360px);
    margin-inline: auto;
  }
  .hero__tagline {
    margin-inline: auto;
  }
}
</style>
