import { createWebHistory, createRouter } from "vue-router";
import Home from "@/views/Home.vue";
import Contact from "@/views/Contact.vue";
import Login from "@/views/Auth.vue";
import Notes from "@/views/Notes.vue";
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
    path: `${GHP}/contact`,
    name: "contact",
    component: Contact,
  },
  {
    path: `${GHP}/login`,
    name: "login",
    component: Login,
  },
  {
    path: `${GHP}/notes`,
    name: "notes",
    component: Notes,
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: GHP, // Перенаправляємо на головну сторінку
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
