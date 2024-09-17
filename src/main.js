import { createApp, markRaw } from "vue";
import router from "@/router";
import { createPinia } from "pinia";
import "./assets/index.scss";
import { plugin, defaultConfig } from "@formkit/vue";
import App from "./App.vue";
import { Skeletor } from "vue-skeletor";

const pinia = createPinia();
pinia.use(({ store }) => {
  store.router = markRaw(router);
});

createApp(App)
  .use(router)
  .use(pinia)
  .use(plugin, defaultConfig)
  .component("Skeletor", Skeletor)
  .mount("#app");
