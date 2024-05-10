<script setup lang="ts">
defineProps<{
  features: {
    title: string;
    description: string;
    icon: string;
  }[];
}>();
</script>

<template>
  <div class="bg-[#121921]">
    <UContainer
      class="py-7 text-white flex flex-col gap-10 md:flex-row flex-items-center justify-around"
    >
      <div
        v-for="{ description, icon, title } in features"
        :key="title"
        class="grid place-items-center"
      >
        <UIcon :name="icon" class="text-5xl mb-3" />
        <h1 class="text-yellow-500 font-bold text-lg">
          {{ title }}
        </h1>
        <p class="text-gray-300 max-w-[19rem] text-center">{{ description }}</p>
      </div>
    </UContainer>
  </div>
</template>
