<script setup lang="ts">
definePageMeta({
  layout: "dashboard",
});
useSeoMeta({
  description: "Siparişlerinizi buradan görebilirsiniz",
});
const userData = useState<any>("userData");

const orders = userData.value?.orders?.map((order: any) => ({
  id: order.transactionId,
  fiyat: order.paymentAmount,
  products: order.courses,
}));
const columns = [
  {
    key: "id",
    label: "Id",
  },
  {
    key: "fiyat",
    label: "Fiyat",
  },
  {
    key: "actions",
    label: "Detaylar",
  },
];
</script>

<template>
  <UTable
    :rows="orders"
    :columns="columns"
    :empty-state="{
      icon: 'i-heroicons-circle-stack-20-solid',
      label: 'Sipariş Yok',
    }"
  >
    <template #actions-data="{ row }">
      <UPopover :popper="{ arrow: true }">
        <UButton label="Ürünler" variant="link" class="p-0" color="gray" />
        <template #panel>
          <section class="p-4 grid gap-5">
            <h1 v-for="product in row.products">
              {{ product.title }}
            </h1>
          </section>
        </template>
      </UPopover>
    </template>
  </UTable>
</template>
