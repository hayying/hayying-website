<script setup lang="ts">
import type { FormSubmitEvent } from "#ui/types";
import { z } from "zod";

useSeoMeta({
  title: "İletişim",
  description: "Hayying ile iletişime geçin",
});

const schema = z.object({
  email: z
    .string({
      required_error: "E-posta alanı boş bırakılamaz",
    })
    .email("Geçerli bir e-posta adresi giriniz"),
  name: z
    .string({
      required_error: "İsim alanı boş bırakılamaz",
    })
    .min(3, "İsim en az 3 karakter olmalıdır")
    .max(30, "İsim en fazla 30 karakter olmalıdır"),
  topic: z
    .string({
      required_error: "Konu alanı boş bırakılamaz",
    })
    .min(3, "Konu en az 3 karakter olmalıdır")
    .max(30, "Konu en fazla 30 karakter olmalıdır"),
  message: z
    .string({
      required_error: "Mesaj alanı boş bırakılamaz",
    })
    .min(10, "Mesaj en az 10 karakter olmalıdır")
    .max(500, "Mesaj en fazla 500 karakter olmalıdır"),
  file: z.string({
    required_error: "Dosya alanı boş bırakılamaz",
  }),
});

type Schema = z.output<typeof schema>;

const { email, firstname, lastname } = useUserStore();
const loading = ref(false);
const { add } = useToast();
const file = ref();

const state = reactive({
  email: email || undefined,
  name: `${firstname} ${lastname}` || undefined,
  topic: undefined,
  message: undefined,
  file: undefined,
});

async function onSubmit(event: FormSubmitEvent<Schema>) {
  loading.value = true;
  const { email, message, name, topic } = event.data;
  const formData = new FormData();
  formData.append("email", email);
  formData.append("message", message);
  formData.append("name", name);
  formData.append("topic", topic);
  if (file.value) {
    formData.append("file", file.value);
  }
  const { status } = await useApiFetch("/contact-requests", {
    method: "POST",
    body: formData,
  });
  if (status.value === "success") {
    Object.assign(state, {
      email: "",
      message: "",
      name: "",
      topic: "",
    });
    add({
      title: "Başarılı",
      description: "Mesajınız başarıyla gönderildi",
    });
  } else {
    add({
      title: "Hata",
      description: "Mesajınız gönderilemedi",
    });
  }
  loading.value = false;
}

function onChange(files: FileList) {
  if (!files.length) return;
  file.value = files[0];
}

const features = [
  {
    title: "Adres",
    description:
      "Caddebostan, Caddebostan İskele Sk. No:17/202, 34734 Kadıköy/İstanbul",
    icon: "mdi:address-marker-outline",
  },
  {
    title: "E-posta",
    description: "info@hayying.com adresinden bize ulaşabilirsiniz",
    icon: "mdi:email",
  },
  {
    title: "Telefon",
    description:
      "0 (216) 302 00 04 numaralı telefonumuzdan bize ulaşabilirsiniz",
    icon: "mdi:phone",
  },
];
</script>

<template>
  <WebPageHeader img="/contact-banner.jpg" title="İLETİŞİM" />
  <div class="bg-[#0B2449]">
    <UContainer
      class="py-7 text-white flex flex-col gap-10 md:flex-row flex-items-center justify-around"
    >
      <div
        v-for="{ description, icon, title } in features"
        :key="title"
        class="grid place-items-center"
      >
        <UIcon :name="icon" class="text-5xl mb-3" />
        <h1 class="text-primary-500 font-bold text-lg">
          {{ title }}
        </h1>
        <p class="text-gray-300 max-w-[19rem] text-center">{{ description }}</p>
      </div>
    </UContainer>
  </div>
  <UContainer class="my-32">
    <h1 class="text-2xl mb-3">İletişim Formu</h1>
    <p class="text-gray-500 mb-12">Size en kısa sürede dönüş yapaacağız.</p>
    <UForm
      class="grid grid-cols-2 gap-10"
      @submit="onSubmit"
      :schema="schema"
      :state="state"
    >
      <UFormGroup name="email">
        <UInput v-model="state.email" placeholder="E-posta" />
      </UFormGroup>
      <UFormGroup name="name">
        <UInput v-model="state.name" placeholder="İsim" />
      </UFormGroup>
      <UFormGroup name="topic">
        <UInput v-model="state.topic" placeholder="Konu" />
      </UFormGroup>
      <UFormGroup name="file">
        <UInput type="file" @change="onChange" v-model="state.file" />
      </UFormGroup>
      <UFormGroup name="message" class="col-span-2">
        <UTextarea
          v-model="state.message"
          placeholder="Mesaj"
          :ui="{ rounded: '' }"
        />
      </UFormGroup>

      <UButton
        class="rounded-full w-max"
        :loading="loading"
        type="submit"
        size="lg"
      >
        Gönder
      </UButton>
    </UForm>
  </UContainer>
</template>
