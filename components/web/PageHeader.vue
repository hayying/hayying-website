<script setup lang="ts">
defineProps<{
  title: string;
  img: string;
}>();
const links = useBreadcrumbItems();
</script>

<template>
  <section
    class="text-white h-[20rem] md:h-[28rem] mt-20 bg-center relative ring-2 ring-gray-400"
  >
    <img :src="img" class="w-full h-full object-cover absolute" />
    <section
      class="bg-gradient-to-r from-black to-transparent w-full h-full opacity-50 absolute"
    />
    <UContainer class="pt-20 md:pt-44">
      <UBreadcrumb
        :ui="{
          li: 'text-white',
        }"
        :links="links"
      >
        <template #divider>
          <UIcon name="mingcute:right-line" />
        </template>
      </UBreadcrumb>
      <h1 class="text-2xl mt-2 absolute">
        {{ title }}
      </h1>
    </UContainer>
  </section>
</template>
