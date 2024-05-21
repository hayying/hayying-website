<script setup lang="ts">
const links = [
  {
    label: "Ana Sayfa",
    icon: "ion:home-outline",
    to: "/",
  },
  {
    label: "Kurslar",
    icon: "iconoir:book",
    to: "/dashboard/courses",
  },
  {
    label: "Etkinlikler",
    icon: "uiw:date",
    to: "/dashboard/events",
  },
  {
    label: "Siparişler",
    icon: "iconoir:delivery-truck",
    to: "/dashboard/orders",
  },
  {
    label: "Hesap Ayarları",
    icon: "material-symbols:settings-outline",
    to: "/dashboard/settings",
  },
];
const isOpen = useState("dashboardIsOpen", () => false);
</script>

<template>
  <nav class="p-5 flex-col justify-center items-center hidden lg:flex">
    <UVerticalNavigation
      :links="links"
      :ui="{ size: 'text-md', icon: { base: 'w-6 h-6' }, base: 'gap-3' }"
    />
  </nav>
  <USlideover v-model="isOpen" side="left">
    <section class="p-4 flex-1">
      <UButton
        class="text-black ml-auto block mb-3"
        icon="iconamoon:close"
        @click="isOpen = false"
        variant="link"
        size="xl"
      />
      <UVerticalNavigation :links="links" class="text-white" />
    </section>
  </USlideover>
</template>
