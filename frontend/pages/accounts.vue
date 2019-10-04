<template>
  <div class="container">
    <AccountModal v-model="modalOpen"></AccountModal>
    <div class="header">
      <div>
        <h1 class="title">Accounts</h1>
        <h2 class="subtitle">Here you can manage all accounts</h2>
      </div>
      <div>
        <span class="button--grey" v-on:click="openModal">Create Account</span>
      </div>
    </div>

    <div>
      <div class="table-container">
        <div class="search-container">
          <input type="text" v-model="search" class="input" placeholder="serach" />
        </div>
        <AccountTable v-bind:accounts="filterAccounts" />
      </div>
    </div>
  </div>
</template>

<script>
import AccountTable from "../components/AccountTable";
import AccountModal from "../components/AccountModal";

export default {
  components: {
    AccountTable,
    AccountModal
  },
  data() {
    return {
      modalOpen: false,
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
    },
    openModal() {
      this.modalOpen = !this.modalOpen;
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
.header {
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
