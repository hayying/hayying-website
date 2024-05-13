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
data.value.orders = orders.value.orders;
console.log(data.value);
useState("userData", () => data.value);
</script>

<template>
  <DashboardHeader />
  <div class="flex items-start">
    <DashboardNavbar />
    <main class="p-5 w-full">
      <slot />
    </main>
  </div>
</template>
