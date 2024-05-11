<script setup lang="ts">
const features = [
  {
    title: "Kurslar",
    to: "/courses",
    image: "/feature-1.png",
    color: "green",
  },
  {
    title: "Etkinlikler",
    to: "/courses",
    image: "/feature-2.png",
    color: "orange",
  },
  {
    title: "Blog",
    to: "/courses",
    image: "/feature-3.png",
    color: "blue",
  },
  {
    title: "Online Form",
    to: "/online-form",
    image: "/feature-4.png",
    color: "red",
  },
];
</script>

<template>
  <UContainer :ui="{ constrained: 'max-w-[100rem]' }">
    <div class="flex flex-wrap justify-center gap-5 relative bottom-24">
      <div
        :class="`bg-${color}-500 p-10 flex flex-col items-center rounded-md px-20`"
        v-for="{ color, image, title, to } in features"
        :key="title"
      >
        <img :src="image" alt="feature" class="w-32 h-32" />
        <h1 class="text-2xl text-white">
          {{ title }}
        </h1>
        <UButton
          class="mt-5 px-2.5 opacity-30 text-gray-500 rounded-full"
          icon="icon-park-outline:right"
          variant="soft"
          color="gray"
          size="xl"
          :to="to"
        />
      </div>
    </div>
  </UContainer>
</template>
