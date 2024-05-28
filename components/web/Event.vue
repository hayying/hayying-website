<script setup lang="ts">
defineProps({
  event: Object as PropType<any>,
});
const config = useRuntimeConfig();
</script>

<template>
  <NuxtLink
    class="flex flex-wrap items-start md:flex-nowrap group overflow-hidden break-all gap-5"
    :to="'/etkinlikler/' + event.attributes.slug"
  >
    <img
      :src="
        config.public.apiImgUrl + event.attributes.thumbnail.data.attributes.url
      "
      class="w-full max-w-[15rem] scale-105 group-hover:scale-100 transition-transform"
    />
    <section class="md:px-5 md:py-2">
      <span class="text-gray-400 text-xs">
        {{ new Date(event.attributes.startDate).toLocaleDateString() }} -
        {{ new Date(event.attributes.endDate).toLocaleDateString() }}
      </span>
      <h1 class="text-xl group-hover:text-primary-500">
        {{ event.attributes.title }}
      </h1>
      <MDC
        :value="event.attributes.description"
        class="text-gray-500 text-sm"
      />
    </section>
  </NuxtLink>
</template>
