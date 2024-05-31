<script setup lang="ts">
definePageMeta({
  layout: "dashboard",
});
useSeoMeta({
  description: "Başvurduğunuz etkinlikleri buradan görebilirsiniz",
});
const userData = useState<any>("userData");

const events = userData.value.appliedEvents.map((event: any) => ({
  ad: event.title,
  başlangıç: new Date(event.startDate).toLocaleString(),
  Bitiş: new Date(event.endDate).toLocaleString(),
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
  <UTable
    :rows="events"
    :columns="columns"
    :empty-state="{
      icon: 'i-heroicons-circle-stack-20-solid',
      label: 'Etkinlik Yok',
    }"
  />
</template>
