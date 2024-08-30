import { ref } from "vue";
import { db } from "@/js/firebase";
import {
  doc,
  setDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  collection,
  query,
  onSnapshot,
} from "firebase/firestore";
import { defineStore, storeToRefs } from "pinia";
import { useStoreAuth } from "@/store/auth.js";
import { useStoreNotes } from "@/store/notes.js";
import { useStorePayment } from "@/store/payment.js";

const selectedPackageObject = ref({});
const maxNotesFromPackage = ref(0);
const loadingPackage = ref(true);
const packages = ref([
  {
    name: "Package Easy",
    price: "99$",
    stripePriceID: "price_1Pt8CvRqf53S8zO6n8eqLt8B",
    id: 0,
    benefits: ["5 notes", "1 website", "add more"],
  },
  {
    name: "Package Standart",
    price: "199$",
    stripePriceID: "price_1Pt8DLRqf53S8zO6g9x5PAIY",
    id: 1,
    benefits: ["10 project notes", "2 websites", "add more"],
  },
  {
    name: "Package Pro",
    price: "299$",
    stripePriceID: "price_1Pt8DmRqf53S8zO6LkdGJ9VU",
    id: 2,
    benefits: ["20 project notes", "3 websites", "Support 24/7", "and more"],
  },
]);

const packageAmountOne = ref(9900);
const packageAmountTwo = ref(19900);
const packageAmountThree = ref(29900);

export const useStorePackage = defineStore("storePackage", () => {
  const selectedPackage = async (idPackage) => {
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
    const querySnapshot = await getDocs(packageCollectionQuery);

    if (!querySnapshot.empty) {
      const docRef = querySnapshot.docs[0].ref;
      await updateDoc(docRef, {
        id: idPackage,
      });
    } else {
      let currentDate = new Date().getTime();
      let id = currentDate.toString();
      await setDoc(doc(packageCollectionQuery, id), {
        id: idPackage,
      });
    }
    init();
    loadingPackage.value = false;
  };

  const getUserPackageId = async () => {
    loadingPackage.value = true;
    const storeAuth = useStoreAuth();
    const { authUser } = storeToRefs(storeAuth);

    // paymentStore
    const paymentStore = useStorePayment();
    const { amountFromDb } = storeToRefs(paymentStore);

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
          idPackage: doc.data().id,
        };
        newPackage.push(packageItem);
      });

      // check selected package user and update max notes
      if (amountFromDb.value?.amount) {
        if (amountFromDb.value?.amount === packageAmountOne.value) {
          changeSelectedPackage(0);
        } else if (amountFromDb.value?.amount === packageAmountTwo.value) {
          changeSelectedPackage(1);
        } else if (amountFromDb.value?.amount === packageAmountThree.value) {
          changeSelectedPackage(2);
        }
      } else {
        selectedPackageObject.value = newPackage[newPackage.length - 1];
        if (selectedPackageObject.value?.idPackage === 0) {
          changeSelectedPackage(0);
        } else if (selectedPackageObject.value?.idPackage === 1) {
          changeSelectedPackage(1);
        } else if (selectedPackageObject.value?.idPackage === 2) {
          changeSelectedPackage(2);
        }
      }
      loadingPackage.value = false;
    });
  };

  const changeSelectedPackage = (id) => {
    id === 0
      ? (maxNotesFromPackage.value = 5)
      : id === 1
      ? (maxNotesFromPackage.value = 10)
      : id === 2
      ? (maxNotesFromPackage.value = 20)
      : null;
    return (selectedPackageObject.value = packages.value[id]);
  };

  const clearSelectedPackage = () => {
    selectedPackageObject.value = "";
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
    selectedPackageObject,
    selectedPackage,
    getUserPackageId,
    maxNotesFromPackage,
    clearSelectedPackage,
    selectedPackageObject,
    packages,
    loadingPackage,
    deleteSelectedPackage,
    packageAmountOne,
    packageAmountTwo,
    packageAmountThree,
  };
});
