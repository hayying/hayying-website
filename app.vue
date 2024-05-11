<script setup lang="ts">
//@ts-ignore
import logo from "/logo.png";
useSeoMeta({
  ogImage: logo,
});

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
  <NuxtLoadingIndicator color="orange" />
</template>
