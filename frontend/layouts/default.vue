<template>
  <div>

    <div class="container">
      <Sidebar />
      <nuxt />
    </div>

    <Footer />
  </div>
</template>

<script>
import Header from "../components/Header";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";

export default {
  components: {
    Header,
    Footer,
    Sidebar
  }
};
</script>

<style>
.container{
  display:flex;
  flex-direction: row;
}

html {
  font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*:before,
*:after {
  line-height: 1.2;
  box-sizing: border-box;
  margin: 0;
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070 !important;
  text-decoration: none;
  padding: 10px 30px;
  cursor: pointer;
}

.button--green:hover {
  color: #fff !important;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e !important;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
  cursor: pointer;
}

.button--grey:hover {
  color: #fff !important;
  background-color: #35495e;
}
</style>
