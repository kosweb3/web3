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
      <FormKit
        type="text"
        label="Additional url"
        name="data.url"
        v-model="data.url"
        placeholder="https://www.example.com..."
        validation="url"
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
  url: "",
});

const storeNotes = useStoreNotes();

const emit = defineEmits(["closeCreating", "noteAdded"]);

const handleCreateNote = async () => {
  if (data.value.title && data.value.content) {
    const noteId = await storeNotes.addNote(data.value);
    data.value.title = data.value.content = "";
    emit("noteAdded", noteId);

    closeCreating();
  }
};

const closeCreating = () => {
  emit("closeCreating");
};
</script>

<style lang="scss" scoped></style>
