<script setup lang="ts">
const { data }: { data: any } = await useApiFetch("/blogs?populate=*");
const config = useRuntimeConfig();

useSeoMeta({
  title: "Blog",
  description: "Hayying blog yazılarına göz atın",
});
</script>

<template>
  <WebPageHeader title="BLOG" img="/blog.jpg" />
  <UContainer class="my-32 grid gap-10">
    <NuxtLink
      class="flex shadow-xl flex-wrap lg:flex-nowrap rounded-xl overflow-hidden dark:bg-black"
      :to="`/blog/${blog.attributes.slug}`"
      v-for="blog in data.data"
      :key="blog.id"
    >
      <section
        class="relative group overflow-hidden w-full xl:w-max flex-shrink-0"
      >
        <img
          :src="
            config.public.apiImgUrl +
            blog.attributes.thumbnail.data.attributes.url
          "
          class="w-full h-full lg:max-w-lg group-hover:scale-110 transition-all"
          draggable="false"
        />
        <UButton
          class="absolute hidden group-hover:block left-[50%] bottom-5 transform -translate-x-1/2 top-[50%] -translate-y-1/2 h-max opacity-70 rounded-full"
          label="Detaylar"
          color="gray"
        />
      </section>
      <section class="w-full flex flex-col">
        <section class="p-4 xl:p-7 flex flex-col overflow-auto h-64">
          <span class="text-gray-500 text-sm">
            {{ new Date(blog.attributes.createdAt).toLocaleDateString() }}
          </span>
          <h1>{{ blog.attributes.title }}</h1>
          <p class="text-gray-500 text-sm my-2 break-all">
            {{ blog.attributes.description }}
          </p>
        </section>
      </section>
    </NuxtLink>
  </UContainer>
</template>
