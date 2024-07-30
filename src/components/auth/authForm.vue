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
      />
      <FormKit
        type="text"
        label="Pasword"
        name="user_password"
        v-model="credentials.password"
        validation="required"
        placeholder="Enter your pasword"
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
const { registerUser, logoutUser, loginUser } = store;
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
  console.log("form submited");
  if (props.register) {
    registerUser(credentials);
  } else {
    loginUser(credentials);
  }
};
</script>

<style lang="scss" scoped></style>
