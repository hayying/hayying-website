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

const buttonClass = "text-black hover:text-zinc-700";
const userStore = useUserStore();
const isAuthenticated = computed(() => userStore.isAuthenticated);
const searchIsOpen = useState("search");
const isOpen = ref(false);
</script>

<template>
  <nav
    class="fixed top-9 w-full p-2 lg:px-5 lg:py-3 z-50 flex items-center justify-between transition-all duration-300 bg-white ring-1 ring-gray-200"
  >
    <UButton
      class="text-black hover:text-zinc-700 block lg:hidden"
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
          inactive: 'text-black hover:text-zinc-700',
          active: 'text-orange-500 after:hidden',
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
  </nav>
</template>
