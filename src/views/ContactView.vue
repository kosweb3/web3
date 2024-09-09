<template>
  <div class="contact-page container">
    <div v-if="!sended">
      <FormKit id="myElement" type="form" @submit="sendEmail">
        <FormKit
          type="text"
          label="Name"
          name="user_name"
          v-model="data.name"
          placeholder="Enter your name"
          validation="required"
          prefix-icon="people"
        />
        <FormKit
          type="email"
          label="Email"
          name="user_email"
          v-model="loggedUserEmail"
          validation="required|email"
          :placeholder="loggedUserPlaceholder"
          :readonly="isLogedUser"
          prefix-icon="email"
        />

        <FormKit
          type="text"
          label="Message"
          name="message"
          v-model="data.text"
          validation="required"
          placeholder="How can we help you?"
          prefix-icon="submit"
        />
      </FormKit>
    </div>
    <div v-else class="contact-page__thx">
      <span>Thanks for interesting with Web3 World!</span><br />
      <span>Our team will contact you soon.</span>
      <div class="contact-page__thx--button">
        <router-link to="/">
          <Web3Button>To home page</Web3Button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { storeToRefs } from "pinia";
import { useStoreAuth } from "@/store/auth.js";
import { useBaseStore } from "@/store/base.js";
import emailjs from "@emailjs/browser";
import Web3Button from "@/components/buttons/Web3Button.vue";

const sended = ref(false);
const data = ref({
  name: "",
  email: "",
  text: "",
});

//store Auth
const storeAuth = useStoreAuth();
const { authUser } = storeToRefs(storeAuth);

// baseStore
const baseStore = useBaseStore();
const { loader } = storeToRefs(baseStore);

const isLogedUser = computed(() => {
  return authUser.value?.email ?? false;
});

const loggedUserEmail = computed({
  get() {
    return authUser.value?.email || data.value.email;
  },
  set(value) {
    data.value.email = value;
  },
});

const loggedUserPlaceholder = computed(() => {
  return authUser.value?.email ?? "youremail@example.com";
});

const sendEmail = () => {
  const element = document.getElementById("myElement"); //if ref doesnt work
  if (data.value.name && loggedUserEmail.value && data.value.text) {
    loader.value = true;
    emailjs
      .sendForm("service_uy77469", "template_czd3vqa", element, {
        publicKey: "AzmBq3cmxtzXvYyHd",
      })
      .then(
        () => {
          data.value = "";
          sended.value = true;
          loader.value = false;
        },
        (error) => {
          console.log("FAILED...", error.text);
        }
      );
  }
};
</script>

<style scoped></style>
