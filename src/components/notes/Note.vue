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
            class="note__logo"
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
      <div class="note__menu-content" ref="menu">
        <div @click.stop="toggleActionsMenu(item)">
          <span
            v-if="item.id === selectedNote?.id && noteActionsVisible"
            class="note__close"
          ></span>
          <img
            v-else
            src="../../assets/img/svg/settings.svg"
            class="note__menu-icon"
          />
        </div>
        <Transition>
          <div
            class="note__actions"
            v-if="item.id === selectedNote?.id && noteActionsVisible"
          >
            <div class="note__menu">
              <ActionsNote :selectedNote="selectedNote" />
            </div>
          </div>
        </Transition>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
import { storeToRefs } from "pinia";
import { useStoreNotes } from "@/store/notes.js";
import { useBaseStore } from "@/store/base.js";
import { useUtils } from "@/composables/useUtils";
import ActionsNote from "./actionsNote.vue";

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

const selectedNote = ref(null);
const noteActionsVisible = ref(false);

const { formatDate } = useUtils();

const toggleActionsMenu = (item) => {
  if (selectedNote.value?.id === item.id) {
    noteActionsVisible.value = !noteActionsVisible.value;
    selectedNote.value = null;
  } else {
    selectedNote.value = item;
    noteActionsVisible.value = true;
    modalVisible.value = false;
  }
};

const handleClickOutside = (event) => {
  if (selectedNote.value && !event.target.closest(".note__menu-content")) {
    noteActionsVisible.value = false;
    selectedNote.value = null;
  }
};

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>

<style lang="scss" scoped></style>
