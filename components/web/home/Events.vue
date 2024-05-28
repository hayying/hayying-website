<script setup lang="ts">
const { data }: { data: any } = await useApiFetch(
  "/events?populate=*&pagination[page]=0&pagination[pageSize]=4&sort=createdAt:DESC"
);
</script>

<template>
  <section class="mt-24">
    <WebHomeSectionHeader
      title="En Son Eklenen Etkinlikler"
      description="Bir Araya Gelmenin, Öğrenmenin ve Eğlenmenin Zaman"
    />
    <UContainer class="grid">
      <section class="grid justify-center lg:grid-cols-2 gap-10 mt-12">
        <WebEvent v-for="event in data.data" :key="event.id" :event="event" />
      </section>
      <UContainer class="flex w-full">
        <UButton
          class="rounded-full ml-auto mt-5"
          label="Tüm Etkinlikleri Gör"
          to="/etkinlikler"
          size="xl"
        />
      </UContainer>
    </UContainer>
  </section>
</template>
