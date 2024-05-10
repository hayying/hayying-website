<template>
  <section
    class="bg-[url('/heroheader-banner.jpg')] bg-cover h-[40rem] bg-center grid place-items-center relative"
  >
    <div class="bg-indigo-800 w-full h-full opacity-50 absolute" />
    <UContainer class="z-10 text-white text-center space-y-4">
      <h1 class="text-3xl md:text-5xl font-bold">NE ÖĞRENECEKSİNİZ?</h1>
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
          variant="outline"
        />
        <UButton
          class="hover:bg-yellow-500 transition-all"
          color="purple"
          label="Ara"
        />
      </UButtonGroup>
    </UContainer>
  </section>
</template>
