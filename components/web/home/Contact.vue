<template>
  <section
    class="mt-32 bg-fixed bg-[url('/home-contact.jpg')] py-32 bg-cover relative"
  >
    <div
      class="bg-gradient-to-t from-orange-500/40 to-transparent w-full h-full absolute"
    />
    <UContainer>
      <section
        class="bg-zinc-950 relative z-10 rounded-xl shadow-xl text-white max-w-lg p-12"
        v-motion="{
          initial: {
            y: 200,
            opacity: 0,
          },
          visibleOnce: {
            y: 0,
            opacity: 1,
            transition: {
              duration: 1000,
            },
          },
        }"
      >
        <h1 class="text-2xl mb-2">BİZE ULAŞIN</h1>
        <p class="text-gray-400 text-sm">
          Sorunuz, öneriniz ya da geri bildiriminiz varsa veya kurs fırsatları
          hakkında bilgi almak istiyorsanız, aşağıdaki formu doldurabilirsiniz.
          Ekip arkadaşlarımız size en kısa sürede dönüş sağlayacaktır.
        </p>
        <UButton
          class="rounded-full ml-auto mt-7"
          label="İletişime Geç"
          to="/iletisim"
          size="xl"
        />
      </section>
    </UContainer>
  </section>
</template>
