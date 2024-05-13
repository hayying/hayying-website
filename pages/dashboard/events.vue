<script setup lang="ts">
definePageMeta({
  layout: "dashboard",
});
const userData = useState<any>("userData");

const events = userData.value.appliedEvents.map((event: any) => ({
  ad: event.title,
  başlangıç: event.startDate,
  Bitiş: event.endDate,
}));
const columns = [
  {
    key: "ad",
    label: "Ad",
  },
  {
    key: "başlangıç",
    label: "Başlangıç",
  },
  {
    key: "Bitiş",
    label: "Bitiş",
  },
];
</script>

<template>
  <UCard :ui="{ background: 'bg-gray-100' }">
    <UTable :rows="events" :columns="columns">
      <template #actions-data="{ row }">
        <UButton
          :to="`/dashboard/courses/${row.slug}`"
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
