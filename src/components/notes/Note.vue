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
        @click="deleteNote(item.id)"
      ></div>
    </div>
  </div>
</template>

<script setup>
import { useUtils } from "../../composables/useUtils";
import { useStoreNotes } from "@/store/notes.js";

const storeNotes = useStoreNotes();
const { deleteNote } = storeNotes;

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

const { formatDate } = useUtils();
</script>

<style lang="scss" scoped></style>
