<template>
  <div>
    <form novalidate class="md-layout" @submit.prevent="validateUser">
      <div class="md-layout md-gutter">
        <div class="md-layout-item md-small-size-100">
          <md-field :class="getValidationClass('firstname')">
            <label for="first-name">First Name</label>
            <md-input
              name="first-name"
              id="first-name"
              autocomplete="given-name"
              v-model="account.firstname"
              :disabled="sending"
            />
            <span class="md-error" v-if="!$v.form.firstname.required">The first name is required</span>
            <span class="md-error" v-else-if="!$v.form.firstname.minlength">Invalid first name</span>
          </md-field>
        </div>

        <div class="md-layout-item md-small-size-100">
          <md-field :class="getValidationClass('lastname')">
            <label for="last-name">Last Name</label>
            <md-input
              name="last-name"
              id="last-name"
              autocomplete="family-name"
              v-model="account.lastname"
              :disabled="sending"
            />
            <span class="md-error" v-if="!$v.form.lastname.required">The last name is required</span>
            <span class="md-error" v-else-if="!$v.form.lastname.minlength">Invalid last name</span>
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
          v-model="account.email"
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
          v-model="account.telephone"
          :disabled="sending"
        />
        <span class="md-error" v-if="!$v.form.telephone.required">The telephone number is required</span>
        <span class="md-error" v-else-if="!$v.form.telephone.telephone">Invalid telephone number</span>
      </md-field>

      <md-field>
        <label for="roles">Roles</label>
        <md-select v-model="account.roles" name="roles" id="roles" multiple>
          <div v-for="role in roles" v-bind:key="role._id">
            <md-option v-bind:value="role._id">{{role.name}}</md-option>
          </div>
        </md-select>
      </md-field>

      <md-progress-bar md-mode="indeterminate" v-if="sending" />

      <md-card-actions>
        <md-button @click.prevent="close">Cancel</md-button>
        <md-button type="submit" class="md-primary" :disabled="sending" v-if="!edit">Create account</md-button>
        <md-button type="submit" class="md-primary" :disabled="sending" v-else>Update account</md-button>
      </md-card-actions>

      <md-snackbar
        :md-active.sync="userSaved"
        v-if="!edit"
      >The user {{ lastUser }} was saved with success!</md-snackbar>
      <md-snackbar
        :md-active.sync="userSaved"
        v-else
      >The user {{ lastUser }} was updated with success!</md-snackbar>
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
    account: Object
  },
  data() {
    return {
      roles: [],
      form: this.account,
      userSaved: false,
      sending: false,
      lastUser: null
    };
  },
  validations: {
    form: {
      firstname: {
        required,
        minLength: minLength(3)
      },
      lastname: {
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
  mounted() {
    console.log("help", this.account);
    console.log("help", this.form);
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
      this.account._id = null;
      this.account.firstname = null;
      this.account.lastname = null;
      this.account.telephone = null;
      this.account.email = null;
      this.account.roles = null;
    },
    saveUser() {
      this.sending = true;

      if (this.edit) {
        axios
          .put("http://localhost:3005/api/accounts/" + this.account._id, {
            firstname: this.account.firstname,
            lastname: this.account.lastname,
            telephone: this.account.telephone,
            email: this.account.email,
            roles: this.account.roles
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
        console.log("roles", this.account.roles, this.roles);

        axios
          .post("http://localhost:3005/api/accounts", {
            firstname: this.account.firstname,
            lastname: this.account.lastname,
            telephone: this.account.telephone,
            email: this.account.email,
            roles: this.account.roles
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
  },
  mounted() {
    axios
      .get("http://localhost:3005/api/roles")
      .then(res => {
        this.roles = res.data;
      })
      .catch(err => console.log(err));
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
