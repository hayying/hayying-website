<script setup lang="ts">
const { currentRoute } = useRouter();
const src = computed(() =>
  currentRoute.value.path === "/giris" ? "/login.jpg" : "/register.jpg"
);
</script>

<template>
  <section :class="`overflow-hidden min-h-screen`">
    <img :src="src" class="absolute object-cover w-full h-full" />
    <section
      class="absolute flex p-10 w-full h-full bg-gradient-to-r from-black/50 to-transparent"
    >
      <Logo />
      <p class="w-1/3 absolute bottom-10 text-white">
        Hayying Danışmanlık, 2020 yılından bu yana öğrenci ve profesyonellere
        yönelik kurs ve etkinlikler sunan öncü bir eğitim danışmanlık
        şirketidir.
      </p>
    </section>

    <section
      class="relative float-end bg-white dark:bg-black min-h-screen w-full md:w-1/2 grid place-items-center ring-2 ring-gray-200 dark:ring-gray-800"
    >
      <main
        class="px-10 py-5 md:max-w-xl flex flex-col gap-8 items-center justify-center w-full"
      >
        <slot />
      </main>
    </section>
  </section>
</template>
