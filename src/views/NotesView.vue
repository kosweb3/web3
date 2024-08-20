<template>
  <div class="notes-view">
    <div v-if="loadingNotes"><Loader /></div>

    <div v-else>
      <!-- if packege not selected -->
      <div v-if="!selectedPackageStoreId" class="notes-view__title">
        <p class="notes-view__title--additional">
          Please select your package first
        </p>
        <router-link :to="`${ghp}/packages`">
          <Web3Button>Select your package </Web3Button>
        </router-link>
      </div>
      <!-- if package selected but notes are empty -->
      <div
        v-else-if="!loadingNotes && !notesItems.length && !acceptNewNotes"
        class="notes-view__title"
      >
        Add your first note
      </div>

      <template v-else>
        <h3 class="notes-view__package-info">
          Max note from your package:
          {{ maxNotesFromPackage }}
        </h3>

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
        <Web3Button
          v-if="!acceptNewNotes && selectedPackageStoreId"
          @click="openNewNote"
          :disabled="checkDisabledButton"
          :title="`In your package you have max ${maxNotesFromPackage} notes. Please upgrade your package to add more.`"
        >
          Add New Note
        </Web3Button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, nextTick } from "vue";
import { storeToRefs } from "pinia";
import { useStoreNotes } from "@/store/notes.js";
import { useStorePackage } from "@/store/package.js";
import Note from "../components/notes/Note.vue";
import NewNote from "../components/notes/newNote.vue";
import Web3Button from "../components/buttons/Web3Button.vue";
import Loader from "@/components/loader.vue";

const ghp = ref(import.meta.env.VITE_GHP);

const acceptNewNotes = ref(false);
const newNoteId = ref(null);
const newNoteRef = ref(null);

//store Notes
const storeNotes = useStoreNotes();
const { notes, loadingNotes, maxNotes } = storeToRefs(storeNotes);

//store package
const store = useStorePackage();
const { maxNotesFromPackage, selectedPackageStoreId } = storeToRefs(store);

const notesItems = computed(() => {
  return notes.value;
});

const checkDisabledButton = computed(() => {
  return notesItems.value.length >= maxNotesFromPackage.value;
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
  acceptNewNotes.value = true;
  await nextTick(); // Wait for the DOM to update
  scrollToForm();
};
</script>

<style lang="scss" scoped></style>
