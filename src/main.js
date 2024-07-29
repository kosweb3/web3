import { createApp } from "vue";
import { createPinia } from "pinia";
import "./assets/index.scss";
import { plugin, defaultConfig } from "@formkit/vue";

import App from "./App.vue";

import router from "@/router";

const pinia = createPinia();
const app = createApp(App);

app.use(pinia);
app.use(plugin, defaultConfig);
app.use(router);

app.mount("#app");
