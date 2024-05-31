<script setup lang="ts">
const links = useState("links", () => [
  {
    label: "ANA SAYFA",
    to: "/",
  },
  {
    label: "KURSLAR",
    to: "/kurslar",
  },
  {
    label: "ONLİNE DANIŞMANLIK",
    to: "/online-danismanlik",
  },
  {
    label: "ETKİNLİKLER",
    to: "/etkinlikler",
  },
  {
    label: "HAKKIMIZDA",
    to: "/hakkimizda",
  },
  {
    label: "BLOG",
    to: "/blog",
  },
  {
    label: "İLETİŞİM",
    to: "/iletisim",
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
    class="fixed top-9 w-full p-2 lg:px-5 lg:py-3 z-50 flex items-center justify-between bg-white dark:bg-black ring-1 ring-gray-200 dark:ring-gray-800"
  >
    <Logo />
    <UHorizontalNavigation
      :links="links"
      class="hidden xl:block w-max absolute left-1/2 transform -translate-x-1/2"
      :ui="{
        inactive:
          'text-black hover:text-zinc-700 dark:text-white dark:hover:text-zinc-300',
        active: 'dark:text-orange-500 text-orange-500 after:hidden',
        before: '',
      }"
    />
    <section class="lg:mr-3 lg:ml-auto flex items-center">
      <UButton
        icon="material-symbols:lock-outline"
        v-if="!isAuthenticated"
        :class="buttonClass"
        variant="link"
        color="black"
        to="/giris"
        size="xl"
      />
      <UDropdown
        v-if="isAuthenticated"
        :items="[
          [
            {
              label: 'Panel',
              to: '/panel/kurslar',
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
        <UButton
          :class="buttonClass"
          icon="bx:user"
          variant="link"
          size="xl"
          color="black"
        />
      </UDropdown>
      <UButton
        :class="buttonClass"
        icon="la:search"
        variant="link"
        color="black"
        size="xl"
        @click="searchIsOpen = true"
      />
      <UButton
        class="text-black hover:text-zinc-700 block lg:hidden"
        icon="iconamoon:menu-burger-horizontal-bold"
        @click="isOpen = !isOpen"
        color="black"
        variant="link"
        size="xl"
      />
    </section>
    <UButton
      class="rounded-full hidden lg:block"
      label="ONLİNE FORM"
      to="/online-form"
      size="lg"
    />
    <USlideover v-model="isOpen">
      <section class="p-4 flex-1">
        <UButton
          class="text-black mb-3"
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
