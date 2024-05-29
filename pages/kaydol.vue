<script setup lang="ts">
import type { FormSubmitEvent } from "#ui/types";
import { z } from "zod";

useSeoMeta({
  title: "Kayıt Ol",
  description: "Kayıt olun",
});
definePageMeta({
  layout: "auth",
});

const userStore = useUserStore();
const { add } = useToast();
const loading = ref(false);

const state = reactive({
  firstname: undefined,
  lastname: undefined,
  email: undefined,
  phoneNumber: undefined,
  password: undefined,
  confirmPassword: undefined,
  agree: false,
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
  password: z
    .string({
      required_error: "Parola zorunludur",
    })
    .min(6, "Parola en az 6 karakter olmalıdır")
    .max(30, "Parola en fazla 30 karakter olmalıdır"),
  confirmPassword: z
    .string({
      required_error: "Parola tekrarı zorunludur",
    })
    .refine((value) => value === state.password, "Parolalar eşleşmiyor"),
  agree: z.boolean().refine((value) => value, "Koşulları kabul etmelisiniz"),
});

type Schema = z.output<typeof schema>;

async function onSubmit(event: FormSubmitEvent<Schema>) {
  loading.value = true;
  const { data, status }: { data: any; status: any } = await useApiFetch(
    "/auth/local/register",
    {
      method: "POST",
      body: event.data,
    }
  );
  if (status.value === "error") {
    add({
      title: "Kayıt yapılamadı",
      description:
        "E-posta veya telefon numarası kullanılıyor. Lütfen tekrar deneyin.",
    });
  } else {
    const { jwt, user } = data.value;
    userStore.login(jwt, user);
  }
  loading.value = false;
}
</script>

<template>
  <section class="space-y-5 w-full">
    <h1 class="text-center text-2xl">Hesap Oluştur</h1>
    <UForm
      @submit="onSubmit"
      class="grid gap-4"
      :schema="schema"
      :state="state"
    >
      <UFormGroup name="email" label="E-posta">
        <UInput v-model="state.email" placeholder="ornek@mail.com" />
      </UFormGroup>
      <UFormGroup name="firstname" label="Ad">
        <UInput v-model="state.firstname" placeholder="Adınızı giriniz" />
      </UFormGroup>
      <UFormGroup name="lastname" label="Soyad">
        <UInput v-model="state.lastname" placeholder="Soyadınızı giriniz" />
      </UFormGroup>
      <UFormGroup name="phoneNumber" label="Telefon Numarası">
        <UInput v-model="state.phoneNumber" placeholder="5555555555" />
      </UFormGroup>
      <UFormGroup name="password" label="Parola">
        <UInput
          v-model="state.password"
          type="password"
          placeholder="********"
        />
      </UFormGroup>
      <UFormGroup name="confirmPassword" label="Parola Tekrarı">
        <UInput
          v-model="state.confirmPassword"
          type="password"
          placeholder="********"
        />
      </UFormGroup>
      <UFormGroup name="agree">
        <UCheckbox v-model="state.agree" class="max-w-">
          <template #label>
            <NuxtLink
              to="/yasal?value=membership-agreement-and-terms-of-use"
              class="text-primary-500"
              >Üyelik Sözleşmesi ve Kullanım Koşulları</NuxtLink
            >
            ve
            <NuxtLink to="/yasal?value=kvkk" class="text-primary-500"
              >Gizlilik ve Kişisel Verileri Koruma Politikası</NuxtLink
            >
            metinlerini okudum ve kabul ediyorum.
          </template>
        </UCheckbox>
      </UFormGroup>
      <UButton
        class="mt-10 rounded-full"
        :loading="loading"
        type="submit"
        size="lg"
        block
      >
        Kayıt Ol
      </UButton>
      <NuxtLink
        to="/giris"
        class="text-lg text-primary-500 absolute top-10 right-10 hover:underline"
      >
        Giriş Yap >
      </NuxtLink>
    </UForm>
  </section>
</template>
