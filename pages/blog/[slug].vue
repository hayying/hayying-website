<script setup lang="ts">
const { currentRoute } = useRouter();
const { slug } = currentRoute.value.params;

const { data }: { data: any } = await useApiFetch(
  `/blogs?populate=*&filters[slug][$eq]=${slug}`
);

const config = useRuntimeConfig();
</script>

<template>
  <WebPageHeader
    :title="data.data[0].attributes.title"
    img="/policy-banner.jpg"
  />
  <UContainer class="my-32">
    <div class="shadow-xl p-7 grid gap-3">
      <img
        alt="blog"
        class="h-96 w-full object-cover"
        :src="
          config.public.apiImgUrl +
          data.data[0].attributes.thumbnail.data.attributes.url
        "
      />
      <h1 class="text-2xl">
        {{ data.data[0].attributes.title }}
      </h1>
      <span class="text-gray-500 text-sm">
        {{ new Date(data.data[0].attributes.createdAt).toLocaleDateString() }} -
        {{ data.data[0].attributes.createdBy.firstname }}
        {{ data.data[0].attributes.createdBy.lastname }}
      </span>
      <MDC :value="data.data[0].attributes.content" />
    </div>
  </UContainer>
</template>
