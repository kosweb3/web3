<template>
  <div class="notes-view">
    <div v-if="loading">Loading...</div>
    <div
      v-else-if="!notesItems.length && !acceptNewNotes"
      class="notes-view__title"
    >
      Add your first note
    </div>

    <template v-else>
      <Note :notesItems="notesItems" :newNoteId="newNoteId" />
    </template>
    <div v-if="acceptNewNotes" class="notes-view__bottom">
      <NewNote
        @close-creating="closeCreating"
        @note-added="handleNoteAdded"
        ref="newNoteRef"
      />
    </div>
    <div class="notes-view__btn">
      <Web3Button v-if="!acceptNewNotes" @click="openNewNote">
        Add New Note
      </Web3Button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, nextTick } from "vue";
import { storeToRefs } from "pinia";
import { useStoreNotes } from "@/store/notes.js";
import Note from "../components/notes/Note.vue";
import NewNote from "../components/notes/newNote.vue";
import Web3Button from "../components/buttons/Web3Button.vue";

const acceptNewNotes = ref(false);
const newNoteId = ref(null);
const newNoteRef = ref(null);

//store Notes
const storeNotes = useStoreNotes();
const { notes, loading } = storeToRefs(storeNotes);

const notesItems = computed(() => {
  return notes.value;
});

const closeCreating = () => {
  acceptNewNotes.value = false;
};

const handleNoteAdded = (noteId) => {
  newNoteId.value = noteId;
  setTimeout(() => {
    newNoteId.value = null; // Reset after a delay
  }, 3000);
};

const scrollToForm = () => {
  const newNoteElement = document.querySelector(".new-notes");
  if (newNoteElement) {
    newNoteElement.scrollIntoView({ behavior: "smooth", block: "start" });
  }
};

const openNewNote = async () => {
  console.log("test");
  acceptNewNotes.value = true;
  await nextTick(); // Wait for the DOM to update
  scrollToForm();
};
</script>

<style lang="scss" scoped></style>
