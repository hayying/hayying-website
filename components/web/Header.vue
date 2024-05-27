<script setup lang="ts">
const socials = useState<any>("socials");
</script>
<template>
  <header
    class="bg-orange-500 fixed top-0 z-50 left-0 p-2 w-full flex justify-end gap-3 pr-6"
  >
    <UButton
      v-for="social in socials"
      :key="social.id"
      :icon="social.icon"
      variant="link"
      target="_blank"
      :to="social.href"
      class="text-white hover:text-gray-100 p-0"
    />
  </header>
</template>
