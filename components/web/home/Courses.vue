<script setup lang="ts">
const { data: courses }: { data: any } = await useApiFetch(
  "/courses?populate=*&pagination[page]=0&pagination[pageSize]=3&sort=createdAt:DESC"
);

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
  <UContainer class="mt-32">
    <WebHomeSectionHeader
      title="En Yeni Kurslar"
      description="Uzman Eğitmenlerle Nitelikli Öğrenme Fırsatı"
      icon="ph:graduation-cap"
      to="/kurslar"
    />
    <section
      class="flex justify-center xl:justify-between mt-10 gap-5 flex-wrap"
    >
      <WebCourse :item="item" v-for="item in courses.data" :key="item.id" />
    </section>
  </UContainer>
  <UDivider class="mt-12" />
</template>
