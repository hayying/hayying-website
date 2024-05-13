<script setup lang="ts">
const isOpen = useState("dashboardIsOpen");
</script>

<template>
  <header
    class="w-full bg-gray-100 py-3 px-8 border-b-2 flex justify-between items-center"
  >
    <Logo />
    <UButton
      class="text-white hover:text-gray-100 block lg:hidden"
      icon="iconamoon:menu-burger-horizontal-bold"
      @click="isOpen = !isOpen"
      size="xl"
    />
  </header>
</template>
