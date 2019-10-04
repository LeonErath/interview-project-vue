<template>
  <div class="container">
    <div>
      <h1 class="title">Accounts</h1>
      <h2 class="subtitle">Here you can manage all accounts</h2>

      <div class="search-container">
      <input type="text" v-model="search" class="input" placeholder="serach"/>
       <span class="button--green" v-on:click="create">Create</span>
      </div>

       <AccountTable v-bind:accounts="filterAccounts"/>
    </div>
  </div>
</template>

<script>
import AccountTable from "../components/AccountTable"

export default {
  components:{
    AccountTable
  },
  data() {
    return {
      search: "",
      accounts: [
        {
          firstname: "Leon",
          lastname: "Erath",
          email: "leon-erath@hotmail.de",
          telephone: "+49 176 8121 5974"
        },
        {
          firstname: "Daniel",
          lastname: "Sal",
          email: "daniel@hotmail.de",
          telephone: "+49 123 5123 5974"
        },
        {
          firstname: "Daniel",
          lastname: "Sal",
          email: "daniel@hotmail.de",
          telephone: "+49 123 5123 5974"
        },
        {
          firstname: "Daniel",
          lastname: "Sal",
          email: "daniel@hotmail.de",
          telephone: "+49 123 5123 5974"
        }
      ]
    };
  },
  methods: {
    create: function(event) {
      alert("Hello " + this.name + "!");
    }
  },
  computed: {
    filterAccounts() {
      return this.accounts.filter(account => {
        return (
          account.firstname.toLowerCase().indexOf(this.search.toLowerCase()) >
          -1
        );
      });
    }
  }
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
.search-container{
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
}
.input{
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
