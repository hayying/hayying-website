<script setup lang="ts">
const links = useState("links", () => [
  {
    label: "ANA SAYFA",
    to: "/",
  },
  {
    label: "KURSLAR",
    to: "/courses",
  },
  {
    label: "ONLİNE DANIŞMANLIK",
    to: "/online-counseling",
  },
  {
    label: "ETKİNLİKLER",
    to: "/events",
  },
  {
    label: "BLOG",
    to: "/blogs",
  },
  {
    label: "İLETİŞİM",
    to: "/contact",
  },
]);

const slideoverLinks = [
  ...links.value,
  {
    label: "ONLİNE FORM",
    to: "/online-form",
  },
];

onMounted(() => {
  window.addEventListener("scroll", () => {
    const header = document.querySelector("header");
    const show = window.scrollY > 0;
    header?.classList.toggle("bg-gradient-to-r", show);
    header?.classList.toggle("from-purple-900", show);
    header?.classList.toggle("to-orange-700", show);
  });
});
const isOpen = ref(false);
</script>

<template>
  <header
    class="fixed w-full p-2 lg:px-5 lg:py-3 z-50 flex items-center justify-between transition-all duration-300"
  >
    <UButton
      class="text-white hover:text-gray-100 block lg:hidden"
      icon="iconamoon:menu-burger-horizontal-bold"
      @click="isOpen = !isOpen"
      variant="link"
      size="xl"
    />
    <Logo />
    <div class="lg:mr-3 lg:ml-auto flex items-center">
      <UHorizontalNavigation
        :links="links"
        class="hidden lg:block"
        :ui="{
          inactive: 'text-white  hover:text-gray-100',
          active: 'text-yellow-500  after:hidden',
          before: '',
        }"
      />
      <UButton
        class="text-white hover:text-gray-100"
        icon="material-symbols:lock-outline"
        variant="link"
        size="xl"
      />
      <UButton
        class="text-white hover:text-gray-100"
        icon="la:search"
        variant="link"
        size="xl"
      />
    </div>
    <UButton
      label="ONLİNE FORM"
      class="rounded-full text-black hover:bg-blue-500 hover:text-white transition duration-300 ease-in-out hidden lg:block"
      color="yellow"
      size="lg"
    />
    <USlideover v-model="isOpen" side="left">
      <div class="p-4 flex-1">
        <UButton
          class="text-black ml-auto block mb-3"
          icon="iconamoon:close"
          @click="isOpen = false"
          variant="link"
          size="xl"
        />
        <UVerticalNavigation :links="slideoverLinks" class="text-white" />
      </div>
    </USlideover>
  </header>
</template>
