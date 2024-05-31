<script setup lang="ts">
const { firstname, lastname, email, logout } = useUserStore();
const links = [
  {
    label: "Ana Sayfa",
    icon: "ion:home-outline",
    to: "/",
  },
  {
    label: "Kurslar",
    icon: "iconoir:book",
    to: "/panel/kurslar",
  },
  {
    label: "Etkinlikler",
    icon: "uiw:date",
    to: "/panel/etkinlikler",
  },
  {
    label: "Siparişler",
    icon: "iconoir:delivery-truck",
    to: "/panel/siparisler",
  },
  {
    label: "Hesap Ayarları",
    icon: "material-symbols:settings-outline",
    to: "/panel/ayarlar",
  },
];
const colorMode = useColorMode();
const isDark = computed({
  get() {
    return colorMode.value === "dark";
  },
  set() {
    colorMode.preference = colorMode.value === "dark" ? "light" : "dark";
  },
});
const items = [
  [
    {
      label: "Tam Ekran",
      icon: "bx:fullscreen",
      click: () => {
        if (document.fullscreenElement) {
          document.exitFullscreen();
          return;
        }
        document.documentElement.requestFullscreen();
      },
    },
    {
      label: "Temayı Değiştir",
      icon: "i-heroicons-moon-20-solid",
      click: () => {
        isDark.value = !isDark.value;
      },
    },

    {
      label: "Çıkış Yap",
      icon: "material-symbols:logout",
      click: logout,
    },
  ],
];
</script>

<template>
  <section class="lg:w-[19.5rem]">
    <section class="flex justify-between items-center p-5 pr-0 pt-3.5">
      <section>
        <h1 class="text-orange-500">{{ firstname }} {{ lastname }}</h1>
        <p class="text-sm text-zinc-500">
          {{ email }}
        </p>
      </section>
      <UDropdown :items="items" :popper="{ placement: 'bottom-start' }">
        <UButton icon="tabler:dots" color="gray" />
      </UDropdown>
    </section>
    <UVerticalNavigation
      :links="links"
      class="mt-3 ml-2"
      :ui="{
        size: 'text-md',
        base: 'gap-3',
      }"
    />
  </section>
</template>
