<script setup lang="ts">
const { currentRoute } = useRouter();
const { slug } = currentRoute.value.params;

const { data }: { data: any } = await useApiFetch(
  `/blogs?populate=*&filters[slug][$eq]=${slug}`
);

const config = useRuntimeConfig();

useSeoMeta({
  title: data.value.data[0].attributes.title,
  description: data.value.data[0].attributes.description,
  ogImage:
    config.public.apiImgUrl +
    data.value.data[0].attributes.thumbnail.data.attributes.url,
});
</script>

<template>
  <WebPageHeader :title="data.data[0].attributes.title" img="/blog.jpg" />
  <UContainer class="my-32" :ui="{ constrained: 'max-w-5xl' }">
    <div class="shadow-xl p-7 grid gap-3">
      <NuxtImg
        alt="blog"
        class="h-full w-full"
        :src="
          config.public.apiImgUrl +
          data.data[0].attributes.thumbnail.data.attributes.url
        "
      />
      <h1 class="text-2xl">
        {{ data.data[0].attributes.title }}
      </h1>
      <span class="text-gray-500 text-sm">
        {{ new Date(data.data[0].attributes.createdAt).toLocaleDateString() }}
      </span>
      <MDC :value="data.data[0].attributes.content" />
    </div>
  </UContainer>
</template>
