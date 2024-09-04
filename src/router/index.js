import { createWebHistory, createRouter } from "vue-router";
import Home from "@/views/HomeView.vue";
import Contact from "@/views/ContactView.vue";
import Login from "@/views/AuthView.vue";
import Notes from "@/views/NotesView.vue";
import Packages from "@/views/PackagesView.vue";
import SuccessPaymentView from "@/views/payment/SuccessPaymentView.vue";
import CancelPaymentView from "@/views/payment/CancelPaymentView.vue";
// store
import { storeToRefs } from "pinia";
import { useStoreAuth } from "@/store/auth.js";

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../js/firebase";

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
  // {
  //   path: `/crypto-price`,
  //   name: "crypto",
  //   component: CoinTracker,
  //   meta: { requiresGuest: true },
  // },
  {
    path: `/notes`,
    name: "notes",
    component: Notes,
    meta: { requiresAuth: true },
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/",
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

// check for authentication
router.beforeEach((to, from, next) => {
  const storeAuth = useStoreAuth();
  const { authUser } = storeToRefs(storeAuth);

  // If user already login
  if (authUser.value) {
    if (to.meta.requiresGuest) {
      next({ name: "Home" });
    } else {
      next();
    }
  } else {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        authUser.value = user; // Update state
        if (to.meta.requiresGuest) {
          next({ name: "Home" });
        } else {
          next();
        }
      } else {
        if (to.meta.requiresAuth) {
          next({ name: "login" });
        } else {
          next();
        }
      }
    });
  }
});
export default router;
