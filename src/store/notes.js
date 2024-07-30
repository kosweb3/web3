import { ref } from "vue";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { defineStore, storeToRefs } from "pinia";
import { db } from "@/js/firebase";
import { useStoreAuth } from "@/store/auth.js";

const notes = ref([]);

let notesCollectionRef;
let notesCollectionQuery;

export const useStoreNotes = defineStore("storeNotes", () => {
  const init = () => {
    const storeAuth = useStoreAuth();
    const { authUser } = storeToRefs(storeAuth);

    notesCollectionRef = collection(db, "users", authUser.value?.uid, "notes");
    notesCollectionQuery = query(notesCollectionRef);
    getNotes();
  };

  const getNotes = async () => {
    onSnapshot(notesCollectionQuery, (querySnapshot) => {
      let newNote = [];
      querySnapshot.forEach((doc) => {
        let note = {
          id: doc.id,
          content: doc.data().content,
          date: doc.data().date,
        };
        console.log("note", note);
        newNote.push(note);
      });
      notes.value.push(newNote);
    });
  };

  const clearNotes = () => {
    notes.value = [];
  };

  return { init, notes, clearNotes };
});
