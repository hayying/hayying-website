<script setup lang="ts">
definePageMeta({
  layout: "dashboard",
});
const userData = useState<any>("userData");

const courses = userData?.value?.courses?.map((course: any) => ({
  slug: course.slug,
  ad: course.title,
  açıklama: course.description,
  tür: course.type,
  detaylar: course.details,
}));
const columns = [
  {
    key: "ad",
    label: "Ad",
  },
  {
    key: "açıklama",
    label: "Açıklama",
  },
  {
    key: "tür",
    label: "Tür",
  },
  {
    key: "actions",
    label: "Detaylar",
  },
];
</script>

<template>
  <UCard :ui="{ background: 'bg-gray-100' }">
    <UTable
      :rows="courses"
      :columns="columns"
      :empty-state="{
        icon: 'i-heroicons-circle-stack-20-solid',
        label: 'Kurs Yok',
      }"
    >
      <template #actions-data="{ row }">
        <UButton
          :to="`/panel/kurslar/${row.slug}`"
          icon="material-symbols:chevron-right"
          label="Kursa Git"
          variant="link"
          color="gray"
          class="p-0"
          trailing
        />
      </template>
    </UTable>
  </UCard>
</template>
