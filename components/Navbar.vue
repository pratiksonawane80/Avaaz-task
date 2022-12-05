<template>
<div class="header-container">
  <header class="the-header">
    <div class="logo">
      <nuxt-link to="/redirect">AVAAZ</nuxt-link>
    </div>
    <div class="spacer"></div>
    <div class="navigation-items">
      <ul class="nav-list">
        <li class="nav-item"><button class=" text-red-700 border p-3 border-red-700" @click="doLogout">Logout</button></li>
      </ul>
    </div>
  </header>
</div>
</template>

<script>

export default {
  name: "TheNavbar",

  methods: {
    doLogout() {
      this.$cookies.remove('AUTHTOKEN')
      this.$cookies.remove('JSESSIONID')

      this.$router.push('/')
    }
  }
};
</script>


<style scoped>
.header-container {
  height: 60px;
}

.the-header {
  width: 100%;
  position: fixed;
  height: 60px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: black;
  z-index: 100;
  box-sizing: border-box;
  padding: 0 20px;
}

.logo {
  margin: 0 10px;
  font-size: 1.3rem;
}

.logo a {
  text-decoration: none;
  color: white;
}

.spacer {
  flex: 1;
}

.navigation-items {
  display: none;
}

@media (min-width: 768px) {
  .navigation-items {
    display: block;
  }
}

.nav-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
}

.nav-item {
  margin: 0 10px;
}

.nav-item a {
  text-decoration: none;
  color: white;
}

.nav-item a:hover,
.nav-item a:active,
.nav-item a.nuxt-link-active {
  color: red;
}
</style>
