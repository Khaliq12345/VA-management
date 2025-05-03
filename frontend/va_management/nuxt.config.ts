// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: [
    '@nuxt/ui'
  ],
  css: ['./assets/css/main.css'],
  runtimeConfig: {
    public: {
      urlAPI: process.env.API_URL,
      supabaseURL: process.env.SUPABASE_URL,
      supabaseKey: process.env.SUPABASE_KEY,
     },
  },
})
