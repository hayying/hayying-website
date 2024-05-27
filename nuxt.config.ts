import { vite as vidstack } from "vidstack/plugins";

export default defineNuxtConfig({
  vue: {
    compilerOptions: {
      isCustomElement: (tag) => tag.startsWith("media-"),
    },
  },
  vite: {
    plugins: [vidstack()],
  },
  modules: [
    "@nuxt/ui",
    "@nuxtjs/seo",
    "@vueuse/motion/nuxt",
    "@nuxtjs/google-fonts",
    "@pinia/nuxt",
    "@pinia-plugin-persistedstate/nuxt",
    "@nuxtjs/mdc",
    "nuxt-vue3-google-signin",
    "@nuxt/image",
    "@tresjs/nuxt",
  ],
  site: {
    url: "https://hayying.com",
    name: "Hayying",
    description: "Hayying Danışmanlık ve Sağlık Hizmetleri",
    defaultLocale: "tr",
  },
  runtimeConfig: {
    public: {
      apiUrl: process.env.API_URL,
      apiKey: process.env.API_KEY,
      apiImgUrl: process.env.API_IMG_URL,
    },
  },
  colorMode: {
    preference: "light",
  },
  googleFonts: {
    families: {
      Poppins: [500],
    },
  },
  googleSignIn: {
    clientId: process.env.GOOGLE_CLIENT_ID,
  },
});
