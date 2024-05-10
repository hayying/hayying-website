<script setup lang="ts">
const { currentRoute } = useRouter();

const { data }: { data: any } = await useApiFetch(
  `/${currentRoute.value.query.value}-policy-page`
);
</script>

<template>
  <WebPageHeader img="/online-counseling.jpg" title="ONLİNE DANIŞMANLIK" />
  <UContainer class="mt-32">
    <MDC :value="data.data.attributes.policy" />
  </UContainer>
</template>
