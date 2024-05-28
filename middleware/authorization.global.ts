export default defineNuxtRouteMiddleware((to, from) => {
  const { isAuthenticated } = useUserStore();
  const needAuth = [
    "/panel",
    "/panel/kurslar",
    "/panel/etkinlikler",
    "/panel/siparisler",
    "/panel/ayarlar",
    "/payment",
  ];
  const alreadyAuth = ["/giris", "/kaydol"];
  if (needAuth.includes(to.path) && !isAuthenticated) {
    return navigateTo("/giris");
  }
  if (alreadyAuth.includes(to.path) && isAuthenticated) {
    return navigateTo("/");
  }
});
