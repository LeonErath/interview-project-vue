<template>
  <div>
    <div>
      <div class="accounts">
        <div class="account">
          <span class="cell header">Firstname</span>
          <span class="cell header">Lastname</span>
          <span class="cell header">E-mail</span>
          <span class="cell header">Telephone</span>
          <nuxt-link to="/roles" class="cell header">Roles</nuxt-link>
          <span class="cell header">Action</span>
        </div>

        <div v-for="account in accounts" v-bind:key="account" class="account">
          <AccountItem
            v-bind:account="account"
            @delete="$emit('delete', account)"
            @edit="$emit('edit', account)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AccountItem from "./AccountItem";

export default {
  name: "AccountTabe",
  components: {
    AccountItem
  },
  props: ["accounts"]
};
</script>

<style scoped>
.cell {
  box-sizing: border-box;
  display: inline-block;
  flex-grow: 1;
  width: 100%;
  text-align: left;
  overflow: hidden;
  list-style: none;
  margin: 4px;
  padding: 4px;
  background: rgb(249, 249, 255);
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
.account {
  width: 1400px;
  display: flex;
  flex-direction: row;
}
.accounts {
  display: flex;
  flex-direction: column;
  margin: 32px 0 3em 0;
  padding: 0;
}
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
