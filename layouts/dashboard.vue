<script setup lang="ts">
const { jwt } = useUserStore();
const { data }: { data: any } = await useApiFetch("/users/me", {
  headers: {
    Authorization: `Bearer ${jwt}`,
  },
});
const { data: orders }: { data: any } = await useApiFetch("/user/order", {
  headers: {
    Authorization: `Bearer ${jwt}`,
  },
});
data.value.orders = orders?.value?.orders;
useState("userData", () => data.value);
</script>

<template>
  <section class="min-h-screen w-full grid lg:p-5">
    <UCard
      class="h-full shadow-[0_0px_40px_0px_rgba(0,0,0,0.15)]"
      :ui="{ body: { base: 'flex' }, rounded: 'rounded-none lg:rounded-xl' }"
    >
      <DashboardNavbar />
      <main class="w-full lg:py-3 lg:pl-7 lg:pr-3">
        <DashboardHeader />
        <slot />
      </main>
    </UCard>
  </section>
</template>
