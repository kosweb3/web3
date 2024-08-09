import { ref } from "vue";
import { defineStore } from "pinia";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { useRouter } from "vue-router";
import { useStoreNotes } from "@/store/notes.js";

import { auth } from "@/js/firebase";

const authUser = ref();
const errorUser = ref();
const loading = ref(true);

export const useStoreAuth = defineStore("storeAuth", () => {
  const router = useRouter();

  const initAuth = () => {
    const storeNotes = useStoreNotes();
    const { init, clearNotes } = storeNotes;
    onAuthStateChanged(auth, (user) => {
      if (user) {
        authUser.value = user;
        init();
      } else {
        authUser.value = "";
        clearNotes();
        // router.replace("/web3/login");
      }
      loading.value = false;
    });
  };

  const registerUser = (credentials) => {
    console.log(credentials);
    createUserWithEmailAndPassword(
      auth,
      credentials.email,
      credentials.password
    )
      .then((userCredential) => {
        router.push("/web3");
        // const user = userCredential.user;
      })
      .catch((error) => {
        if (error.message.includes("email-already-in-use")) {
          errorUser.value = "Email already use";
        } else if (error.message.includes("weak-password")) {
          errorUser.value = "The password must contain at least 6 characters";
        }
      });
  };

  const logoutUser = () => {
    signOut(auth)
      .then(() => {
        authUser.value = "";
      })
      .catch(() => {
        console.log("logout error");
      });
  };

  const loginUser = (credentials) => {
    signInWithEmailAndPassword(auth, credentials.email, credentials.password)
      .then((userCredential) => {
        router.push("/web3");
      })
      .catch((error) => {
        errorUser.value = "User not found...";
      });
  };

  return { registerUser, logoutUser, loginUser, initAuth, authUser, errorUser };
});
