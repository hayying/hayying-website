import { vite as vidstack } from "vidstack/plugins";

export default defineNuxtConfig({
  devtools: {
    enabled: false,
  },
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
    name: "Hayying Danışmanlık",
    description: "Hayying Danışmanlık Hizmetleri",
    defaultLocale: "tr",
  },
  runtimeConfig: {
    public: {
      apiUrl: process.env.API_URL,
      apiKey: process.env.API_KEY,
      apiImgUrl: process.env.API_IMG_URL,
    },
  },
  googleFonts: {
    families: {
      Poppins: [500],
    },
  },
  googleSignIn: {
    clientId: process.env.GOOGLE_CLIENT_ID,
  },

  app: {
    head: {
      script: [
        {
          hid: "gtm-script",
          innerHTML: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'}); var f=d.getElementsByTagName(s)[0], j=d.createElement(s), dl=l!='dataLayer'?'&l='+l:''; j.async=true; j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl; f.parentNode.insertBefore(j,f); })(window,document,'script','dataLayer','GTM-WWTMPF7K');`,
          type: "text/javascript",
          charset: "utf-8",
        },
      ],
      noscript: [
        {
          hid: "gtm-noscript",
          innerHTML: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-WWTMPF7K" height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
        },
      ],
      __dangerouslyDisableSanitizersByTagID: {
        "gtm-script": ["innerHTML"],
        "gtm-noscript": ["innerHTML"],
      },
    },
  },
});
