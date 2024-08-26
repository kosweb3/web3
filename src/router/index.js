import { createWebHistory, createRouter } from "vue-router";
import Home from "@/views/HomeView.vue";
import Contact from "@/views/ContactView.vue";
import Login from "@/views/AuthView.vue";
import Notes from "@/views/NotesView.vue";
import Packages from "@/views/PackagesView.vue";
import SuccessPaymentView from "@/views/payment/SuccessPaymentView.vue";
import CancelPaymentView from "@/views/payment/CancelPaymentView.vue";
import { storeToRefs } from "pinia";
import { useStoreAuth } from "@/store/auth.js";

const routes = [
  {
    path: ``,
    name: "Home",
    component: Home,
  },
  {
    path: `/packages`,
    name: "Packages",
    component: Packages,
  },
  {
    path: `/contact`,
    name: "contact",
    component: Contact,
  },
  {
    path: `/login`,
    name: "login",
    component: Login,
    meta: { requiresGuest: true },
  },
  {
    path: `/notes`,
    name: "notes",
    component: Notes,
    meta: { requiresAuth: true }, // Додайте мета-поле для захищених маршруті
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/", // Redirect on home page
  },
  {
    path: `/success-payment`,
    name: "success",
    component: SuccessPaymentView,
  },
  {
    path: `/cancel-payment`,
    name: "cancel",
    component: CancelPaymentView,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// router.beforeEach((to) => {
// ✅ This will work because the router starts its navigation after
// the router is installed and pinia will be installed too
//   const storeAuth = useStoreAuth();
//   const { authUser } = storeToRefs(storeAuth);

//   if (to.meta.requiresAuth && !authUser.value) return "/login`";
// });

// Глобальний охоронець маршруту
// router.beforeEach(async (to, from, next) => {
// Отримайте доступ до вашого Pinia store
// const storeAuth = useStoreAuth();
// const { authUser} = storeToRefs(storeAuth);

// Важливо: використовуйте Promise.all для отримання даних
// await Promise.all([authUser]);
// if (to.meta.requiresAuth && !authUser.value) {
//   console.log("якщо користувач не авторизований");
//   next(`/login`);
// } else {
//   console.log("якщо авторизований");
//   next();
// }
// });

export default router;
