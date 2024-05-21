<script setup lang="ts">
const socials = useState<any>("socials");
</script>

<template>
  <section class="fixed bottom-28 right-1 b sm:right-5 grid gap-3 z-40">
    <NuxtLink v-for="social in socials" :key="social.id" :to="social.href">
      <UButton :icon="social.icon" size="xl" />
    </NuxtLink>
  </section>
</template>
