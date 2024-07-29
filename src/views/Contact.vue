<template>
  <div>
    Hello from Contact
    <div v-if="!sended">
      <FormKit id="myElement" type="form" @submit="sendEmail">
        <FormKit
          type="text"
          label="тame"
          name="user_name"
          v-model="data.name"
          help="Enter your name"
          validation="required"
        />

        <FormKit
          type="email"
          label="Email"
          name="user_email"
          v-model="data.email"
          help="Enter your e-mail"
          validation="required|email"
          placeholder="youremail@gmail.com"
          validation-visibility="live"
        />

        <FormKit
          type="text"
          label="Message"
          name="message"
          v-model="data.text"
          validation="required"
        />
      </FormKit>
    </div>
    <div v-else>Thanks for your email!!!</div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import emailjs from "@emailjs/browser";

const sended = ref(false);
const form = ref(null);
const data = ref({
  name: "",
  email: "",
  text: "",
});

const sendEmail = () => {
  const element = document.getElementById("myElement"); //if ref doesnt work
  if (data.value.name && data.value.email && data.value.text) {
    emailjs
      .sendForm("service_uy77469", "template_czd3vqa", element, {
        publicKey: "AzmBq3cmxtzXvYyHd",
      })
      .then(
        () => {
          data.value = "";
          sended.value = true;
          console.log("SUCCESS!");
        },
        (error) => {
          console.log("FAILED...", error.text);
        }
      );
  }
};
</script>

<style scoped>
.send {
  background: greenyellow;
  padding: 10px 30px;
  cursor: pointer;
}
.formkit-message {
  font-size: 12px;
  color: red !important;
}
</style>
