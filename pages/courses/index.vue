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
  <section class="bg-primary-500 p-3">
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
  </section>
  <UContainer class="my-32">
    <section class="flex flex-wrap gap-0 gap-10 justify-center">
      <WebCourse v-for="item in courses" :key="item.id" :item="item" />
    </section>
  </UContainer>
</template>
