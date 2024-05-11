import { defineStore } from "pinia";
import type { User } from "~/types";

export const useUserStore = defineStore({
  id: "user",
  persist: true,
  state: () => {
    return {
      id: "",
      firstname: "",
      lastname: "",
      email: "",
      phoneNumber: "",
      address: "",
      diploma: false,
      jwt: "",
      tcIdentificationNumber: "",
      title: "",
    } as User;
  },
  actions: {
    async login(jwt: string, user: User) {
      Object.assign(this, {
        id: user.id,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        phoneNumber: user.phoneNumber,
        address: user.address,
        diploma: user.diploma,
        jwt,
        tcIdentificationNumber: user.tcIdentificationNumber,
        title: user.title,
      } as User);
      await navigateTo("/");
    },
    async logout() {
      Object.assign(this, {
        id: "",
        firstname: "",
        lastname: "",
        email: "",
        phoneNumber: "",
        address: "",
        diploma: false,
        jwt: "",
        tcIdentificationNumber: "",
        title: "",
      });
      await navigateTo("/");
    },
  },
  getters: {
    isAuthenticated(): boolean {
      return !!this.jwt;
    },
  },
});
