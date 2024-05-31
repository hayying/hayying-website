<script setup lang="ts">
const { data }: { data: any } = await useApiFetch(
  "/events?populate=*&pagination[page]=0&pagination[pageSize]=4&sort=createdAt:DESC"
);
</script>

<template>
  <UContainer class="grid mt-24">
    <WebHomeSectionHeader
      title="En Yeni Etkinlikler"
      description="Bir Araya Gelmenin, Öğrenmenin ve Eğlenmenin Zamanı"
      icon="material-symbols:date-range-outline-rounded"
      to="/etkinlikler"
    />
    <section class="grid justify-center lg:grid-cols-2 gap-10 mt-12">
      <WebEvent v-for="event in data.data" :key="event.id" :event="event" />
    </section>
  </UContainer>
</template>
