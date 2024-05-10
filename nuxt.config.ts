export default defineNuxtConfig({
  modules: [
    "@nuxt/ui",
    "@nuxtjs/seo",
    "@vueuse/motion/nuxt",
    "@nuxtjs/google-fonts",
    "@pinia/nuxt",
    "@pinia-plugin-persistedstate/nuxt",
    "@nuxtjs/mdc",
  ],
  site: {
    url: "https://hayying.com",
    name: "Hayying",
    description: "Hayying",
    defaultLocale: "tr",
  },
  runtimeConfig: {
    public: {
      apiUrl: process.env.API_URL,
      apiKey: process.env.API_KEY,
    },
  },
  colorMode: {
    preference: "light",
  },
});
