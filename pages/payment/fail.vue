<script setup lang="ts">
const { currentRoute } = useRouter();
</script>

<template>
  <WebPageHeader img="/policy-banner.jpg" title="ÖDEME BAŞARISIZ" />
  <UContainer class="my-32">
    <p>
      {{ currentRoute.query.transactionId }} numaralı siparişiniz başarısız
      oldu.
    </p>
  </UContainer>
</template>
