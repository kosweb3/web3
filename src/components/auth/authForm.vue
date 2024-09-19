<template>
  <div>
    <FormKit id="myElement" class="auth-form" type="form" @submit="onSubmit">
      <FormKit
        type="email"
        label="Email"
        name="user_email"
        v-model="credentials.email"
        validation="required|email"
        placeholder="youremail@gmail.com"
        prefix-icon="email"
      />
      <FormKit
        type="password"
        label="Pasword"
        name="user_password"
        v-model="credentials.password"
        validation="required"
        placeholder="Enter your pasword"
        prefix-icon="password"
        suffix-icon="eyeClosed"
        @suffix-icon-click="handleIconClick"
        suffix-icon-class="hover:text-blue-500"
      />
      <template v-if="register">
        <p class="auth-form__avatar--text">Generate your avatar</p>
        <div class="auth-form__avatar">
          <userAvatar />
          <div
            @click="generateNewAvatar"
            :class="[
              'auth-form__avatar--refresh',
              { 'rotate-avatar': isRotating },
            ]"
          >
            <i class="fa fa-refresh" aria-hidden="true"></i>
          </div>
        </div>
      </template>
    </FormKit>
    <div v-if="errorUser">{{ errorUser }}</div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useStoreAuth } from "@/store/auth.js";
import { useGenerateAvatar } from "@/composables/useGenerateAvatar";
import userAvatar from "./userAvatar.vue";

const store = useStoreAuth();
const { registerUser, loginUser } = store;
const { authUser, errorUser, userStoreAvatar } = storeToRefs(store);

const props = defineProps({
  register: {
    type: Boolean,
    default: "false",
  },
});

const newAvatar = ref();
const isRotating = ref(false);

const credentials = reactive({
  email: "",
  password: "",
});

const onSubmit = () => {
  if (props.register) {
    registerUser(credentials);
  } else {
    loginUser(credentials);
  }
};

const generateNewAvatar = async () => {
  isRotating.value = true;
  newAvatar.value = await useGenerateAvatar();
  userStoreAvatar.value = newAvatar.value;

  setTimeout(() => {
    isRotating.value = false;
  }, 500);
};

const handleIconClick = (node, e) => {
  node.props.suffixIcon = node.props.suffixIcon === "eye" ? "eyeClosed" : "eye";
  node.props.type = node.props.type === "password" ? "text" : "password";
};

onMounted(() => {
  generateNewAvatar();
});
</script>

<style lang="scss" scoped></style>
