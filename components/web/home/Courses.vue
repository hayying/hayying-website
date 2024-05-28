<script setup lang="ts">
const { data: courses }: { data: any } = await useApiFetch(
  "/courses?populate=*&pagination[page]=0&pagination[pageSize]=10&sort=createdAt:DESC"
);
const config = useRuntimeConfig();

const carouselRef = ref();

onMounted(() => {
  setInterval(() => {
    if (!carouselRef.value) return;

    if (carouselRef.value.page === carouselRef.value.pages) {
      return carouselRef.value.select(0);
    }

    carouselRef.value.next();
  }, 3000);
});
</script>

<template>
  <section class="mt-32">
    <WebHomeSectionHeader
      title="En Son Eklenen Kurslar"
      description="Uzman Eğitmenlerle Nitelikli Öğrenme Fırsatı"
    />
    <UCarousel
      :ui="{
        container: 'py-20 flex gap-10',
      }"
      class="overflow-hidden"
      :items="courses.data"
      ref="carouselRef"
      v-slot="{ item }"
      indicators
    >
      <WebCourse :item="item" />
    </UCarousel>
    <UContainer class="flex">
      <UButton
        class="rounded-full ml-auto mt-5"
        label="Tüm Kursları Gör"
        to="/kurslar"
        size="xl"
      />
    </UContainer>
    <UDivider class="mt-12" />
  </section>
</template>
