<script setup lang="ts">
const { data }: { data: any } = await useApiFetch("/home-page?populate=*");
const config = useRuntimeConfig();
</script>

<template>
  <div class="bg-black flex items-center justify-center gap-5 p-3.5 flex-wrap">
    <img
      class="w-32 h-20 object-contain grayscale hover:grayscale-0 transition-all duration-300"
      v-for="reference in data.data.attributes.referencesSlider.data"
      :src="
        config.public.apiImgUrl + reference.attributes.formats.thumbnail.url
      "
    />
  </div>
</template>
