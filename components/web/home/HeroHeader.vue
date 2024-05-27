<script setup lang="ts">
const items = [
  {
    title: "Kurslar",
    description: "Kurslarımızı inceleyin. Eğitimlerimize katılın.",
    href: "/courses",
    image: "/banner.jpg",
    button: "Kurslara git",
  },
  {
    title: "Etkinlikler",
    description: "Etkinliklerimizi inceleyin, katılmak için başvuru yapın.",
    href: "/events",
    image: "/events.jpg",
    button: "Etkinliklere git",
  },
  {
    title: "Blog",
    description: "Blog yazılarımızı okuyun.",
    href: "/blog",
    image: "/blog.jpg",
    button: "Blog'a git",
  },
];

const carouselRef = ref();

onMounted(() => {
  setInterval(() => {
    if (!carouselRef.value) return;

    if (carouselRef.value.page === carouselRef.value.pages) {
      return carouselRef.value.select(0);
    }

    carouselRef.value.next();
  }, 5000);
});
</script>

<template>
  <section class="mt-[6.3rem]">
    <UCarousel
      ref="carouselRef"
      v-slot="{ item }"
      arrows
      :dragable="false"
      :prev-button="{
        icon: 'i-heroicons-arrow-left-20-solid',
      }"
      :next-button="{
        icon: 'i-heroicons-arrow-right-20-solid',
      }"
      :items="items"
      :ui="{ item: 'basis-full' }"
      class="overflow-hidden"
      indicators
    >
      <section
        class="w-full bg-center bg-cover relative h-full"
        :style="{ backgroundImage: `url(${item.image})` }"
      >
        <div
          class="absolute w-full h-full bg-gradient-to-r from-black to-transparent"
        />
        <UContainer
          class="text-left z-10 py-56 text-white relative"
          :ui="{ padding: 'px-16 sm:px-20 lg:px-20' }"
        >
          <h1 class="text-4xl text-orange-500 mb-2">
            {{ item.title }}
          </h1>
          <p class="mb-10">
            {{ item.description }}
          </p>
          <UButton
            :label="item.button"
            size="xl"
            :to="item.href"
            trailing-icon="lucide:arrow-right"
          />
        </UContainer>
      </section>
    </UCarousel>
  </section>
</template>
