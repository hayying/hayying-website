<script setup lang="ts">
const socials = useState<any>("socials");
const colorMode = useColorMode();
const isDark = computed({
  get() {
    return colorMode.value === "dark";
  },
  set() {
    colorMode.preference = colorMode.value === "dark" ? "light" : "dark";
  },
});
</script>
<template>
  <header
    class="bg-orange-500 fixed top-0 z-50 left-0 p-2 w-full flex justify-end gap-3 px-5 h-9"
  >
    <ClientOnly>
      <UButton
        :icon="
          isDark ? 'i-heroicons-moon-20-solid' : 'i-heroicons-sun-20-solid'
        "
        class="p-0 mr-auto"
        variant="link"
        color="black"
        @click="isDark = !isDark"
      />
    </ClientOnly>
    <UButton
      v-for="social in socials"
      :key="social.id"
      :icon="social.icon"
      variant="link"
      target="_blank"
      color="black"
      :to="social.href"
      class="p-0"
    />
  </header>
</template>
