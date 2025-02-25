export default defineNuxtRouteMiddleware(async (to, from) => {
  const { $supabase } = useNuxtApp();
  try {
    if (!$supabase) {
      return;
    }

    const {
      data: { session },
      error,
    } = await $supabase.auth.getSession();
    const token = session?.access_token;

    if (token && to.path === "/login") {
      return navigateTo("/");
    }

    if (!token && to.path !== "/login") {
      return navigateTo("/login");
    }
  } catch (error) {
    console.log("Error getting session:", error);
  }
});
