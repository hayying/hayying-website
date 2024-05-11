<script setup lang="ts">
const { currentRoute } = useRouter();
const src =
  currentRoute.value.path === "/login"
    ? "/home-contact-banner.jpg"
    : "/register.jpg";
</script>

<template>
  <div class="flex overflow-hidden relative">
    <div class="bg-white z-10 w-full md:w-[27rem]">
      <div
        class="bg-gradient-to-r from-purple-900 to-orange-700 p-5 grid place-items-center"
      >
        <Logo />
      </div>
      <div class="p-12 relative">
        <slot />
        <p class="text-center text-gray-400 w-full">
          © 2024 Hayying Danışmanlık
        </p>
      </div>
    </div>
    <img class="absolute w-full h-full object-cover" :src="src" alt="auth" />
  </div>
</template>
