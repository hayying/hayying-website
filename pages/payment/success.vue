<script setup lang="ts">
const { currentRoute } = useRouter();
const { removeAllProducts } = useBasketStore();
removeAllProducts();
</script>

<template>
  <WebPageHeader img="/banner.jpg" title="ÖDEME BAŞARILI" />
  <UContainer class="my-32">
    <p>
      {{ currentRoute.query.transactionId }} numaralı siparişiniz başarıyla
      sonuçlandı.
    </p>
  </UContainer>
</template>
