<script setup lang="ts">
useSeoMeta({
  title: "Etkinlikler",
  description: "Hayying etkinliklerine göz atın",
});
const { data }: { data: any } = await useApiFetch("/events?populate=*");
</script>

<template>
  <WebPageHeader title="ETKİNLİKLER" img="/events.jpg" />
  <UContainer class="grid my-32">
    <div class="grid justify-center lg:grid-cols-2 gap-10 mt-12">
      <WebEvent v-for="event in data.data" :key="event.id" :event="event" />
    </div>
  </UContainer>
</template>
