<template>
  <div class="note">
    <div
      v-for="item in notesItems"
      :key="item.id"
      :class="[
        'note__elem',
        {
          'new-note': item.id === newNoteId,
        },
      ]"
    >
      <div class="note__content">
        <div class="flex note__block">
          <img
            src="https://sh.web3.career/assets/img/web3-companies/metana.jpg"
          />
          <h3 class="note__block--title">{{ item.title }}</h3>
          <span class="note__block--time">{{ formatDate(item.data) }}</span>
        </div>
        <p class="note__block--text">{{ item.content }}</p>
        <div class="flex note__footer">
          <span class="note__footer--info">by Web3 Aggency</span>
          <a class="note__footer--more" href="/">Bootcamp Info</a>
        </div>
        <a
          v-if="item.url"
          :href="item.url"
          class="note__block--url"
          target="_blank"
        >
          {{ item.url }}
        </a>
      </div>
      <div
        class="note__close"
        title="Delete note"
        @click="openModal(item)"
      ></div>
    </div>
    <modal v-if="modalVisible" v-model="modalVisible">
      <template #content>Are you sure to delete this note?</template>
      <template #subcontent>{{ subContent }}</template>
      <template #btn>
        <button @click="closeModal">Cancel</button>
        <button @click="confirmDelete">Confirm</button>
      </template>
    </modal>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useStoreNotes } from "@/store/notes.js";
import { useBaseStore } from "@/store/base.js";
import { useUtils } from "@/composables/useUtils";
import modal from "../modal.vue";

// Notes Store
const storeNotes = useStoreNotes();
const { deleteNote } = storeNotes;

// baseStore
const baseStore = useBaseStore();
const { modalVisible } = storeToRefs(baseStore);

const props = defineProps({
  notesItems: {
    type: Array,
    default: [],
  },
  newNoteId: {
    type: String,
    default: null,
  },
});

const selectedNoteId = ref(null);
const subContent = ref("");

const { formatDate } = useUtils();

const openModal = (item) => {
  selectedNoteId.value = item.id;
  subContent.value = item.title;
  modalVisible.value = true;
};

const closeModal = () => {
  modalVisible.value = false;
};

const confirmDelete = () => {
  deleteNote(selectedNoteId.value);
  modalVisible.value = false;
};
</script>

<style lang="scss" scoped></style>
