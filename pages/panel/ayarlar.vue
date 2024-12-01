<script setup lang="ts">
import type { FormSubmitEvent } from "#ui/types";
import { z } from "zod";

definePageMeta({
  layout: "dashboard",
});
useSeoMeta({
  description: "Hesap ayarlarınızı buradan düzenleyebilirsiniz",
});
const userStore = useUserStore();
const { add } = useToast();
const loading = ref(false);
const passwordLoading = ref(false);
const diplomaLoading = ref(false);
const diploma = ref();

const passwordState = reactive({
  password: undefined,
  confirmPassword: undefined,
  currentPassword: undefined,
});

const state = reactive({
  firstname: userStore.firstname || undefined,
  lastname: userStore.lastname || undefined,
  phoneNumber: userStore.phoneNumber || undefined,
  address: userStore.address || undefined,
  tcIdentificationNumber: userStore.tcIdentificationNumber || undefined,
  title: userStore.title || undefined,
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
  address: z.string({
    required_error: "Adres zorunludur",
  }),
  tcIdentificationNumber: z
    .string({
      required_error: "TC Kimlik numarası zorunludur",
    })
    .refine(
      (value) => value.length === 11,
      "Geçerli bir TC Kimlik numarası girin"
    ),
  title: z.string({
    required_error: "Ünvan zorunludur",
  }),
});
const passwordSchema = z.object({
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
    .refine(
      (value) => value === passwordState.password,
      "Parolalar eşleşmiyor"
    ),
  currentPassword: z.string({
    required_error: "Mevcut parola zorunludur",
  }),
});

type PasswordSchema = z.output<typeof passwordSchema>;

async function onSubmit(event: any) {
  loading.value = true;
  const changedFields = Object.keys(event.data).reduce((acc, key) => {
    //@ts-ignore
    if (event.data[key] !== userStore[key]) {
      acc[key] = event.data[key];
    }
    return acc;
  }, {} as any);
  if (Object.keys(changedFields).length === 0) {
    return;
  }
  const { status }: { data: any; status: any } = await useApiFetch("/user/me", {
    method: "PUT",
    body: changedFields,
    headers: {
      Authorization: `Bearer ${userStore.jwt}`,
    },
  });
  if (status.value === "error") {
    add({
      title: "Hata",
      description: "Bir hata oluştu",
    });
  } else {
    add({
      title: "Başarılı",
      description: "Bilgiler başarıyla güncellendi",
    });
    Object.keys(changedFields).forEach((key) => {
      //@ts-ignore
      userStore[key] = changedFields[key];
    });
  }
  loading.value = false;
}

async function passwordOnSubmit(event: FormSubmitEvent<PasswordSchema>) {
  loading.value = true;
  const { data, status }: { data: any; status: any } = await useApiFetch(
    "/auth/change-password",
    {
      method: "POST",
      body: {
        currentPassword: event.data.currentPassword,
        password: event.data.password,
        passwordConfirmation: event.data.confirmPassword,
      },
      headers: {
        Authorization: `Bearer ${userStore.jwt}`,
      },
    }
  );
  if (status.value === "error") {
    add({
      title: "Hata",
      description: "Bir hata oluştu",
    });
  } else {
    add({
      title: "Başarılı",
      description: "Parola başarıyla değiştirildi",
    });
    const { jwt, user } = data.value;
    userStore.login(jwt, user, false);
  }
  loading.value = false;
}

async function sendDiploma() {
  diplomaLoading.value = true;
  const formData = new FormData();
  formData.append("diploma", diploma.value);
  const { status }: { data: any; status: any } = await useApiFetch("/user/me", {
    method: "PUT",
    body: formData,
    headers: {
      Authorization: `Bearer ${userStore.jwt}`,
    },
  });
  if (status.value === "error") {
    add({
      title: "Hata",
      description: "Bir hata oluştu",
    });
  } else {
    add({
      title: "Başarılı",
      description: "Diploma başarıyla yüklendi",
    });
  }
  diplomaLoading.value = false;
}

function saveDiploma(event: any) {
  diploma.value = event[0];
}
</script>

<template>
  <section class="space-y-5 grid max-w-xl gap-10">
    <UForm
      @submit="onSubmit"
      class="grid gap-4"
      :schema="schema"
      :state="state"
    >
      <UFormGroup name="firstname" label="Ad">
        <UInput v-model="state.firstname" placeholder="Adınız" />
      </UFormGroup>
      <UFormGroup name="lastname" label="Soyad">
        <UInput v-model="state.lastname" placeholder="Soyadınız" />
      </UFormGroup>
      <UFormGroup name="phoneNumber" label="Telefon Numarası">
        <UInput v-model="state.phoneNumber" placeholder="5555555555" />
      </UFormGroup>
      <UFormGroup name="tcIdentificationNumber" label="TC Kimlik Numarası">
        <UInput
          v-model="state.tcIdentificationNumber"
          placeholder="44433221100"
        />
      </UFormGroup>
      <UFormGroup name="title" label="Ünvan">
        <UInput v-model="state.title" placeholder="Ünvanınız" />
      </UFormGroup>
      <UFormGroup name="address" label="Adres">
        <UInput v-model="state.address" placeholder="Adresiniz" />
      </UFormGroup>

      <UButton
        class="rounded-full"
        :loading="loading"
        type="submit"
        size="lg"
        block
      >
        Kaydet
      </UButton>
    </UForm>
    <UForm
      @submit="passwordOnSubmit"
      class="space-y-4"
      :schema="passwordSchema"
      :state="passwordState"
    >
      <UFormGroup name="currentPassword" label="Mevcut Parola">
        <UInput
          v-model="passwordState.currentPassword"
          placeholder="Mevcut Parolanız"
        />
      </UFormGroup>

      <UFormGroup name="password" label="Yeni Parola">
        <UInput v-model="passwordState.password" placeholder="Yeni parolanız" />
      </UFormGroup>
      <UFormGroup name="confirmPassword" label="Yeni Parola Tekrarı">
        <UInput
          v-model="passwordState.confirmPassword"
          placeholder="Tekrar yeni parolanız"
        />
      </UFormGroup>
      <UButton
        class="rounded-full"
        :loading="passwordLoading"
        type="submit"
        size="lg"
        block
      >
        Parolayı Değiştir
      </UButton>
    </UForm>
    <section>
      <h1>Diploma</h1>
      <UInput type="file" @change="saveDiploma" />
      <UButton
        class="rounded-full mt-5"
        :loading="diplomaLoading"
        @click="sendDiploma"
        type="submit"
        size="lg"
        block
      >
        Diplomayı Kaydet
      </UButton>
    </section>
  </section>
</template>
