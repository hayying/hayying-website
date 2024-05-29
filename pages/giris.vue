<script setup lang="ts">
import type { FormSubmitEvent } from "#ui/types";
import { z } from "zod";
import {
  type AuthCodeFlowSuccessResponse,
  useTokenClient,
} from "vue3-google-signin";

useSeoMeta({
  title: "Giriş Yap",
  description: "Giriş yapın",
});
definePageMeta({
  layout: "auth",
});

const userStore = useUserStore();
const { add } = useToast();
const loading = ref(false);

const state = reactive({
  identifier: undefined,
  password: undefined,
});

const handleOnSuccess = async (response: AuthCodeFlowSuccessResponse) => {
  const { access_token, expires_in, prompt, scope, token_type } = response;

  const { data }: { data: any } = await useApiFetch(
    `/auth/google/callback?id_token${prompt}&access_token=${access_token}&expires_in=${expires_in}&scope=${scope}&token_type=${token_type}`
  );

  const { jwt, user } = data.value;
  userStore.login(jwt, user);
};

const { isReady, login } = useTokenClient({
  onSuccess: handleOnSuccess,
});

const schema = z.object({
  identifier: z
    .string({
      required_error: "E-posta zorunludur",
    })
    .email("Geçerli bir e-posta adresi girin"),
  password: z.string({
    required_error: "Parola zorunludur",
  }),
});

type Schema = z.output<typeof schema>;

async function onSubmit(event: FormSubmitEvent<Schema>) {
  loading.value = true;
  const { data, status }: { data: any; status: any } = await useApiFetch(
    "/auth/local",
    {
      method: "POST",
      body: event.data,
    }
  );
  if (status.value === "error") {
    add({
      title: "Giriş yapılamadı",
      description: "E-posta veya parola hatalı. Lütfen tekrar deneyin.",
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
    <h1 class="text-center text-2xl">Hoşgeldiniz!</h1>
    <UButton
      label="Google ile Giriş Yap"
      :disabled="!isReady"
      @click="() => login()"
      color="red"
      block
      size="lg"
      icon="fa-brands:google"
    />
    <UDivider label="veya" />
    <UForm
      @submit="onSubmit"
      class="grid gap-4"
      :schema="schema"
      :state="state"
    >
      <UFormGroup name="identifier" label="E-posta">
        <UInput v-model="state.identifier" placeholder="ornek@mail.com" />
      </UFormGroup>
      <UFormGroup name="password" label="Parola">
        <UInput
          v-model="state.password"
          type="password"
          placeholder="********"
        />
      </UFormGroup>
      <NuxtLink to="/sifremi-unuttum" class="text-sm text-primary-500 w-max">
        Parolanızı mı unuttunuz?
      </NuxtLink>
      <UButton
        class="mt-10 rounded-full"
        :loading="loading"
        type="submit"
        size="lg"
        block
      >
        Giriş Yap
      </UButton>
      <NuxtLink
        to="/kaydol"
        class="text-lg text-primary-500 absolute top-10 right-10 hover:underline"
      >
        Kayıt ol >
      </NuxtLink>
    </UForm>
  </section>
</template>
