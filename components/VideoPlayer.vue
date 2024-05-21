<script setup lang="ts">
import 'vidstack/bundle';
defineProps({
  src: String,
});
</script>

<template>
  <media-player :src="src">
  <media-provider></media-provider>
  <media-video-layout thumbnails="/logo.png"></media-video-layout>
</media-player>
</template>
