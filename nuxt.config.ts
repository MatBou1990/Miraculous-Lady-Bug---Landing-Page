// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-01-01',
  devtools: { enabled: true },

  css: ['~/assets/css/main.css'],

  app: {
    head: {
      htmlAttrs: { lang: 'fr' },
      title: 'Miraculous : Ladybug & Cat Noir — Le Spectacle Live',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content:
            'Miraculous : Ladybug & Cat Noir arrive sur scène. Inscrivez-vous pour être les premiers informés de la billetterie et des dates.',
        },
        { name: 'theme-color', content: '#0a0507' },
        // Open Graph
        { property: 'og:type', content: 'website' },
        {
          property: 'og:title',
          content: 'Miraculous : Ladybug & Cat Noir — Le Spectacle Live',
        },
        {
          property: 'og:description',
          content:
            'Le spectacle live événement. Inscrivez-vous pour ne rien manquer.',
        },
        { property: 'og:image', content: '/images/keyart-horizontal.png' },
      ],
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    },
  },

  // Server-side secrets. Set BREVO_API_KEY (and optionally BREVO_LIST_ID) in .env
  runtimeConfig: {
    brevoApiKey: process.env.BREVO_API_KEY || '',
    brevoListId: process.env.BREVO_LIST_ID || '',
    public: {},
  },
})
