<template>
  <div class="new-notes">
    <FormKit id="myElement" type="form" @submit="handleCreateNote">
      <FormKit
        type="text"
        label="Title new note"
        name="data.title"
        v-model="data.title"
        placeholder="Enter your title"
        validation="required"
      />
      <FormKit
        type="text"
        label="Content new note"
        name="data.content"
        v-model="data.content"
        placeholder="Enter your content"
        validation="required"
      />
      <div class="new-notes__buttons">
        <button @click="closeCreating">Cancel</button>
        <FormKit type="submit" class="test">
          <span>Create New Note</span>
        </FormKit>
      </div>
    </FormKit>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useStoreNotes } from "@/store/notes.js";
import Web3Button from "../buttons/Web3Button.vue";

const data = ref({
  title: "",
  content: "",
});

const storeNotes = useStoreNotes();

const handleCreateNote = async () => {
  if (data.value.title && data.value.content) {
    storeNotes.addNote(data.value);
    data.value.title = data.value.content = "";
    closeCreating();
  }
};

const emit = defineEmits(["closeCreating"]);
const closeCreating = () => {
  emit("closeCreating");
};
</script>

<style lang="scss" scoped></style>
