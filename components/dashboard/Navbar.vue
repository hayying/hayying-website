<script setup lang="ts">
const isOpen = useState("dashboardSlideoverIsOpen", () => false);
</script>

<template>
  <nav class="z-50 w-[20rem] hidden lg:flex flex-shrink-0">
    <DashboardNavbarContent />
  </nav>
  <USlideover v-model="isOpen">
    <section class="p-4 flex-1">
      <UButton
        class="text-black ml-auto block"
        icon="iconamoon:close"
        @click="isOpen = false"
        variant="link"
        size="xl"
      />
      <DashboardNavbarContent />
    </section>
  </USlideover>
</template>
