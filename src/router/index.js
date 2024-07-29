import { createWebHistory, createRouter } from "vue-router";
import Home from "@/views/Home.vue";
import Contact from "@/views/Contact.vue";

const GHP = import.meta.env.VITE_GHP;

const routes = [
  {
    path: `${GHP}`,
    name: "Home",
    component: Home,
  },
  {
    path: `${GHP}/contact`,
    name: "contact",
    component: Contact,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
