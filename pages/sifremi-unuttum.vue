<script setup lang="ts">
import type { FormSubmitEvent } from "#ui/types";
import { z } from "zod";

useSeoMeta({
  title: "Şifremi Unuttum",
  description: "Şifrenizi unuttuysanız, buradan sıfırlayabilirsiniz",
});
definePageMeta({
  layout: "auth",
});

const loading = ref(false);
const { add } = useToast();

const state = reactive({
  email: undefined,
});

const schema = z.object({
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
    "/auth/forgot-password",
    {
      method: "POST",
      body: event.data,
    }
  );
  if (status.value === "error") {
    add({
      title: "Hata",
      description: "E-posta adresi bulunamadı",
    });
  } else {
    add({
      title: "E-posta gönderildi!",
      description: "Şifrenizi sıfırlamanız için size e-posta gönderdik.",
    });
    await navigateTo("/sifre-sifirla");
  }
  loading.value = false;
}
</script>

<template>
  <UForm
    @submit="onSubmit"
    class="grid gap-4 text-center w-full"
    :schema="schema"
    :state="state"
  >
    <h1>Şifremi Unuttum</h1>
    <UFormGroup name="email">
      <UInput v-model="state.email" placeholder="E-posta" />
    </UFormGroup>
    <UButton
      class="mt-5 rounded-full"
      :loading="loading"
      type="submit"
      size="lg"
      block
    >
      Kod Gönder
    </UButton>
    <NuxtLink
      to="/giris"
      class="text-lg text-primary-500 absolute top-10 right-10 hover:underline"
    >
      Giriş Yap >
    </NuxtLink>
  </UForm>
</template>
