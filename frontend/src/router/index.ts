import { createRouter, createWebHistory } from "@ionic/vue-router";
import { RouteRecordRaw } from "vue-router";
import TabsPage from "@Pages/TabsPage.vue";
import { useAuth } from "@/composables/useAuth";
import { Storage } from "@/services/storage";
import { authFlow } from "@/services/spotify-api";

const requiresAuth = { requiresAuth: true };
const routes: Array<RouteRecordRaw> = [
  {
    path: "/login",
    component: () => import("@Pages/LoginPage.vue")
  },
  {
    path: "/",
    redirect: "/home"
  },
  {
    path: "/callback",
    component: () => import("@Pages/CallbackPage.vue"),
  },
  {
    path: "/home",
    redirect: "/tabs/tab1",
    meta: requiresAuth,
  },
  {
    path: "/tabs/",
    component: TabsPage,
    children: [
      {
        path: "",
        redirect: "/tabs/tab2",
        meta: requiresAuth,
      },
      {
        path: "tab1",
        component: () => import("@Pages/Tab1Page.vue"),
        meta: requiresAuth,
      },
      {
        path: "tab2",
        component: () => import("@Pages/Tab2Page.vue"),
        meta: requiresAuth,
      },
      {
        path: "tab3",
        component: () => import("@Pages/Tab3Page.vue"),
        meta: requiresAuth,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach(async (to, from) => {
  const auth = useAuth();
  const inAuthFlow = await Storage.get("auth-flow") as unknown as boolean;

  if (!auth.authReady.value) {
    return true;
  }

  if (to.meta.requiresAuth && !auth.user.value) {
    return '/login';
  }

  if (to.path === '/login' && auth.user.value) {
    return '/home';
  }

  if (to.path === '/callback' && !inAuthFlow) {
    return '/home';
  }

  return true;
});



export default router;
