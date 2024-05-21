<script setup lang="ts">
const isOpen = useState("dashboardIsOpen");
</script>

<template>
  <section
    class="w-full bg-gradient-to-r from-primary-800 to-primary-600 py-3 px-8 border-b-2 flex justify-between items-center"
  >
    <Logo />
    <UButton
      class="text-white hover:text-gray-100 block lg:hidden"
      icon="iconamoon:menu-burger-horizontal-bold"
      @click="isOpen = !isOpen"
      size="xl"
    />
  </section>
</template>
