export default defineNuxtConfig({
  typescript: {
    strict: true,
  },
  modules: ['@nuxtjs/tailwindcss'],
  ssr: false,
  app: {
    head: {
      title: 'OrderX',
      meta: [{ name: 'description', content: 'OrderX' }],
    },
  },
})
