<script setup lang="ts">
const links = useBreadcrumbItems({
  hideRoot: true,
});

const isOpen = useState("dashboardSlideoverIsOpen");
const metaDescription = ref();

async function updateMetaDescription() {
  await new Promise((resolve) => setTimeout(resolve, 1));
  metaDescription.value = document
    .querySelector('meta[name="description"]')!
    .getAttribute("content");
}
onMounted(() => {
  updateMetaDescription();
});
onBeforeUpdate(() => {
  updateMetaDescription();
});
</script>

<template>
  <header class="flex items-center justify-between mb-7">
    <div>
      <UBreadcrumb
        :ui="{
          li: 'text-black break-all max-w-[300px]',
          ol: 'flex flex-wrap',
        }"
        :links="links"
      >
        <template #divider>
          <UIcon name="mingcute:right-line" />
        </template>
      </UBreadcrumb>
      <p class="text-zinc-500 text-sm">
        <ClientOnly>
          {{ metaDescription }}
        </ClientOnly>
      </p>
    </div>
    <UButton
      @click="isOpen = !isOpen"
      icon="iconamoon:menu-burger-horizontal"
      size="lg"
      class="flex lg:hidden"
      color="gray"
    />
  </header>
</template>
