<script setup lang="ts">
const isOpen = useState("search");

function onFocus(e: any) {
  e.target.select();
}
</script>

<template>
  <section
    class="bg-[url('/home.webp')] bg-cover h-[40rem] bg-center grid place-items-center relative"
  >
    <div class="bg-primary-800 w-full h-full opacity-50 absolute" />
    <UContainer class="z-10 text-white text-center space-y-4">
      <h1 class="text-3xl md:text-5xl font-bold">
        Her eve bir uzman, her eve bir psikolog
      </h1>
      <p class="text-xl">
        İş, teknoloji ve kişisel gelişim alanındaki uzmanlığınızı artırın
      </p>
      <UButtonGroup
        :ui="{ rounded: 'rounded-md' }"
        orientation="horizontal"
        size="xl"
      >
        <UInput
          placeholder="Kurs, doküman, etkinlik ara..."
          class="sm:w-96 border-b-0"
          @click="isOpen = true"
          @focus="onFocus"
          variant="outline"
        />
        <UButton label="Ara" @click="isOpen = true" />
      </UButtonGroup>
    </UContainer>
  </section>
</template>
