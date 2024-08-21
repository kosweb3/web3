import { ref } from "vue";
import { db } from "@/js/firebase";
import { doc, setDoc, collection, query, onSnapshot } from "firebase/firestore";
import { defineStore, storeToRefs } from "pinia";
import { useStoreAuth } from "@/store/auth.js";

const loadingPackage = ref(true);
const amountFromDb = ref({});

export const useStorePayment = defineStore("storePayment", () => {
  const getUserSelectedAmount = async () => {
    loadingPackage.value = true;
    const storeAuth = useStoreAuth();
    const { authUser } = storeToRefs(storeAuth);

    const packagesCollectionRef = collection(
      db,
      "users",
      authUser.value?.uid,
      "payments"
    );

    onSnapshot(packagesCollectionRef, (querySnapshot) => {
      let arr = {};
      querySnapshot.forEach((doc) => {
        let packageItem = {
          id: doc.id,
          amount: doc.data().amount_total,
        };
        arr = packageItem;
      });
      amountFromDb.value = arr;
      loadingPackage.value = false;
    });
  };

  return {
    getUserSelectedAmount,
    amountFromDb,
    loadingPackage,
  };
});
