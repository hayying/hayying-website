<script setup lang="ts">
defineProps<{
  title: string;
  img: string;
}>();
</script>

<template>
  <section
    class="text-white h-[20rem] md:h-[28rem] mt-20 bg-center grid place-items-center relative border-b-[5px] border-primary-500"
  >
    <img :src="img" class="w-full h-full object-cover absolute" />
    <section class="bg-primary-800 w-full h-full opacity-50 absolute" />
    <section
      class="z-10 grid place-items-center gap-5"
      v-motion
      :initial="{ opacity: 0, y: 100 }"
      :enter="{ opacity: 1, y: 0, transition: { duration: 1500 } }"
    >
      <section class="w-20 rounded-full h-1 bg-primary-500" />
      <h1 class="text-xl max-w-7xl md:text-4xl font-bold text-center">
        {{ title }}
      </h1>
    </section>
  </section>
</template>
