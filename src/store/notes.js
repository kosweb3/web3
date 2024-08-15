import { ref } from "vue";
import {
  doc,
  setDoc,
  deleteDoc,
  collection,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";
import { defineStore, storeToRefs } from "pinia";
import { db } from "@/js/firebase";
import { useStoreAuth } from "@/store/auth.js";

const notes = ref([]);
const loadingNotes = ref(false);

let notesCollectionRef;
let notesCollectionQuery;

export const useStoreNotes = defineStore("storeNotes", () => {
  const init = () => {
    const storeAuth = useStoreAuth();
    const { authUser } = storeToRefs(storeAuth);

    notesCollectionRef = collection(db, "users", authUser.value?.uid, "notes");
    notesCollectionQuery = query(notesCollectionRef); //orderBy
    getNotes();
  };

  const getNotes = async () => {
    loadingNotes.value = true;
    onSnapshot(notesCollectionQuery, (querySnapshot) => {
      let newNote = [];
      querySnapshot.forEach((doc) => {
        let note = {
          id: doc.id,
          title: doc.data().title,
          content: doc.data().content,
          data: doc.data().data,
          url: doc.data().url,
          // packageId: doc.data().packageId,
        };
        newNote.push(note);
      });
      notes.value = newNote;
      loadingNotes.value = false;
    });
  };

  const clearNotes = () => {
    notes.value = [];
  };

  const addNote = async (newNoteContent) => {
    let currentDate = new Date().getTime();
    let id = currentDate.toString();

    await setDoc(doc(notesCollectionQuery, id), {
      title: newNoteContent.title,
      content: newNoteContent.content,
      data: currentDate,
      url: newNoteContent.url,
    });
    return id;
  };

  const deleteNote = async (idNote) => {
    await deleteDoc(doc(notesCollectionQuery, idNote));
  };

  return {
    init,
    notes,
    clearNotes,
    addNote,
    deleteNote,
    loadingNotes,
  };
});
