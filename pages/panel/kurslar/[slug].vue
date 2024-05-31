<script setup lang="ts">
const userData = useState<any>("userData");
const { currentRoute } = useRouter();
const paidContent = userData.value.courses.find(
  (course: any) => course.slug === currentRoute.value.params.slug
).paidContent;
const selectedPaidContent = computed(() => ref(paidContent[0]));
definePageMeta({
  layout: "dashboard",
});
useSeoMeta({
  title: paidContent[0].title,
  description: "Kurs içeriğini buradan görebilirsiniz",
});
</script>

<template>
  <section class="space-y-3 flex flex-wrap gap-5">
    <section class="w-full">
      <section
        class="flex flex-wrap lg:flex-nowrap gap-5 mb-5 items-start justify-between"
      >
        <section class="w-full">
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
          <MDC :value="selectedPaidContent.value.description" class="mt-5" />
        </section>
        <UButtonGroup size="xl" orientation="vertical" class="w-full lg:w-auto">
          <UButton
            v-for="content in paidContent"
            :label="content.title"
            @click="selectedPaidContent.value = content"
            :color="content === selectedPaidContent.value ? 'primary' : 'black'"
          />
        </UButtonGroup>
      </section>
    </section>
  </section>
</template>
