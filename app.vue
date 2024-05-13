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
    <NuxtPage />
  </NuxtLayout>
  <UNotifications />
  <NuxtLoadingIndicator color="orange" />
</template>
