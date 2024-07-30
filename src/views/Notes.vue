<template>
  <div class="notes-view">
    <div v-for="item in notesItems" :key="item.id" class="notes-view__card">
      <div class="card">
        <div class="flex card__block">
          <img
            src="https://sh.web3.career/assets/img/web3-companies/metana.jpg"
          />
          <h3>{{ item.content }}</h3>
        </div>
        <p class="card__block-text">
          Learn job-ready web3 skills on your schedule with 1-on-1 support & get
          a job, or your money back.
        </p>
        <div class="flex card__footer">
          <span class="card__footer--info">by Web3 Aggency</span>
          <a class="card__footer--more" href="/">Bootcamp Info</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { storeToRefs } from "pinia";
import { useStoreNotes } from "@/store/notes.js";

//store Notes
const storeNotes = useStoreNotes();
const { notes } = storeToRefs(storeNotes);

const notesItems = computed(() => {
  return notes.value[0];
});
</script>

<style lang="scss" scoped></style>
