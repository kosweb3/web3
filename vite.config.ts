import { defineConfig } from "vite";
import { resolve } from "path";
import vue from "@vitejs/plugin-vue";
import { defineConfig as defineVitestConfig } from "vitest/config";
import { visualizer } from "rollup-plugin-visualizer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // visualizer({
    //   filename: "./dist/stats.html", // Файл для аналізу бандла
    //   open: true, // Відкриває браузер після збірки
    // }),
  ],
  base: "",
  test: {
    globals: true,
    environment: "jsdom",
  },
  // base: "/web3",
  resolve: {
    alias: [{ find: "@", replacement: resolve(__dirname, "./src") }],
  },
  // build: {
  //   rollupOptions: {
  //     output: {
  //       manualChunks(id) {
  //         // Розділяє великі бібліотеки на окремі чунки
  //         if (id.includes("node_modules")) {
  //           return id
  //             .toString()
  //             .split("node_modules/")[1]
  //             .split("/")[0]
  //             .toString();
  //         }
  //       },
  //     },
  //   },
  //   chunkSizeWarningLimit: 500, // Це налаштування змінює поріг попередження про розмір чунка
  // },
});
