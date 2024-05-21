<script setup lang="ts">
useSeoMeta({
  title: "Kurslar",
  description: "Hayying Danışmanlık tarafından sunulan kurslar.",
  ogImage: "/online-counseling.jpg",
});

const { data }: { data: any } = await useApiFetch("/courses?populate=*");
const config = useRuntimeConfig();
const type = ref("all");

const courses = computed(() => {
  return data.value.data.filter((item: any) => {
    if (type.value === "all") return true;
    return item.attributes.type === type.value;
  });
});

function setType(value: string) {
  type.value = value;
}
</script>

<template>
  <WebPageHeader title="KURSLAR" img="/banner.jpg" />
  <div class="bg-primary-500 p-3">
    <UContainer>
      <UButtonGroup size="sm" orientation="horizontal">
        <UButton
          label="Hepsi"
          @click="setType('all')"
          :color="type === 'all' ? 'blue' : 'gray'"
        />
        <UButton
          label="Online"
          @click="setType('online')"
          :color="type === 'online' ? 'blue' : 'gray'"
        />
        <UButton
          label="Offline"
          @click="setType('offline')"
          :color="type === 'offline' ? 'blue' : 'gray'"
        />
      </UButtonGroup>
    </UContainer>
  </div>
  <UContainer class="my-32">
    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
      <NuxtLink
        class="shadow-xl transition-all"
        v-for="item in courses"
        :to="`/courses/${item.attributes.slug}`"
      >
        <div class="relative group overflow-hidden">
          <NuxtImg
            :src="config.public.apiImgUrl + item.attributes.thumbnail.url"
            class="h-[25rem] w-full aspect-square group-hover:scale-110 transition-all"
            draggable="false"
          />
          <div
            v-if="item.attributes.price !== 0"
            class="absolute bottom-0 left-5 bg-black opacity-70 text-white p-2 py-1"
          >
            {{ item.attributes.price }}₺
          </div>
          <UButton
            class="absolute hidden group-hover:block left-[50%] bottom-5 transform -translate-x-1/2 top-[50%] -translate-y-1/2 h-max opacity-70 rounded-full"
            label="Detaylar"
            color="gray"
          />
        </div>
        <div class="p-5">
          <span
            class="text-gray-500 text-sm mb-2"
            :class="{
              'text-green-500': item.attributes.type === 'online',
              'text-red-500': item.attributes.type === 'offline',
            }"
          >
            {{ item.attributes.type.toUpperCase() }}
          </span>
          <h1 class="text-lg font-bold text-gray-800">
            {{ item.attributes.title }}
          </h1>
          <p class="text-gray-500">{{ item.attributes.description }}</p>
        </div>
      </NuxtLink>
    </div>
  </UContainer>
</template>
