<template>
  <div class="action-note">
    <div class="action-note__elem" @click="editHandleNote">
      <img src="../../assets/img/edit.png" alt="edit note" />
      <span>Edit Note</span>
    </div>
    <div class="action-note__elem" @click="deleteHandleNote">
      <img src="../../assets/img/svg/basket.svg" alt="delete note" />
      <span>Delete Note</span>
    </div>
    <!-- modalEdit Note -->
    <modal v-if="modalVisible && modalEdit" v-model="modalVisible">
      <template #content>Are you sure to edit this note?</template>
      <template #subcontent>
        <div>Edit Title</div>
        <input type="text" v-model="editTitle" />
        <div>Edit content</div>
        <input type="text" v-model="editContent" />
        <div v-if="selectedNote.url">Edit url</div>
        <input v-if="selectedNote.url" type="text" v-model="editUrl" />
        <div>
          <FormKit
            type="select"
            label="Edit topic:"
            name="sorted"
            v-model="editTopic"
            :options="['All', 'Private Note', 'Website Note']"
            prefix-icon="info"
          />
        </div>
      </template>
      <template #btn>
        <button @click="closeModal">Cancel</button>
        <button @click="confirmUpdateNote">Confirm</button>
      </template>
    </modal>
    <!-- modal Delete Note -->
    <modal v-if="modalVisible && modalDelete" v-model="modalVisible">
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
import { ref, computed, toRefs } from "vue";
import { storeToRefs } from "pinia";
import { useStoreNotes } from "@/store/notes.js";
import { useBaseStore } from "@/store/base.js";
import { useNotificationStore } from "@/store/notification.js";
import modal from "../modal.vue";

const subTitle = ref("");
const subContent = ref("");
const editContent = ref("");
const editTitle = ref("");
const editUrl = ref("");
const editTopic = ref("");

// Notes Store
const storeNotes = useStoreNotes();
const { deleteNote, updateNote } = storeNotes;

// baseStore
const baseStore = useBaseStore();
const { modalVisible } = storeToRefs(baseStore);

//notification store
const notificationStore = useNotificationStore();
const { startNofification } = notificationStore;

const modalDelete = ref(false);
const modalEdit = ref(false);

const props = defineProps({
  selectedNote: {
    type: Object,
    default: {},
  },
});

const {
  id: idProps,
  content: contentProps,
  title: titleProps,
  url: urlProps,
  topic: topicProps,
} = toRefs(props.selectedNote);

const editHandleNote = () => {
  editContent.value = contentProps.value;
  editTitle.value = titleProps.value;
  editUrl.value = urlProps.value;
  editTopic.value = topicProps.value;
  modalVisible.value = true;
  modalEdit.value = true;
};

const deleteHandleNote = () => {
  modalVisible.value = true;
  modalDelete.value = true;
  subContent.value = contentProps.value;
  subTitle.value = titleProps.value;
};

const closeModal = () => {
  modalVisible.value = false;
};

const confirmDelete = () => {
  deleteNote(props.selectedNote?.id);
  modalVisible.value = false;
  startNofification("Notes has been deleted!");
};

const confirmUpdateNote = () => {
  if (
    titleProps.value != editTitle.value ||
    contentProps.value != editContent.value ||
    urlProps.value != editUrl.value ||
    topicProps.value != editTopic.value
  ) {
    updateNote(
      idProps.value,
      editContent.value,
      editTitle.value,
      editUrl.value,
      editTopic.value
    );
    startNofification("Notes has been updated!");
  }
  modalVisible.value = false;
};
</script>

<style lang="scss" scoped></style>
