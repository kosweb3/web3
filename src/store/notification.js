import { ref } from "vue";
import { defineStore } from "pinia";

export const useNotificationStore = defineStore("notification", () => {
  const notificationContent = ref("");

  const startNofification = (text) => {
    notificationContent.value = text;
    setTimeout(() => {
      notificationContent.value = "";
    }, 3000);
  };

  return { notificationContent, startNofification };
});
