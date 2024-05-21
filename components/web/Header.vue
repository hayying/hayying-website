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
    to: "/online-consulting",
  },
  {
    label: "ETKİNLİKLER",
    to: "/events",
  },
  {
    label: "HAKKIMIZDA",
    to: "/about",
  },
  {
    label: "BLOG",
    to: "/blog",
  },
  {
    label: "İLETİŞİM",
    to: "/contact",
  },
]).value.map((link) => {
  return {
    ...link,
    click: () => {
      isOpen.value = false;
    },
  };
});

const buttonClass = "text-white hover:text-gray-100";
const userStore = useUserStore();
const isAuthenticated = computed(() => userStore.isAuthenticated);
const searchIsOpen = useState("search");
const isOpen = ref(false);

onMounted(() => {
  window.addEventListener("scroll", () => {
    const header = document.querySelector("header");
    const show = window.scrollY > 0;
    header?.classList.toggle("bg-gradient-to-r", show);
    header?.classList.toggle("from-primary-800", show);
    header?.classList.toggle("to-primary-600", show);
  });
});
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
    <section class="lg:mr-3 lg:ml-auto flex items-center">
      <UHorizontalNavigation
        :links="links"
        class="hidden lg:block"
        :ui="{
          inactive: 'text-white  hover:text-gray-100',
          active: 'text-black after:hidden',
          before: '',
        }"
      />
      <UButton
        icon="material-symbols:lock-outline"
        v-if="!isAuthenticated"
        :class="buttonClass"
        variant="link"
        to="/login"
        size="xl"
      />
      <UDropdown
        v-if="isAuthenticated"
        :items="[
          [
            {
              label: 'Panel',
              to: '/dashboard/courses',
              icon: 'carbon:dashboard',
            },
            {
              label: 'Çıkış Yap',
              icon: 'material-symbols:logout',
              click: userStore.logout,
            },
          ],
        ]"
      >
        <UButton :class="buttonClass" icon="bx:user" variant="link" size="xl" />
      </UDropdown>
      <UButton
        :class="buttonClass"
        icon="la:search"
        variant="link"
        size="xl"
        @click="searchIsOpen = true"
      />
    </section>
    <UButton
      class="rounded-full text-black hidden lg:block"
      label="ONLİNE FORM"
      to="/online-form"
      size="lg"
    />
    <USlideover v-model="isOpen" side="left">
      <section class="p-4 flex-1">
        <UButton
          class="text-black ml-auto block mb-3"
          icon="iconamoon:close"
          @click="isOpen = false"
          variant="link"
          size="xl"
        />
        <UVerticalNavigation
          :links="[
            ...links,
            {
              label: 'ONLİNE FORM',
              to: '/online-form',
              click: () => (isOpen = false),
            },
          ]"
          class="text-white"
        />
      </section>
    </USlideover>
  </header>
</template>
