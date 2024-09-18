<template>
  <div class="notes-view container">
    <div v-if="loadingNotes || isFiltering"><Loader /></div>
    <div v-else>
      <div v-if="!checkAmountInDb" class="notes-view__title">
        <p class="notes-view__title--additional">
          Please select your package first
        </p>
        <router-link to="/packages">
          <Web3Button>Select your package </Web3Button>
        </router-link>
      </div>
      <div
        v-if="!loadingNotes && !notesItems.length && checkAmountInDb"
        class="notes-view__title"
      >
        Add your first note
      </div>
      <h3
        v-if="checkAmountInDb && notesItems.length"
        class="notes-view__package-info"
      >
        Max note from your package:
        {{ maxNotesFromPackage }}
      </h3>

      <div class="notes-view__sort" v-if="notes.length && checkAmountInDb">
        <FormKit
          type="select"
          label="Sorted by:"
          name="sorted"
          v-model="sortedBy"
          :options="['All', 'Private Note', 'Website Note']"
          prefix-icon="info"
        />
      </div>
      <template v-if="notesItems.length && checkAmountInDb">
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
          v-if="!acceptNewNotes && checkAmountInDb"
          @click="openNewNote"
          :disabledButton="checkDisabledButton"
          :title="`In your package you have max ${maxNotesFromPackage} notes. Please upgrade your package to add more.`"
        >
          Add New Note
        </Web3Button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, nextTick, onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useStoreNotes } from "@/store/notes.js";
import { useStorePackage } from "@/store/package.js";
import { useStorePayment } from "@/store/payment.js";
import Note from "../components/notes/Note.vue";
import NewNote from "../components/notes/newNote.vue";
import Web3Button from "../components/buttons/Web3Button.vue";
import Loader from "@/components/loader.vue";

const acceptNewNotes = ref(false);
const newNoteId = ref(null);
const newNoteRef = ref(null);
const sortedBy = ref("All");
const isFiltering = ref(false);

//store Notes
const storeNotes = useStoreNotes();
const { notes, loadingNotes, maxNotes } = storeToRefs(storeNotes);

//store package
const store = useStorePackage();
const { maxNotesFromPackage, selectedPackageObject } = storeToRefs(store);

// paymentStore
const paymentStore = useStorePayment();
const { amountFromDb } = storeToRefs(paymentStore);

const notesItems = computed(() => {
  if (sortedBy.value === "All") {
    return notes.value;
  } else {
    return notes.value.filter((note) => note.topic === sortedBy.value);
  }
});

watch(
  () => sortedBy.value,
  (newFilter) => {
    localStorage.setItem("sortedBy", newFilter);
  }
);

const originNotesLength = computed(() => {
  return notes.value.length;
});

const checkDisabledButton = computed(() => {
  return originNotesLength.value >= maxNotesFromPackage.value;
});

const closeCreating = () => {
  acceptNewNotes.value = false;
};

const checkAmountInDb = computed(() => {
  return amountFromDb.value.amount ?? false;
});

const scrollToForm = () => {
  const newNoteElement = document.querySelector(".new-notes");
  if (newNoteElement) {
    newNoteElement.scrollIntoView({ behavior: "smooth", block: "start" });
  }
};

const handleNoteAdded = (noteId) => {
  newNoteId.value = noteId;
  setTimeout(() => {
    newNoteId.value = null;
  }, 5000);
};

const openNewNote = async () => {
  acceptNewNotes.value = true;
  await nextTick();
  scrollToForm();
};

onMounted(() => {
  const savedSortedBy = localStorage.getItem("sortedBy");
  if (savedSortedBy) {
    sortedBy.value = savedSortedBy;
  }
});
</script>

<style lang="scss" scoped></style>
