<script setup lang="ts">
defineProps({
  src: String,
});
</script>

<template>
  <iframe :src="src" class="w-full h-full" />
</template>
