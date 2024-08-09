<template>
  <div class="notes-view">
    <div v-if="loading">Loading...</div>
    <template v-else>
      <div class="notes-view__container">
        <div v-for="item in notesItems" :key="item.id" class="notes-view__card">
          <div class="card">
            <div class="flex card__block">
              <img
                src="https://sh.web3.career/assets/img/web3-companies/metana.jpg"
              />
              <h3>{{ item.title }}</h3>
            </div>
            <p class="card__block-text">{{ item.content }}</p>
            <div class="flex card__footer">
              <span class="card__footer--info">by Web3 Aggency</span>
              <a class="card__footer--more" href="/">Bootcamp Info</a>
            </div>
          </div>
        </div>
      </div>
      <div class="notes-view__bottom">
        <div v-if="acceptNewNotes">
          <NewNotes @close-creating="closeCreating" />
        </div>
        <Web3Button v-if="!acceptNewNotes" @click="acceptNewNotes = true">
          Add New Note
        </Web3Button>
      </div>
    </template>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { storeToRefs } from "pinia";
import { useStoreNotes } from "@/store/notes.js";
import NewNotes from "../components/notes/newNotes.vue";
import Web3Button from "../components/buttons/Web3Button.vue";

const acceptNewNotes = ref(false);
//store Notes
const storeNotes = useStoreNotes();
const { notes, loading } = storeToRefs(storeNotes);

const notesItems = computed(() => {
  return notes.value[notes.value.length - 1];
});

const closeCreating = () => {
  acceptNewNotes.value = false;
};
</script>

<style lang="scss" scoped></style>
