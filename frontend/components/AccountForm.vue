<template>
  <div>
    <form novalidate class="md-layout" @submit.prevent="validateUser">
      <div class="md-layout md-gutter">
        <div class="md-layout-item md-small-size-100">
          <md-field :class="getValidationClass('firstName')">
            <label for="first-name">First Name</label>
            <md-input
              name="first-name"
              id="first-name"
              autocomplete="given-name"
              v-model="form.firstName"
              :disabled="sending"
            />
            <span class="md-error" v-if="!$v.form.firstName.required">The first name is required</span>
            <span class="md-error" v-else-if="!$v.form.firstName.minlength">Invalid first name</span>
          </md-field>
        </div>

        <div class="md-layout-item md-small-size-100">
          <md-field :class="getValidationClass('lastName')">
            <label for="last-name">Last Name</label>
            <md-input
              name="last-name"
              id="last-name"
              autocomplete="family-name"
              v-model="form.lastName"
              :disabled="sending"
            />
            <span class="md-error" v-if="!$v.form.lastName.required">The last name is required</span>
            <span class="md-error" v-else-if="!$v.form.lastName.minlength">Invalid last name</span>
          </md-field>
        </div>
      </div>

      <md-field :class="getValidationClass('email')">
        <label for="email">Email</label>
        <md-input
          type="email"
          name="email"
          id="email"
          autocomplete="email"
          v-model="form.email"
          :disabled="sending"
        />
        <span class="md-error" v-if="!$v.form.email.required">The email is required</span>
        <span class="md-error" v-else-if="!$v.form.email.email">Invalid email</span>
      </md-field>

      <md-field :class="getValidationClass('telephone')">
        <label for="telephone">Telephone</label>
        <md-input
          name="telephone"
          id="telephone"
          autocomplete="telephone"
          v-model="form.telephone"
          :disabled="sending"
        />
        <span class="md-error" v-if="!$v.form.telephone.required">The telephone number is required</span>
        <span class="md-error" v-else-if="!$v.form.telephone.telephone">Invalid telephone number</span>
      </md-field>

      <md-field>
        <label for="roles">Roles</label>
        <md-select v-model="form.roles" name="roles" id="roles" multiple>
          <md-option value="admin">Admin</md-option>
          <md-option value="tester">Tester</md-option>
          <md-option value="software-engineer">Software Engineer</md-option>
          <md-option value="business">Business</md-option>
          <md-option value="intern">Intern</md-option>
          <md-option value="student">Student</md-option>
        </md-select>
      </md-field>

      <md-progress-bar md-mode="indeterminate" v-if="sending" />

      <md-card-actions>
        <md-button @click.prevent="close">Cancel</md-button>
        <md-button type="submit" class="md-primary" :disabled="sending">Create account</md-button>
      </md-card-actions>

      <md-snackbar :md-active.sync="userSaved">The user {{ lastUser }} was saved with success!</md-snackbar>
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
  data: () => ({
    form: {
      roles: [],
      firstName: null,
      lastName: null,
      telephone: null,
      email: null
    },
    userSaved: false,
    sending: false,
    lastUser: null
  }),
  validations: {
    form: {
      firstName: {
        required,
        minLength: minLength(3)
      },
      lastName: {
        required,
        minLength: minLength(3)
      },
      telephone: {
        required,
        minLength: minLength(3)
      },
      email: {
        required,
        email
      }
    }
  },
  methods: {
    close() {
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
      this.form.firstName = null;
      this.form.lastName = null;
      this.form.telephone = null;
      this.form.email = null;
    },
    saveUser() {
      this.sending = true;

      axios
        .post("http://localhost:3005/api/accounts", {
          firstname: this.form.firstName,
          lastname: this.form.lastName,
          telephone: this.form.telephone,
          email: this.form.email
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
