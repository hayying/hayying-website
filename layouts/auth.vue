<script setup lang="ts">
const { currentRoute } = useRouter();
const src = computed(() =>
  currentRoute.value.path === "/giris" ? "/login.jpg" : "/register.jpg"
);
</script>

<template>
  <section class="flex overflow-hidden relative min-h-screen">
    <section class="bg-white z-10 w-full md:w-[27rem]">
      <section
        class="bg-gradient-to-r from-primary-800 to-primary-600 p-5 grid place-items-center"
      >
        <Logo />
      </section>
      <section class="p-12 relative">
        <slot />
        <p class="text-center text-gray-400 w-full mt-10">
          © 2024 Hayying Danışmanlık
        </p>
      </section>
    </section>
    <img class="absolute w-full h-full object-cover" :src="src" alt="auth" />
  </section>
</template>
