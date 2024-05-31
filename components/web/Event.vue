<script setup lang="ts">
defineProps({
  event: Object as PropType<any>,
});
const config = useRuntimeConfig();
</script>

<template>
  <NuxtLink
    class="grid items-start group hover:bg-gray-100 dark:hover:bg-gray-800 overflow-hidden break-all gap-5 rounded-xl max-w-xs transition-all duration-300"
    :to="'/etkinlikler/' + event.attributes.slug"
    v-motion-slide-visible-once-bottom
  >
    <img
      :src="
        config.public.apiImgUrl + event.attributes.thumbnail.data.attributes.url
      "
      class="w-full rounded-xl"
    />
    <section class="px-3 pb-5">
      <span class="text-gray-400 text-xs">
        {{ new Date(event.attributes.startDate).toLocaleDateString() }} -
        {{ new Date(event.attributes.endDate).toLocaleDateString() }}
      </span>
      <h1
        class="text-xl group-hover:text-primary-500 transition-all duration-300"
      >
        {{ event.attributes.title }}
      </h1>
    </section>
  </NuxtLink>
</template>
