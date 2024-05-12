<script setup lang="ts">
const isOpen = useState("search", () => false);

const groups = [
  {
    key: "users",
    label: (q: string) => q && `Eşleşen sonuçlar “${q}”...`,
    search: async (q: string) => {
      if (!q) {
        return [];
      }

      const { data }: { data: any } = await useApiFetch(
        "/fuzzy-search/search?query=" + q
      );
      const results = [
        ...data.value.courses.map((value: any) => ({
          id: Math.random(),
          label: value.title,
          suffix: "Kurs",
          href: `/courses/${value.slug}`,
        })),
        ...data.value.events.map((value: any) => ({
          id: Math.random(),
          label: value.title,
          suffix: "Etkinlik",
          href: `/events/${value.slug}`,
        })),
      ];

      return results;
    },
  },
];
const selected = ref([]);
function onSelect(option: any) {
  navigateTo(option[0].href);
  isOpen.value = false;
}
</script>
<template>
  <UModal v-model="isOpen">
    <UCommandPalette
      v-model="selected"
      multiple
      nullable
      :autoselect="false"
      :debounce="500"
      @update:model-value="onSelect"
      :empty-state="{
        icon: '',
        queryLabel: 'Aradığınız içeriği bulunamadı.',
        label: 'Kurs, doküman, etkinlik ara...',
      }"
      placeholder="Kurs, doküman, etkinlik ara..."
      :groups="groups"
    />
  </UModal>
</template>
