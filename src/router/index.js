import { createWebHistory, createRouter } from "vue-router";
import Home from "@/views/Home.vue";
import Contact from "@/views/Contact.vue";
import Login from "@/views/Auth.vue";
import Notes from "@/views/Notes.vue";
import Packages from "@/views/Packages.vue";
import { storeToRefs } from "pinia";
import { useStoreAuth } from "@/store/auth.js";

const GHP = import.meta.env.VITE_GHP;

const routes = [
  {
    path: `${GHP}`,
    name: "Home",
    component: Home,
  },
  {
    path: `${GHP}/packages`,
    name: "Packages",
    component: Packages,
  },
  {
    path: `${GHP}/contact`,
    name: "contact",
    component: Contact,
  },
  {
    path: `${GHP}/login`,
    name: "login",
    component: Login,
    meta: { requiresGuest: true },
  },
  {
    path: `${GHP}/notes`,
    name: "notes",
    component: Notes,
    meta: { requiresAuth: true }, // Додайте мета-поле для захищених маршруті
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: GHP, // Redirect on home page
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

//   if (to.meta.requiresAuth && !authUser.value) return "${GHP}/login`";
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
//   next(`${GHP}/login`);
// } else {
//   console.log("якщо авторизований");
//   next();
// }
// });

export default router;
