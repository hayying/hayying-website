<script setup lang="ts">
useHead({
  bodyAttrs: {
    class: "font-[Poppins]",
  },
});
</script>
<template>
  <NuxtLayout>
    <div class="min-h-screen">
      <NuxtPage />
    </div>
  </NuxtLayout>
  <UNotifications />
  <NuxtLoadingIndicator />
</template>
