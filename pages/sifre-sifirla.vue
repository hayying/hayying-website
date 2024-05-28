<script setup lang="ts">
import type { FormSubmitEvent } from "#ui/types";
import { z } from "zod";

useSeoMeta({
  title: "Şifremi Sıfırla",
  description: "Şifrenizi sıfırlayın",
});
definePageMeta({
  layout: "auth",
});

const { currentRoute } = useRouter();
const loading = ref(false);
const { add } = useToast();

const state = reactive({
  password: undefined,
  confirmPassword: undefined,
});

const schema = z.object({
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
});

type Schema = z.output<typeof schema>;

async function onSubmit(event: FormSubmitEvent<Schema>) {
  loading.value = true;
  const { status }: { data: any; status: any } = await useApiFetch(
    "/auth/reset-password",
    {
      method: "POST",
      body: { ...event.data, code: currentRoute.value.query.code },
    }
  );
  if (status.value === "error") {
    add({
      title: "Hata",
      description: "Geçersiz kod",
    });
  } else {
    add({
      title: "Şifreniz sıfırlandı!",
    });
    await navigateTo("/giris");
  }
  loading.value = false;
}
</script>

<template>
  <UForm @submit="onSubmit" class="grid gap-4" :schema="schema" :state="state">
    <h1 class="text-xl mb-5">Şifremi Sıfırla</h1>
    <UFormGroup name="password">
      <UInput v-model="state.password" type="password" placeholder="E-posta" />
    </UFormGroup>
    <UFormGroup name="confirmPassword">
      <UInput
        v-model="state.confirmPassword"
        placeholder="Parola Tekrarı"
        type="password"
      />
    </UFormGroup>
    <UButton
      class="mt-5 rounded-full"
      :loading="loading"
      type="submit"
      size="lg"
      block
    >
      Şifremi Sıfırla
    </UButton>
  </UForm>
</template>
