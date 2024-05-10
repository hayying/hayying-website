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
      description="En son eklenen kursları keşfedin"
    />
    <UCarousel
      :ui="{
        item: 'basis-full basis-1/1 md:basis-1/2 lg:basis-1/3 xl:basis-1/5',
        container: 'py-20',
      }"
      class="overflow-hidden"
      :items="courses.data"
      ref="carouselRef"
      v-slot="{ item }"
      indicators
    >
      <NuxtLink
        class="mr-10 shadow-xl opacity-50 hover:opacity-100 transition-all hover:scale-105"
        :to="`/courses/${item.attributes.slug}`"
      >
        <div class="relative group overflow-hidden">
          <img
            :src="config.public.apiImgUrl + item.attributes.thumbnail.url"
            class="h-[15rem] w-full group-hover:scale-110 transition-all"
            draggable="false"
          />
          <div
            class="absolute bottom-0 left-5 bg-black opacity-70 text-white p-2 py-1"
          >
            {{ item.attributes.price }}₺
          </div>
          <UButton
            class="absolute hidden group-hover:block left-[50%] bottom-5 transform -translate-x-1/2 top-[50%] -translate-y-1/2 h-max opacity-70 rounded-full"
            label="Detaylar"
            color="gray"
          />
        </div>
        <div class="p-5">
          <span
            class="text-gray-500 text-sm mb-2"
            :class="{
              'text-green-500': item.attributes.type === 'online',
              'text-red-500': item.attributes.type === 'offline',
            }"
          >
            {{ item.attributes.type }}
          </span>
          <h1 class="text-lg font-bold text-gray-800">
            {{ item.attributes.title }}
          </h1>
          <p class="text-gray-500">{{ item.attributes.description }}</p>
        </div>
        <UDivider />
      </NuxtLink>
    </UCarousel>
    <UContainer class="flex">
      <UButton
        class="rounded-full ml-auto mt-5"
        label="Tüm Kursları Gör"
        size="xl"
      />
    </UContainer>
    <UDivider class="mt-12" />
  </section>
</template>
