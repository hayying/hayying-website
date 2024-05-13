<script setup lang="ts">
defineProps({
  src: String,
});
</script>

<template>
  <iframe :src="src" class="h-[30rem] w-full" />
</template>
