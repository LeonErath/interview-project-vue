<template>
  <div>
    <form novalidate class="md-layout" @submit.prevent="validateUser">
      <div class="md-layout md-gutter">
        <div class="md-layout-item md-small-size-100">
          <md-field :class="getValidationClass('name')">
            <label for="name">Name</label>
            <md-input
              name="name"
              id="name"
              autocomplete="given-name"
              v-model="right.name"
              :disabled="sending"
            />
            <span class="md-error" v-if="!$v.form.name.required">The name is required</span>
            <span class="md-error" v-else-if="!$v.form.name.minlength">Invalid name</span>
          </md-field>
        </div>
      </div>

      <md-progress-bar md-mode="indeterminate" v-if="sending" />

      <md-card-actions>
        <md-button @click.prevent="close">Cancel</md-button>
        <md-button type="submit" class="md-primary" :disabled="sending" v-if="!edit">Create right</md-button>
        <md-button type="submit" class="md-primary" :disabled="sending" v-else>Update right</md-button>
      </md-card-actions>

      <md-snackbar
        :md-active.sync="userSaved"
        v-if="!edit"
      >The right {{ lastUser }} was saved with success!</md-snackbar>
      <md-snackbar
        :md-active.sync="userSaved"
        v-else
      >The right {{ lastUser }} was updated with success!</md-snackbar>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import { validationMixin } from "vuelidate";
import {
  required,
  email,
  minLength,
  maxLength
} from "vuelidate/lib/validators";

export default {
  name: "FormValidation",
  mixins: [validationMixin],
  props: {
    edit: Boolean,
    right: Object
  },
  data() {
    return {
      form: this.right,
      userSaved: false,
      sending: false,
      lastUser: null
    };
  },
  validations: {
    form: {
      name: {
        required,
        minLength: minLength(3)
      }
    }
  },
  methods: {
    close() {
      this.clearForm();
      this.$emit("input", !this.value);
    },
    getValidationClass(fieldName) {
      const field = this.$v.form[fieldName];

      if (field) {
        return {
          "md-invalid": field.$invalid && field.$dirty
        };
      }
    },
    clearForm() {
      this.$v.$reset();
      this.right.name = null;
    },
    saveUser() {
      this.sending = true;

      if (this.edit) {
        axios
          .put("http://localhost:3005/api/rights/" + this.right._id, {
            name: this.right.name
          })
          .then(response => {
            console.log(response);
            this.userSaved = true;
            this.sending = false;
            this.clearForm();
            this.$emit("input", !this.value);
          })
          .catch(error => {
            console.log(error);
            this.sending = false;
            this.clearForm();
          });
      } else {
        axios
          .post("http://localhost:3005/api/rights", {
            name: this.right.name
          })
          .then(response => {
            console.log(response);
            this.userSaved = true;
            this.sending = false;
            this.clearForm();
            this.$emit("input", !this.value);
          })
          .catch(error => {
            console.log(error);
            this.sending = false;
            this.clearForm();
          });
      }
    },
    validateUser() {
      this.$v.$touch();

      if (!this.$v.$invalid) {
        this.saveUser();
      }
    }
  }
};
</script>

<style  scoped>
.md-layout {
  display: flex;
  flex-direction: column;
}
.md-progress-bar {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
}
</style>
