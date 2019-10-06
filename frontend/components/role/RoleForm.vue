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
              v-model="role.name"
              :disabled="sending"
            />
            <span class="md-error" v-if="!$v.form.name.required">The name is required</span>
            <span class="md-error" v-else-if="!$v.form.name.minlength">Invalid name</span>
          </md-field>
        </div>
      </div>

      <md-field>
        <label for="roles">Rights</label>
        <md-select v-model="role.rights" name="roles" id="roles" multiple>
          <div v-for="right in rights" v-bind:key="right._id">
            <md-option v-bind:value="right._id">{{right.name}}</md-option>
          </div>
        </md-select>
      </md-field>

      <md-progress-bar md-mode="indeterminate" v-if="sending" />

      <md-card-actions>
        <md-button @click.prevent="close">Cancel</md-button>
        <md-button type="submit" class="md-primary" :disabled="sending" v-if="!edit">Create role</md-button>
        <md-button type="submit" class="md-primary" :disabled="sending" v-else>Update role</md-button>
      </md-card-actions>

      <md-snackbar
        :md-active.sync="userSaved"
        v-if="!edit"
      >The role {{ lastUser }} was saved with success!</md-snackbar>
      <md-snackbar
        :md-active.sync="userSaved"
        v-else
      >The role {{ lastUser }} was updated with success!</md-snackbar>
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
    role: Object
  },
  data() {
    return {
      rights: [],
      form: this.role,
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
      this.role.name = null;
      this.role.rights = null;
    },
    saveUser() {
      this.sending = true;

      if (this.edit) {
        axios
          .put("http://localhost:3005/api/roles/" + this.role._id, {
            name: this.role.name,
            rights: this.role.rights
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
          .post("http://localhost:3005/api/roles", {
            name: this.role.name,
            rights: this.role.rights
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
      .get("http://localhost:3005/api/rights")
      .then(res => {
        this.rights = res.data;
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
