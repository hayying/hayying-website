<script setup lang="ts">
const links = [
  "https://www.youtube.com/embed/vOchrYCc8os?si=Wiay9xFuJmPyN0-E",
  "https://www.youtube.com/embed/IYOArk2hUL0?si=hLwImWGcHD3eUtoy",
  "https://www.youtube.com/embed/6Xa_P4MgbH0?si=xceskvQaux1xuRgi",
  "https://www.youtube.com/embed/D1R3kxTirtA?si=lHqm3QPcb1le9DI4",
];
</script>

<template>
  <section class="flex p-10 gap-10 mt-32 flex-wrap lg:flex-nowrap bg-zinc-950">
    <VideoPlayer v-for="link in links" :key="link" :src="link" />
  </section>
</template>
