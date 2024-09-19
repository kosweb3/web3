import { ref } from "vue";
import { defineStore, storeToRefs } from "pinia";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  updateProfile,
} from "firebase/auth";
import { useRouter } from "vue-router";
import { useStoreNotes } from "@/store/notes.js";
import { useStorePackage } from "@/store/package.js";
import { useBaseStore } from "@/store/base.js";
import { useStorePayment } from "@/store/payment.js";
import { useStoreWallet } from "@/store/crypto-payment";

import { auth } from "@/js/firebase";

const authUser = ref("");
const errorUser = ref("");
const userStoreAvatar = ref("");

export const useStoreAuth = defineStore("storeAuth", () => {
  const router = useRouter();

  const initAuth = () => {
    // store to get notes from user
    const storeNotes = useStoreNotes();
    const { init, clearNotes } = storeNotes;

    // store to select Package from user
    const storePackage = useStorePackage();
    const { getUserPackageId, clearSelectedPackage } = storePackage;

    // check payment amount from
    const storePayment = useStorePayment();
    const { getUserSelectedAmount } = storePayment;

    //connectWallet Store
    const connectWallet = useStoreWallet();
    const { disconnectWallet } = connectWallet;

    onAuthStateChanged(auth, (user) => {
      if (user) {
        authUser.value = user;
        init();
        getUserSelectedAmount();
        getUserPackageId();
      } else {
        authUser.value = "";
        clearNotes();
        clearSelectedPackage();
        disconnectWallet();
        // router.replace("/web3/login");
      }
    });
  };

  const registerUser = async (credentials) => {
    // baseStore
    const baseStore = useBaseStore();
    const { loader } = storeToRefs(baseStore);
    try {
      loader.value = true;
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        credentials.email,
        credentials.password
      );
      const user = userCredential.user;

      await updateProfile(user, { photoURL: userStoreAvatar.value });

      router.push("/");
    } catch (error) {
      if (error.message.includes("email-already-in-use")) {
        errorUser.value = "Email already use";
      } else if (error.message.includes("weak-password")) {
        errorUser.value = "The password must contain at least 6 characters";
      }
    } finally {
      loader.value = false;
    }
  };

  const logoutUser = () => {
    signOut(auth)
      .then(() => {
        authUser.value ?? "";
      })
      .catch(() => {
        console.log("logout error");
      });
  };

  const loginUser = (credentials) => {
    // baseStore
    const baseStore = useBaseStore();
    const { loader } = storeToRefs(baseStore);
    loader.value = true;

    signInWithEmailAndPassword(auth, credentials.email, credentials.password)
      .then((userCredential) => {
        router.push("/");
      })
      .catch((error) => {
        errorUser.value = "User not found...";
      })
      .finally(() => {
        loader.value = false;
      });
  };

  return {
    registerUser,
    logoutUser,
    loginUser,
    initAuth,
    authUser,
    errorUser,
    userStoreAvatar,
  };
});
