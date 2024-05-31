<script setup lang="ts">
const stats = [
  {
    count: 25000,
    description: "Memnun Müşteri",
  },

  {
    count: 5000,
    description: "Verilmiş Eğitim",
  },
  {
    count: 1000,
    description: "Gerçekleşmiş Seminer",
  },
];
</script>

<template>
  <section
    class="dark -top-14 md:-top-[4.5rem] relative text-white justify-center z-10 flex flex-wrap gap-3"
  >
    <UCard
      v-for="{ count, description } in stats"
      class="shadow-xl p-5"
      :ui="{
        ring: 'ring-2 ring-orange-500 dark:ring-orange-500',
        rounded: 'rounded-3xl',
      }"
    >
      <span class="text-3xl text-orange-500 font-semibold"> {{ count }}+ </span>
      <h1>
        {{ description }}
      </h1>
    </UCard>
  </section>
</template>
