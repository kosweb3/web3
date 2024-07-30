import { createApp, markRaw } from "vue";
import { createPinia } from "pinia";
import "./assets/index.scss";
import { plugin, defaultConfig } from "@formkit/vue";
import App from "./App.vue";
import router from "@/router";

const pinia = createPinia();
pinia.use(({ store }) => {
  store.router = markRaw(router);
});

createApp(App).use(pinia).use(plugin, defaultConfig).use(router).mount("#app");
