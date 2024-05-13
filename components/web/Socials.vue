<script setup lang="ts">
const socials = useState<any>("socials");
</script>

<template>
  <div class="fixed bottom-32 right-[3.2rem] grid gap-3 z-50">
    <NuxtLink v-for="social in socials" :key="social.id" :to="social.href">
      <UButton :icon="social.icon" size="xl" />
    </NuxtLink>
  </div>
</template>
