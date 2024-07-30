import { collection, getDocs } from "firebase/firestore";
import { defineStore, storeToRefs } from "pinia";
import { db } from "@/js/firebase";
import { useStoreAuth } from "@/store/auth.js";
import { notes } from "./notes";

export const useStoreNotes = defineStore("storeNotes", () => {
  const init = () => {
    const storeAuth = useStoreAuth();
    const { authUser } = storeToRefs(storeAuth);
    console.log("authUser ID ID", authUser.value?.uid);
    getNotes();
  };
  const getNotes = async () => {
    console.log("getNotes");

    const querySnapshot = await getDocs(
      collection(db, "users", "8CrrJbLKX6X5WmV2UpYkPsbVo8d2", "notes")
    );
    querySnapshot.forEach((doc) => {
      let note = {
        id: doc.id,
        content: doc.data().content,
      };
      console.log("note", note);
      notes.value.push(note);
    });
  };
  //   const clearNotes = () => {};
  return { init, notes };
});
