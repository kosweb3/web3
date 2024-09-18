import { ref } from "vue";
import { db } from "@/js/firebase";
import {
  doc,
  setDoc,
  collection,
  query,
  onSnapshot,
  getDocs,
  deleteDoc,
} from "firebase/firestore";
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
          amount: doc.data().customer_amount || doc.data().crypto_price,
          crypto: !!doc.data().crypto_signature,
        };
        arr = packageItem;
      });
      amountFromDb.value = arr;
      loadingPackage.value = false;
    });
  };

  const deleteSelectedPackage = async () => {
    const storeAuth = useStoreAuth();
    const { authUser } = storeToRefs(storeAuth);

    const packagesCollectionRef = collection(
      db,
      "users",
      authUser.value?.uid,
      "payments"
    );
    // Get all documents in the collection
    const querySnapshot = await getDocs(packagesCollectionRef);
    // Delete each document in the collection
    const deletePromises = querySnapshot.docs.map((docSnapshot) => {
      return deleteDoc(
        doc(db, "users", authUser.value.uid, "payments", docSnapshot.id)
      );
    });
    amountFromDb.value = [];
    sessionStorage.removeItem("paymentToken");
    sessionStorage.removeItem("signature");

    // Wait for all deletions to complete
    await Promise.all(deletePromises);
  };

  return {
    getUserSelectedAmount,
    deleteSelectedPackage,
    amountFromDb,
    loadingPackage,
  };
});
