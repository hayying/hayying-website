<script setup lang="ts">
const { currentRoute } = useRouter();
const { slug } = currentRoute.value.params;

const { data }: { data: any } = await useApiFetch(
  `/courses?populate=*&filters[slug][$eq]=${slug}`
);

const { isAuthenticated } = useUserStore();
const { addProduct, alreadyAdded } = useBasketStore();
const config = useRuntimeConfig();

useSeoMeta({
  title: data.value.data[0].attributes.title,
  description: data.value.data[0].attributes.description,
  ogImage:
    config.public.apiImgUrl + data.value.data[0].attributes.thumbnail.url,
});
</script>

<template>
  <WebPageHeader
    :title="data.data[0].attributes.title"
    img="/policy-banner.jpg"
  />
  <UContainer class="my-32 flex flex-wrap gap-10 md:flex-nowrap justify-center">
    <div class="w-full">
      <h1 class="text-2xl mb-3">
        {{ data.data[0].attributes.title }}
      </h1>
      <MDC :value="data.data[0].attributes.details" class="break-all" />
    </div>
    <UCard :ui="{ body: { base: 'grid gap-3 ', background: 'bg-gray-100' } }">
      <img
        alt="blog"
        class="md:max-w-md md:w-auto w-full object-cover"
        :src="config.public.apiImgUrl + data.data[0].attributes.thumbnail.url"
      />
      <div class="flex items-end justify-between mt-3">
        <span class="text-3xl" v-if="data.data[0].attributes.price !== 0"
          >{{ data.data[0].attributes.price }}₺</span
        >

        <span
          class="text-gray-500 text-lg ml-auto"
          :class="{
            'text-green-500': data.data[0].attributes.type === 'online',
            'text-red-500': data.data[0].attributes.type === 'offline',
          }"
        >
          {{ data.data[0].attributes.type.toUpperCase() }}
        </span>
      </div>
      <UButton
        v-if="data.data[0].attributes.price !== 0"
        :disabled="alreadyAdded(data.data[0].id)"
        @click="
          isAuthenticated
            ? addProduct({
                id: data.data[0].id,
                image:
                  config.public.apiImgUrl +
                  data.data[0].attributes.thumbnail.url,
                name: data.data[0].attributes.title,
                price: data.data[0].attributes.price,
              })
            : navigateTo('/login')
        "
        label="Sepete Ekle"
        size="xl"
        block
      />
      <UButton label="İletişime Geç" to="/contact" block size="xl" v-else />

      <p class="text-gray-500">
        {{ data.data[0].attributes.description }}
      </p>
    </UCard>
  </UContainer>
</template>
