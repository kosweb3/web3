import { ref } from "vue";
import { db } from "@/js/firebase";
import {
  doc,
  setDoc,
  getDocs,
  deleteDoc,
  collection,
  query,
  onSnapshot,
} from "firebase/firestore";
import { defineStore, storeToRefs } from "pinia";
import { useStoreAuth } from "@/store/auth.js";
import { useStoreNotes } from "@/store/notes.js";

const selectedPackageStoreId = ref({});
const maxNotesFromPackage = ref(0);
const loadingPackage = ref(true);
const packages = ref([
  {
    name: "Package Easy",
    price: "1$",
    stripePriceID: "price_1PoRPHRqf53S8zO6gSmWh23Z",
    id: 0,
    benefits: ["5 notes", "1 website", "add more"],
  },
  {
    name: "Package Standart",
    price: "2$",
    stripePriceID: "price_1PoRPeRqf53S8zO6J4ZBqylt",
    id: 1,
    benefits: ["10 project notes", "2 websites", "add more"],
  },
  {
    name: "Package Pro",
    price: "3$",
    stripePriceID: "price_1PoRQ4Rqf53S8zO63arxs2rh",
    id: 2,
    benefits: ["20 project notes", "3 websites", "Support 24/7", "and more"],
  },
]);
const selectedPackageObject = ref({});

export const useStorePackage = defineStore("storePackage", () => {
  const selectedPackage = async (idP) => {
    loadingPackage.value = true;
    const storeAuth = useStoreAuth();
    const { authUser } = storeToRefs(storeAuth);

    //store Notes
    const storeNotes = useStoreNotes();
    const { init } = storeNotes;

    let packagesCollectionRef = collection(
      db,
      "users",
      authUser.value?.uid,
      "id"
    );
    let packageCollectionQuery = query(packagesCollectionRef);

    let currentDate = new Date().getTime();
    let id = currentDate.toString();
    await setDoc(doc(packageCollectionQuery, id), {
      id: idP,
    });
    init();
    loadingPackage.value = false;
  };

  const getUserPackageId = async () => {
    loadingPackage.value = true;
    const storeAuth = useStoreAuth();
    const { authUser } = storeToRefs(storeAuth);

    const packagesCollectionRef = collection(
      db,
      "users",
      authUser.value?.uid,
      "id"
    );
    onSnapshot(packagesCollectionRef, (querySnapshot) => {
      let newPackage = [];
      querySnapshot.forEach((doc) => {
        let packageItem = {
          id: doc.id,
          idP: doc.data().id,
        };
        newPackage.push(packageItem);
      });
      selectedPackageStoreId.value = newPackage[newPackage.length - 1];
      // check selected package user and update max notes
      if (selectedPackageStoreId.value?.idP === 0) {
        selectedPackageObject.value = packages.value[0];
        maxNotesFromPackage.value = 5;
      } else if (selectedPackageStoreId.value?.idP === 1) {
        selectedPackageObject.value = packages.value[1];
        maxNotesFromPackage.value = 10;
      } else if (selectedPackageStoreId.value?.idP === 2) {
        selectedPackageObject.value = packages.value[2];
        maxNotesFromPackage.value = 20;
      }
      loadingPackage.value = false;
    });
  };

  const clearSelectedPackage = () => {
    selectedPackageStoreId.value = "";
    maxNotesFromPackage.value = "";
    selectedPackageObject.value = "";
  };

  const deleteSelectedPackage = async () => {
    const storeAuth = useStoreAuth();
    const { authUser } = storeToRefs(storeAuth);

    //store Notes
    const storeNotes = useStoreNotes();
    const { notes } = storeToRefs(storeNotes);

    let packagesCollectionRef = collection(
      db,
      "users",
      authUser.value?.uid,
      "id"
    );

    // Get all documents in the collection
    const querySnapshot = await getDocs(packagesCollectionRef);

    // Delete each document in the collection
    const deletePromises = querySnapshot.docs.map((docSnapshot) => {
      return deleteDoc(
        doc(db, "users", authUser.value.uid, "id", docSnapshot.id)
      );
    });
    notes.value = [];

    // Wait for all deletions to complete
    await Promise.all(deletePromises);
  };

  return {
    selectedPackageStoreId,
    selectedPackage,
    getUserPackageId,
    maxNotesFromPackage,
    clearSelectedPackage,
    selectedPackageObject,
    packages,
    loadingPackage,
    deleteSelectedPackage,
  };
});
