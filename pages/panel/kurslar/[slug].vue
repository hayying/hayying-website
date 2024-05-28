<script setup lang="ts">
definePageMeta({
  layout: "dashboard",
});
const userData = useState<any>("userData");
const { currentRoute } = useRouter();
const paidContent = userData.value.courses.find(
  (course: any) => course.slug === currentRoute.value.params.slug
).paidContent;
const selectedPaidContent = computed(() => ref(paidContent[0]));
</script>

<template>
  <section class="space-y-3">
    <UCarousel
      :ui="{
        container: 'p-2 flex gap-3',
      }"
      class="overflow-hidden"
      :items="paidContent"
      v-slot="{ item }"
    >
      <UCard
        @click="selectedPaidContent.value = item"
        class="relative cursor-pointer"
      >
        <UChip
          position="top-left"
          :show="selectedPaidContent.value === item"
          size="lg"
          :ui="{
            position: {
              'top-left': '-top-2 -left-2',
            },
          }"
        >
          {{ item.title }}
        </UChip>
      </UCard>
    </UCarousel>
    <VideoPlayer
      :src="selectedPaidContent.value.videoURl"
      v-if="selectedPaidContent.value.videoURl"
    />
    <UButton
      size="xl"
      label="Görüşmeye Katıl"
      :to="selectedPaidContent.value.meetingURl"
      v-else
    />
    <h1 class="text-2xl">
      {{ selectedPaidContent.value.title }}
    </h1>
    <MDC :value="selectedPaidContent.value.description" />
  </section>
</template>
