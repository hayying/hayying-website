<script setup lang="ts">
const basketStore = useBasketStore();
const { alreadyAdded, products, totalPrice } = storeToRefs(basketStore);
</script>

<template>
  <UPopover
    class="fixed bottom-5 right-1 sm:right-5 z-50"
    :popper="{ arrow: true, offsetDistance: 20, placement: 'top-end' }"
  >
    <UChip :text="products.length" position="top-left" size="3xl" color="blue">
      <UButton
        :ui="{
          icon: {
            size: {
              xl: 'h-10 w-10',
            },
          },
        }"
        trailing-icon="fa:shopping-basket"
        class="w-16 h-16"
        size="xl"
        block
      />
    </UChip>
    <template #panel>
      <section class="p-4 grid gap-5">
        <p v-if="products.length === 0">Sepetinizde ürün bulunmamaktadır.</p>
        <section
          v-for="product in products"
          class="grid gap-3"
          :key="product.id"
          v-else
        >
          <section class="flex items-center justify-between gap-2">
            <img
              class="w-16 h-16 object-cover hidden sm:block"
              :src="product.image"
              alt="product"
            />
            <section class="flex-1 ml-3">
              <p class="text-lg">{{ product.name }}</p>
              <p class="text-gray-500">{{ product.price }}₺</p>
            </section>
            <UButton
              @click="basketStore.removeProduct(product.id)"
              icon="material-symbols:close"
              color="red"
              size="sm"
              class="ml-5"
            />
          </section>
        </section>
        <UDivider v-if="products.length > 0" />
        <p class="text-gray-500 text-right" v-if="products.length > 0">
          Toplam: {{ totalPrice }}₺
        </p>
        <UButton
          v-if="products.length > 0"
          label="Ödeme Yap"
          to="/payment"
          size="lg"
          block
        />
      </section>
    </template>
  </UPopover>
</template>
