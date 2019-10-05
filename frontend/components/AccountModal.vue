
<template>
  <div class="modal" v-show="value">
    <div class="container">
      <div class="title">Create an Account</div>
      <div class="subtitle">This created account will have access to this platform.</div>
      <AccountForm v-on:input="close"></AccountForm>
    </div>
  </div>
</template>

<script>
import AccountForm from "./AccountForm";

export default {
  name: "AccountModal",
  components: {
    AccountForm
  },
  props: {
    value: {
      required: true
    }
  },
  methods: {
    close() {
      this.$emit("input", !this.value);
      this.$emit("update");
    }
  }
};
</script>

<style scoped>
.container {
  line-height: 1.2;
  padding: 16px;
  border-radius: 4px;
  background: white;
  width: 600px;
  display: flex;
  flex-direction: column;
}

.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  display: block;
  font-weight: bold;
  font-size: 30px;
  color: #35495e;
  letter-spacing: 0px;
}

.subtitle {
  font-weight: 300;
  font-size: 18px;
  color: #526488;
  padding-bottom: 15px;
}
.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
}
</style>

