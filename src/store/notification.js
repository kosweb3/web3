import { ref } from "vue";
import { defineStore } from "pinia";

export const useNotificationStore = defineStore("notification", () => {
  const notificationContent = ref("");
  const notificationType = ref("");

  const startNofification = (text, type) => {
    notificationContent.value = text;
    notificationType.value = type;
    setTimeout(() => {
      notificationContent.value = "";
    }, 3000);
  };

  return { notificationContent, notificationType, startNofification };
});
