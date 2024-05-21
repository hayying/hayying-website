<script setup lang="ts">
import type { NuxtError } from "#app";

defineProps({
  error: Object as () => NuxtError,
});
</script>
<template>
  <NuxtLayout>
    <section
      class="min-h-screen bg-[url('/404.svg')] bg-primary-900 flex flex-col gap-10 place-items-center justify-center text-white"
    >
      <h1 class="text-7xl md:text-9xl font-extrabold">
        {{ error?.statusCode }}
      </h1>
      <p class="text-2xl md:text-3xl font-semibold">
        {{ error?.statusMessage }}
      </p>
      <UButton label="Anasayfaya Dön" to="/" color="black" size="xl" />
    </section>
  </NuxtLayout>
</template>
