<template>
  <div class="container">
    <RoleModal
      v-model="modalOpen"
      @update="updateData"
      v-bind:edit="edit"
      v-bind:role="role"
    ></RoleModal>
    <div class="header">
      <div>
        <h1 class="title">Roles</h1>
        <h2 class="subtitle">Here you can manage all roles</h2>
      </div>
      <div>
        <span class="button--grey" v-on:click="openModal">Create Role</span>
      </div>
    </div>

    <div>
      <div class="table-container">
        <div class="search-container">
          <input type="text" v-model="search" class="input" placeholder="serach" />
        </div>
        <RoleTable v-bind:roles="filterRoles" @delete="deleteRole" @edit="editRole" />
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import RoleTable from "../components/role/RoleTable";
import RoleModal from "../components/role/RoleModal";

export default {
  name: "roles",
  components: {
    RoleTable,
    RoleModal
  },
  data() {
    return {
      modalOpen: false,
      search: "",
      roles: [],
      edit: false,
      role: {
        rights: [],
        _id:null,
        name: null,
      }
    };
  },
  methods: {
    editRole(role) {
      this.edit = true;
      this.role.name = role.name
      this.role._id = role._id;
      this.role.rights = role.rights.map(right => right._id);
      this.$nextTick(function() {
        this.modalOpen = true;

      });
    },
    deleteRole(role) {
      axios
        .delete("http://localhost:3005/api/roles/" + role._id)
        .then(res => {
          this.updateData();
        })
        .catch(err => console.log(err));
    },
    updateData() {

      axios
        .get("http://localhost:3005/api/roles")
        .then(res => (this.roles = res.data))
        .catch(err => console.log(err));
    },
    openModal() {
       this.edit = false;
      this.modalOpen = !this.modalOpen;
    }
  },
  computed: {
    filterRoles() {
      return this.roles.filter(role => {
        return (
          role.name.toLowerCase().indexOf(this.search.toLowerCase()) >
          -1
        );
      });
    }
  },
  created() {
    axios
      .get("http://localhost:3005/api/roles")
      .then(res => (this.roles = res.data))
      .catch(err => console.log(err));
  }
};
</script>

<style scoped>
.header {
  line-height: 1.2;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 4px 16px 4px 16px;
  border-bottom: 1px solid rgb(230, 230, 230);
  width: 100%;
}

.header div {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.search-container {
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
}
.input {
  width: 200px;
  padding: 8px 8px;
  margin: 8px 0;
  box-sizing: border-box;
}

.table-container {
  margin: 32px;
}
.container {
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  text-align: left;
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

.links {
  padding-top: 15px;
}
</style>
