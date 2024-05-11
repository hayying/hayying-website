<script setup lang="ts">
const { currentRoute } = useRouter();

const query = currentRoute.value.query.value;

const { data }: { data: any } = await useApiFetch(`/${query}-policy-page`);

const policies = new Map([
  [
    "membership-agreement-and-terms-of-use",
    "Üyelik Sözleşmesi ve Kullanım Koşulları",
  ],
  ["kvkk", "Gizlilik ve Kişisel Verileri Koruma Politikası"],
  ["refund", "İade ve İptal Politikası"],
  ["cookie", "Çerez Politikası"],
]);

useSeoMeta({
  title: policies.get(query as string),
});
</script>

<template>
  <WebPageHeader
    :title="policies.get(query as string)!.toUpperCase()"
    img="/online-counseling.jpg"
  />
  <UContainer class="my-32">
    <MDC :value="data.data.attributes.policy" />
  </UContainer>
</template>
