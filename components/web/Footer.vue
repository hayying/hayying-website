<script setup lang="ts">
import type { VerticalNavigationLink } from "#ui/types";
const socials = [
  {
    icon: "mdi:instagram",
    href: "https://www.instagram.com/hayying.danismanlik?igsh=MTFxaDN3eXZoOXI0eA==",
  },
  {
    icon: "mdi:youtube",
    href: "https://youtube.com/@hayyingdansmanlk7070?si=Q58z8DZEwv9Tpl1B",
  },
  {
    icon: "mdi:whatsapp",
    href: "https://wa.me/5431187434",
  },
  {
    icon: "mdi:telegram",
    href: "https://t.me/hayying",
  },
];

const links = useState<VerticalNavigationLink[]>("links");

const contactClass =
  "flex transition-all items-center gap-3 text-sm hover:text-primary-500 text-xs mb-3";
</script>

<template>
  <footer class="bg-[#121921] p-7 md:p-20 text-gray-300">
    <UContainer>
      <div class="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-20">
        <div class="space-y-5 xl:col-span-2">
          <Logo />
          <p class="text-xs">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic
            asperiores repellendus esse corporis architecto nobis dolorem
            dignissimos repudiandae quibusdam praesentium provident expedita
            accusantium, optio a, nam eum. Aliquid, atque possimus?
          </p>
          <div class="flex items-center flex-wrap gap-3">
            <span class="text-sm text-white"> BİZİ TAKİP EDİN </span>
            <UButton
              color="white"
              variant="link"
              v-for="social in socials"
              :key="social.icon"
              :icon="social.icon"
              :to="social.href"
            />
          </div>
        </div>
        <div class="grid">
          <h1 class="text-lg text-white mb-5">Hızlı Erişim</h1>
          <UButton
            v-for="link in links"
            :label="link.label"
            class="pl-0 w-max"
            size="xs"
            :key="link.label"
            variant="link"
            color="white"
            :to="link.to"
          />
        </div>
        <div class="flex flex-col">
          <h1 class="text-lg text-white mb-5">Bizimle İletişime Geçin</h1>
          <NuxtLink to="tel:0216302004" :class="contactClass">
            <UIcon name="mdi:phone" size="20" />
            0 (216) 302 00 04
          </NuxtLink>
          <NuxtLink to="mailto:info@hayying.com" :class="contactClass">
            <UIcon name="mdi:email" size="20" />
            info@hayying.com
          </NuxtLink>
        </div>
      </div>
      <UDivider class="my-7" :ui="{ border: { base: 'border-gray-800' } }" />
      <div class="text-xs grid items-center md:flex gap-3">
        <NuxtLink to="/"> Şartlar ve Koşullar </NuxtLink>
        <UDivider
          orientation="vertical"
          class="h-5 md:flex hidden"
          :ui="{ border: { base: 'border-gray-800' } }"
        />
        <NuxtLink to="/"> Gizlilik Politikası </NuxtLink>
        <span class="md:ml-auto">© 2024 Hayying Danışmanlık</span>
      </div>
    </UContainer>
  </footer>
</template>
