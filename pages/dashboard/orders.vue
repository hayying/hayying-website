<script setup lang="ts">
definePageMeta({
  layout: "dashboard",
});
useSeoMeta({
  title: "Siparişler",
});
const userData = useState<any>("userData");

const orders = userData.value.orders.map((order: any) => ({
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
  <UCard :ui="{ background: 'bg-gray-100' }">
    <UTable :rows="orders" :columns="columns">
      <template #actions-data="{ row }">
        <UPopover :popper="{ arrow: true }">
          <UButton label="Ürünler" variant="link" class="p-0" color="gray" />
          <template #panel>
            <div class="p-4 grid gap-5">
              <h1 v-for="product in row.products">
                {{ product.title }}
              </h1>
            </div>
          </template>
        </UPopover>
      </template>
    </UTable>
  </UCard>
</template>
