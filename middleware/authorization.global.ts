export default defineNuxtRouteMiddleware((to, from) => {
  const { isAuthenticated } = useUserStore();
  const needAuth = [
    "/dashboard",
    "/dashboard/courses",
    "/dashboard/events",
    "/dashboard/orders",
    "/dashboard/settings",
    "/online-form",
    "/payment",
  ];
  const alreadyAuth = ["/login", "/register"];
  if (needAuth.includes(to.path) && !isAuthenticated) {
    return navigateTo("/login");
  }
  if (alreadyAuth.includes(to.path) && isAuthenticated) {
    return navigateTo("/");
  }
});
