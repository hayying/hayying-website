<script setup lang="ts">
const features = [
  {
    title: "+200 Kurs",
    description: "Çeşitli yeni konuları keşfedin",
    icon: "ph:graduation-cap-light",
  },
  {
    title: "Uzman öğretmenler",
    description: "Sizin için doğru eğitmeni bulun",
    icon: "solar:cup-outline",
  },
  {
    title: "Hedefe odaklan",
    description: "Kişisel uzmanlığınızı artırın",
    icon: "icon-park-outline:target-one",
  },
];
</script>

<template>
  <div class="bg-[#121921]">
    <UContainer
      class="py-7 text-white flex flex-col gap-10 md:flex-row flex-items-center justify-around"
    >
      <div
        v-for="{ description, icon, title } in features"
        :key="title"
        class="grid place-items-center"
      >
        <UIcon :name="icon" class="text-5xl mb-3" />
        <h1 class="text-yellow-500 font-bold text-lg">
          {{ title }}
        </h1>
        <p class="text-gray-300">{{ description }}</p>
      </div>
    </UContainer>
  </div>
</template>
