import type { ProductProps } from "~/types";
import { defineStore } from "pinia";

export const useBasketStore = defineStore({
  id: "basket",
  persist: true,
  state: () =>
    ({ products: [] } as {
      products: ProductProps[];
    }),
  actions: {
    addProduct(product: ProductProps) {
      this.products.push(product);
    },
    removeProduct(id: number) {
      this.products = this.products.filter((product) => product.id !== id);
    },
  },
  getters: {
    totalPrice(): number {
      return this.products.reduce((acc, product) => acc + product.price, 0);
    },
    alreadyAdded: (state) => {
      return (productId: number) =>
        state.products.some((product) => product.id === productId);
    },
  },
});
