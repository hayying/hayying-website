<script setup lang="ts">
definePageMeta({
  layout: "dashboard",
});
useSeoMeta({
  title: "Etkinlikler",
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
    <UTable
      :rows="events"
      :columns="columns"
      :empty-state="{
        icon: 'i-heroicons-circle-stack-20-solid',
        label: 'Etkinlik Yok',
      }"
    />
  </UCard>
</template>
