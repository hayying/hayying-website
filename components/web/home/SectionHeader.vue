<script setup lang="ts">
defineProps({
  title: String,
  description: String,
});
</script>

<template>
  <UContainer class="relative">
    <UDivider class="w-32 m-auto" :ui="{ border: { base: 'border-2' } }" />
    <UDivider
      class="w-16 absolute -top-[.01rem] left-1/2 transform -translate-x-1/2"
      :ui="{ border: { base: 'border-primary-500 border-2 ' } }"
    />
    <h1 class="text-center text-2xl font-bold text-gray-800 mt-5">
      {{ title }}
    </h1>
    <p class="text-center text-gray-500 mt-2">{{ description }}</p>
  </UContainer>
</template>
