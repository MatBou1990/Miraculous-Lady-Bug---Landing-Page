<script setup lang="ts">
defineProps<{ title: string }>()
</script>

<template>
  <main class="legal-page">
    <div class="container">
      <NuxtLink to="/" class="back">← Retour à l'accueil</NuxtLink>
      <h1 class="legal-page__title">{{ title }}</h1>
      <div class="legal-page__body">
        <slot />
      </div>
    </div>
  </main>
</template>

<style scoped>
.legal-page {
  min-height: 100dvh;
  padding: 4rem 0 6rem;
  background:
    radial-gradient(80% 50% at 20% 0%, rgba(168, 0, 32, 0.18), transparent 60%),
    var(--ink);
}
.legal-page .container {
  max-width: 760px;
}
.back {
  display: inline-block;
  color: var(--cream-dim);
  font-size: 0.9rem;
  margin-bottom: 2rem;
  transition: color 0.15s ease;
}
.back:hover {
  color: var(--red);
}
.legal-page__title {
  font-size: clamp(2rem, 6vw, 3rem);
  color: var(--red);
  text-transform: uppercase;
  margin-bottom: 2rem;
}
.legal-page__body {
  color: var(--cream-dim);
  font-size: 0.98rem;
  line-height: 1.7;
}
.legal-page__body :deep(h2) {
  font-family: var(--font-display);
  color: var(--cream);
  font-size: 1.35rem;
  margin: 2rem 0 0.75rem;
}
.legal-page__body :deep(p),
.legal-page__body :deep(ul) {
  margin-bottom: 1rem;
}
.legal-page__body :deep(ul) {
  padding-left: 1.25rem;
}
.legal-page__body :deep(li) {
  margin-bottom: 0.35rem;
}
.legal-page__body :deep(a) {
  color: var(--cream);
  text-decoration: underline;
}
.legal-page__body :deep(a:hover) {
  color: var(--red);
}
.legal-page__body :deep(.todo) {
  color: #ffcf5c;
  font-style: italic;
}
</style>
