<script setup lang="ts">
import type { FormSubmitEvent } from "#ui/types";
import { z } from "zod";

const { currentRoute } = useRouter();
const { slug } = currentRoute.value.params;

const { data }: { data: any } = await useApiFetch(
  `/events?populate=*&filters[slug][$eq]=${slug}`
);

const { isAuthenticated, firstname, lastname, email, phoneNumber, jwt } =
  useUserStore();
const config = useRuntimeConfig();
const loading = ref(false);
const { add } = useToast();
const isOpen = ref(false);

useSeoMeta({
  title: data.value.data[0].attributes.title,
  description: data.value.data[0].attributes.description,
  ogImage:
    config.public.apiImgUrl +
    data.value.data[0].attributes.thumbnail.data.attributes.url,
});

const state = reactive({
  firstname: firstname || undefined,
  lastname: lastname || undefined,
  email: email || undefined,
  phoneNumber: phoneNumber || undefined,
});

const schema = z.object({
  firstname: z.string({
    required_error: "Ad zorunludur",
  }),
  lastname: z.string({
    required_error: "Soyad zorunludur",
  }),
  phoneNumber: z
    .string({
      required_error: "Telefon numarası zorunludur",
    })
    .refine(
      (value) =>
        /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(value),
      "Geçerli bir telefon numarası girin"
    ),
  email: z
    .string({
      required_error: "E-posta zorunludur",
    })
    .email("Geçerli bir e-posta adresi girin"),
});

type Schema = z.output<typeof schema>;

async function onSubmit(event: FormSubmitEvent<Schema>) {
  loading.value = true;
  const { status }: { data: any; status: any } = await useApiFetch(
    "/eventApplication",
    {
      method: "POST",
      body: { ...event.data, eventId: data.value.data[0].id },
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    }
  );
  if (status.value === "error") {
    add({
      title: "Bir hata oluştu",
      description:
        "Etkinlik başvurusu yapılırken bir hata oluştu. Lütfen tekrar deneyin.",
    });
  } else {
    add({
      title: "Başvuru yapıldı",
      description: "Etkinlik başvurunuz başarıyla alındı.",
    });
  }
  loading.value = false;
}
</script>

<template>
  <WebPageHeader :title="data.data[0].attributes.title" img="/events.jpg" />
  <UContainer class="my-32 flex flex-wrap gap-10 md:flex-nowrap justify-center">
    <section class="w-full">
      <h1 class="text-2xl mb-3">
        {{ data.data[0].attributes.title }}
      </h1>
      <MDC :value="data.data[0].attributes.description" class="break-all" />
    </section>
    <UCard :ui="{ body: { base: 'grid gap-5', background: 'bg-gray-100' } }">
      <img
        alt="blog"
        class="md:max-w-md md:w-auto w-full object-cover rounded-xl"
        :src="
          config.public.apiImgUrl +
          data.data[0].attributes.thumbnail.data.attributes.url
        "
      />
      <span class="text-gray-500 text-sm">
        {{ new Date(data.data[0].attributes.startDate).toLocaleDateString() }} -
        {{ new Date(data.data[0].attributes.endDate).toLocaleDateString() }}
      </span>
      <UButton
        label="Başvur"
        block
        size="xl"
        @click="isAuthenticated ? (isOpen = true) : navigateTo('/login')"
      />
      <UModal v-model="isOpen">
        <section class="p-10 grid">
          <UButton
            @click="isOpen = false"
            icon="icon-park-outline:close"
            class="mb-5 ml-auto"
          />
          <UForm
            @submit="onSubmit"
            class="grid gap-4"
            :schema="schema"
            :state="state"
          >
            <UFormGroup name="email">
              <UInput v-model="state.email" placeholder="E-posta" />
            </UFormGroup>
            <UFormGroup name="firstname">
              <UInput v-model="state.firstname" placeholder="Ad" />
            </UFormGroup>
            <UFormGroup name="lastname">
              <UInput v-model="state.lastname" placeholder="Soyad" />
            </UFormGroup>
            <UFormGroup name="phoneNumber">
              <UInput
                v-model="state.phoneNumber"
                placeholder="Telefon Numarası"
              />
            </UFormGroup>
            <UButton :loading="loading" type="submit" size="lg" block>
              Başvur
            </UButton>
          </UForm>
        </section>
      </UModal>
    </UCard>
  </UContainer>
</template>
