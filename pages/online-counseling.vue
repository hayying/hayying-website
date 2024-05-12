<script setup lang="ts">
useSeoMeta({
  title: "Online Danışmanlık",
  description: "Hayying ile online danışmanlık hizmeti alın",
});

const { data }: { data: any } = await useApiFetch("/online-consulting");
</script>
<template>
  <WebPageHeader img="/online-counseling.jpg" title="ONLİNE DANIŞMANLIK" />
  <UContainer class="my-32">
    <MDC :value="data.data.attributes.content" />
  </UContainer>
</template>
