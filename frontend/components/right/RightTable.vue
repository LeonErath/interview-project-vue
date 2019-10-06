<template>
  <div>
    <div>
      <div class="rights">
        <div class="right">
          <span class="cell header">ID</span>
          <span class="cell header">Name</span>
          <span class="cell header">Action</span>
        </div>

        <div v-for="right in rights" v-bind:key="right" class="right">
          <RightItem v-bind:right="right" @delete="$emit('delete', right)" @edit="$emit('edit', right)"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import RightItem from "./RightItem";

export default {
  name: "RightTabe",
  components: {
    RightItem
  },
  props: ["rights"]
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
.right {
  width: 1000px;
  display: flex;
  flex-direction: row;
}
.rights {
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
