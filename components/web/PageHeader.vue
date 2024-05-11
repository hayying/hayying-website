<script setup lang="ts">
defineProps<{
  title: string;
  img: string;
}>();
</script>

<template>
  <div
    class="text-white h-[20rem] md:h-[28rem] bg-center grid place-items-center relative border-b-[5px] border-yellow-500"
  >
    <img :src="img" class="w-full h-full object-cover absolute" />
    <div class="bg-indigo-800 w-full h-full opacity-50 absolute" />
    <div
      class="z-10 grid place-items-center gap-5"
      v-motion
      :initial="{ opacity: 0, y: 100 }"
      :enter="{ opacity: 1, y: 0, transition: { duration: 1500 } }"
    >
      <div class="w-20 rounded-full h-1 bg-yellow-500" />
      <div class="text-4xl font-bold">
        {{ title }}
      </div>
    </div>
  </div>
</template>
