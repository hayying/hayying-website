<script setup lang="ts">
const basketStore = useBasketStore();
const { jwt, firstname, lastname, address } = useUserStore();
const { products } = storeToRefs(basketStore);
const coupon = reactive({
  code: undefined,
  discount: 0,
});
const loading = ref(false);
const { add } = useToast();
const type = ref("card");
const iframeToken = ref("");
const isOpen = ref(false);

function openModal(t: string) {
  type.value = t;
  getIframe();
  isOpen.value = true;
}

async function controlCouponCode() {
  loading.value = true;
  const { data, status }: { data: any; status: any } = await useApiFetch(
    "/coupon/" + coupon.code,
    {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    }
  );
  if (status.value === "success") {
    add({
      title: "Başarılı",
      description: "Kupon kodu başarıyla uygulandı",
    });
    coupon.discount = data.value.discountPercent;
  } else {
    add({
      title: "Hata",
      description: "Kupon kodu geçersiz",
    });
  }
  loading.value = false;
}

const discountPrice = computed(() => {
  const discount =
    basketStore.totalPrice - basketStore.totalPrice * (coupon.discount / 100);
  return discount.toFixed(2);
});

async function getIframe() {
  const { data }: { data: any } = await useApiFetch(
    "/payment/iframeToken/" + type.value,
    {
      method: "POST",
      body: {
        basket: basketStore.products.map((product) => {
          return {
            itemId: product.id,
            type: "course",
          };
        }),
        couponCode: coupon.discount !== 0 ? coupon.code : undefined,
      },
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    }
  );
  if (data.value) {
    iframeToken.value = data.value.token;
  }
}
</script>

<template>
  <WebPageHeader title="ÖDEME" img="/home-contact-banner.jpg" />
  <UContainer
    class="my-32 grid gap-10"
    v-if="address !== '' && firstname !== '' && lastname !== ''"
  >
    <UModal
      v-model="isOpen"
      :ui="{ width: 'w-full sm:max-w-[70rem]', height: 'h-[50rem]' }"
    >
      <div class="p-4">
        <iframe
          :src="`https://www.paytr.com/odeme/${
            type === 'card' ? 'guvenli' : 'api'
          }/${iframeToken}`"
          id="paytriframe"
          class="w-full h-[48rem]"
        />
      </div>
    </UModal>
    <h1 class="text-2xl">
      {{
        products.length > 0 ? "Ürünler" : "Sepetinizde ürün bulunmamaktadır."
      }}
    </h1>
    <div class="grid md:grid-cols-2 gap-5">
      <UCard
        :ui="{ body: { base: 'flex gap-3' } }"
        v-for="product in products"
        :key="product.id"
      >
        <img :src="product.image" alt="product" class="max-w-xs w-full" />
        <div>
          <h1 class="text-xl mb-2">{{ product.name }}</h1>
          <span class="text-gray-500">{{ product.price }}₺</span>
        </div>
      </UCard>
    </div>
    <div class="flex justify-between">
      <h1 class="text-2xl">
        Toplam fiyat <span v-if="coupon.discount !== 0">(İndirimli)</span>
      </h1>
      <h1 class="text-2xl">
        {{ coupon.discount === 0 ? basketStore.totalPrice : discountPrice }}₺
      </h1>
    </div>
    <UButtonGroup size="xl" orientation="horizontal">
      <UInput
        variant="outline"
        class="w-full"
        placeholder="Kupon Kodu"
        v-model="coupon.code"
      />
      <UButton
        label="Onayla"
        @click="controlCouponCode"
        :loading="loading"
        :disabled="coupon.discount !== 0"
      />
    </UButtonGroup>
    <UButtonGroup size="xl" orientation="horizontal">
      <UButton
        label="Banka / Kredi Kartı ile Öde"
        class="w-1/2"
        block
        @click="openModal('card')"
      />
      <UButton
        label="Havale / ETF ile Öde"
        color="blue"
        class="w-1/2"
        block
        @click="openModal('transfer')"
      />
    </UButtonGroup>
  </UContainer>
  <UContainer class="my-32" v-else>
    <p>Ödeme yapabilmeniz için bilgilerinizi tamamlamanız gerekmektedir.</p>
  </UContainer>
</template>
