import { ref } from "vue";
import { db } from "@/js/firebase";
import { doc, setDoc, collection, query, onSnapshot } from "firebase/firestore";
import { defineStore, storeToRefs } from "pinia";
import { useStoreAuth } from "@/store/auth.js";

const selectedPackageStoreId = ref({});
const maxNotesFromPackage = ref(0);

export const useStorePackage = defineStore("storePackage", () => {
  const selectedPackage = async (idP) => {
    const storeAuth = useStoreAuth();
    const { authUser } = storeToRefs(storeAuth);

    let notesCollectionRef = collection(db, "users", authUser.value?.uid, "id");
    let notesCollectionQuery = query(notesCollectionRef);

    let currentDate = new Date().getTime();
    let id = currentDate.toString();
    await setDoc(doc(notesCollectionQuery, id), {
      id: idP,
    });
  };

  const getUserPackageId = async () => {
    const storeAuth = useStoreAuth();
    const { authUser } = storeToRefs(storeAuth);

    const notesCollectionRef = collection(
      db,
      "users",
      authUser.value?.uid,
      "id"
    );
    onSnapshot(notesCollectionRef, (querySnapshot) => {
      let newNote = [];
      querySnapshot.forEach((doc) => {
        let note = {
          id: doc.id,
          idP: doc.data().id,
        };
        newNote.push(note);
      });
      selectedPackageStoreId.value = newNote[newNote.length - 1];
      // check selected package user and update max notes
      if (selectedPackageStoreId.value?.idP === 0) {
        return (maxNotesFromPackage.value = 5);
      } else if (selectedPackageStoreId.value?.idP === 1) {
        return (maxNotesFromPackage.value = 10);
      } else if (selectedPackageStoreId.value?.idP === 2) {
        return (maxNotesFromPackage.value = 20);
      }
    });
  };

  const clearSelectedPackage = () => {
    selectedPackageStoreId.value = maxNotesFromPackage.value = "";
  };

  return {
    selectedPackageStoreId,
    selectedPackage,
    getUserPackageId,
    maxNotesFromPackage,
    clearSelectedPackage,
  };
});
