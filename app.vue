<script setup lang="ts">
//@ts-ignore
import logo from "/Logo_2.jpeg";
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
  <NuxtLoadingIndicator color="black" />
</template>
