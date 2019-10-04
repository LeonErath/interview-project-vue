<template>
  <div class="container">
    <nuxt-link to="/" class="link">
      <img src="/kmh-logo-white.png" alt="kmh-logo" width="80" class="icons"/>
    </nuxt-link>
    <nuxt-link to="/accounts" class="link">
      <img src="/icons8-account-white.svg" alt="accounts" width="40" class="icons"/>
    </nuxt-link>
    <nuxt-link to="/roles" class="link">
      <img src="/icons8-lock-white.svg" alt="roles" width="40" class="icons"/>
    </nuxt-link>

  </div>
</template>



<style scoped>
.icons{
  padding: 8px;
}
.link {
  border-radius: 4px;
  color: white;
  text-decoration: none;
}
.link:hover{
  background: #2a3a4b;
}

.container {
  background: #35495e;
  color: white;
  width: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 8px;
}
</style>
