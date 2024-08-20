<template>
  <div>
    <FormKit id="myElement" type="form" @submit="onSubmit">
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
    </FormKit>
    <div v-if="errorUser">{{ errorUser }}</div>
  </div>
</template>

<script setup>
import { reactive } from "vue";
import { storeToRefs } from "pinia";
import { useStoreAuth } from "@/store/auth.js";

const store = useStoreAuth();
const { registerUser, loginUser } = store;
const { authUser, errorUser } = storeToRefs(store);

const props = defineProps({
  register: {
    type: Boolean,
    default: "false",
  },
});

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

const handleIconClick = (node, e) => {
  node.props.suffixIcon = node.props.suffixIcon === "eye" ? "eyeClosed" : "eye";
  node.props.type = node.props.type === "password" ? "text" : "password";
};
</script>

<style lang="scss" scoped></style>
