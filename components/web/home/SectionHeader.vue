<script setup lang="ts">
defineProps({
  title: String,
  description: String,
  icon: {
    type: String,
    required: true,
  },
  to: String,
});
</script>

<template>
  <section class="flex flex-wrap md:flex-nowrap items-center gap-4">
    <section
      class="p-0.5 rounded-[.6rem] bg-gradient-to-tr from-orange-500 to-transparent"
    >
      <section class="rounded-lg bg-gray-100 dark:bg-black">
        <UIcon :name="icon" class="text-3xl m-2.5" />
      </section>
    </section>
    <section class="flex flex-wrap gap-3 items-center justify-between w-full">
      <section>
        <h1 class="text-xl font-semibold">
          {{ title }}
        </h1>
        <p class="text-gray-500 dark:text-gray-400">
          {{ description }}
        </p>
      </section>
      <UButton
        trailing-icon="tabler:chevron-right"
        label="Daha fazla"
        :to="to"
        size="lg"
      />
    </section>
  </section>
</template>
