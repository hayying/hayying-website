<script setup lang="ts">
const config = useRuntimeConfig();
defineProps({
  item: Object as PropType<any>,
});
</script>

<template>
  <NuxtLink
    class="transition-all hover:scale-105 rounded-xl ring-1 ring-gray-200 bg-gray-100 dark:ring-gray-800 dark:bg-black overflow-hidden max-w-[24rem]"
    :to="`/kurslar/${item.attributes.slug}`"
    v-motion-slide-visible-once-bottom
  >
    <section class="relative group overflow-hidden">
      <img
        :src="config.public.apiImgUrl + item.attributes.thumbnail.url"
        class="group-hover:scale-110 transition-all"
        draggable="false"
      />
      <section
        class="absolute bottom-0 left-5 bg-black opacity-70 text-white p-2 py-1"
      >
        {{ item.attributes.price }}₺
      </section>
      <UButton
        class="absolute hidden group-hover:block left-[50%] bottom-5 transform -translate-x-1/2 top-[50%] -translate-y-1/2 h-max opacity-70 rounded-full"
        label="Detaylar"
        color="gray"
      />
    </section>
    <section class="p-5">
      <span
        class="text-gray-500 text-sm mb-2"
        :class="{
          'text-green-500': item.attributes.type === 'online',
          'text-red-500': item.attributes.type === 'offline',
        }"
      >
        {{ item.attributes.type }}
      </span>
      <h1 class="text-lg font-bold">
        {{ item.attributes.title }}
      </h1>
      <p class="text-gray-500 mt-3">{{ item.attributes.description }}</p>
    </section>
  </NuxtLink>
</template>
