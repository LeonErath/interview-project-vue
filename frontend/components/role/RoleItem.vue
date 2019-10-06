<template>
  <div class="role">
    <md-dialog-confirm
      :md-active.sync="confirmation"
      md-title=""
      md-content="Do you want to delete the role?"
      md-confirm-text="Delete"
      md-cancel-text="Cancel"
      @md-cancel="confirmation=false"
      @md-confirm="onConfirm"
    />
    <span class="cell">{{ role._id }}</span>
    <span class="cell">{{ role.name }}</span>
    <div class="cell">
      <div class="image" v-on:click="$emit('edit')">
        <img src="/icons8-edit.svg" alt="edit" width="20" />
      </div>
      <div class="image" v-on:click="confirmation=true">
        <img src="/icons8-trash.svg" alt="edit" width="20" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "RoleItem",
  props: ["role"],
  data() {
    return {
      confirmation: false
    };
  },
  methods: {
    onConfirm() {
      this.$emit("delete");
    }
  }
};
</script>

<style scoped>
.cell {
  border-color: #eeeeee;
  border-style: solid;
  border-width: 1px;
  display: flex;
  align-items: center;
  flex-grow: 1;
  width: 100%;
  text-align: left;
  overflow: hidden;
  list-style: none;
  margin: 0px;
  padding: 8px;
  color: #222222;
}
.image {
  padding: 4px;
  border-radius: 4px;
  cursor: pointer;
}
.image:hover {
  background: rgb(231, 231, 231);
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
.cell.header {
  background: transparent;
  font-weight: bold;
  color: #35495e;
  font-size: 16px;
}
.role {
  width: 1000px;
  display: flex;
  flex-direction: row;
}
.roles {
  display: flex;
  flex-direction: column;
  margin: 32px 0 3em 0;
  padding: 0;
}
</style>
