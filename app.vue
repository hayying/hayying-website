<script setup lang="ts">
useHead({
  bodyAttrs: {
    class: "font-[Poppins]",
  },
});
</script>
<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
  <UNotifications />
  <NuxtLoadingIndicator />
</template>
