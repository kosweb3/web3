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
        prefix-icon="text"
      />
      <FormKit
        type="text"
        label="Content new note"
        name="data.content"
        v-model="data.content"
        placeholder="Enter your content"
        validation="required"
        prefix-icon="textarea"
      />
      <FormKit
        type="text"
        label="Additional url"
        name="data.url"
        v-model="data.url"
        placeholder="https://www.example.com..."
        validation="url"
        prefix-icon="link"
      />
      <div class="new-notes__buttons">
        <button @click="closeCreating" :disabled="loader">Cancel</button>
        <FormKit type="submit">
          <span v-if="!loader">Create New Note</span>
          <Loader v-else />
        </FormKit>
      </div>
    </FormKit>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useStoreNotes } from "@/store/notes.js";
import { useBaseStore } from "@/store/base.js";
import Web3Button from "../buttons/Web3Button.vue";
import Loader from "../loader.vue";

// baseStore
const baseStore = useBaseStore();
const { loader } = storeToRefs(baseStore);

const data = ref({
  title: "",
  content: "",
  url: "",
});

const storeNotes = useStoreNotes();
const emit = defineEmits(["closeCreating", "noteAdded"]);

const handleCreateNote = async () => {
  if (data.value.title && data.value.content) {
    loader.value = true;
    try {
      const noteId = await storeNotes.addNote(data.value);
      data.value.title = data.value.content = "";
      emit("noteAdded", noteId);

      closeCreating();
    } catch (error) {
      console.error("Error creating note:", error);
    } finally {
      loader.value = false;
    }
  }
};

const closeCreating = () => {
  emit("closeCreating");
};
</script>

<style lang="scss" scoped></style>
