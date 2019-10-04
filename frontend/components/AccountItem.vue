<template>
  <div class="account">
    <span class="cell">{{ account.firstname }}</span>
    <span class="cell">{{ account.lastname }}</span>
    <span class="cell">{{ account.email }}</span>
    <span class="cell">{{ account.telephone }}</span>
    <div class="cell">
      <span>edit</span>
      <span>delete</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "AccountItem",
  props: ["account"]
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
  width: 1000px;
  display: flex;
  flex-direction: row;
}
.accounts {
  display: flex;
  flex-direction: column;
  margin: 32px 0 3em 0;
  padding: 0;
}
</style>
