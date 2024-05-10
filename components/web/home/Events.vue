<script setup lang="ts">
const { data: events }: { data: any } = await useApiFetch(
  "/events?populate=*&pagination[page]=0&pagination[pageSize]=4&sort=createdAt:DESC"
);
const config = useRuntimeConfig();
</script>

<template>
  <section class="mt-24">
    <WebHomeSectionHeader
      title="En Son Eklenen Etkinlikler"
      description="En son eklenen etkinlikleri keşfedin"
    />
    <UContainer class="grid">
      <div class="grid justify-center lg:grid-cols-2 gap-10 mt-12">
        <NuxtLink
          class="flex flex-wrap md:flex-nowrap group overflow-hidden break-all gap-5"
          v-for="event in events.data"
          :to="'/events/' + event.attributes.slug"
          :key="event.attributes.slug"
        >
          <img
            :src="
              config.public.apiImgUrl +
              event.attributes.thumbnail.data.attributes.url
            "
            class="w-full md:w-[15rem] h-[15rem] md:h-[10rem] scale-105 group-hover:scale-100 transition-transform"
          />
          <div class="md:px-5 md:py-2">
            <span class="text-gray-400 text-xs">
              {{ new Date(event.attributes.startDate).toLocaleDateString() }} -
              {{ new Date(event.attributes.endDate).toLocaleDateString() }}
            </span>
            <h1 class="text-xl group-hover:text-primary-500">
              {{ event.attributes.title }}
            </h1>
            <MDC
              :value="event.attributes.description"
              class="text-gray-500 text-sm"
            />
          </div>
        </NuxtLink>
      </div>
      <UContainer class="flex w-full">
        <UButton
          class="rounded-full ml-auto mt-5"
          label="Tüm Etkinlikleri Gör"
          to="/events"
          size="xl"
        />
      </UContainer>
    </UContainer>
  </section>
</template>
