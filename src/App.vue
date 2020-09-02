<template>
  <div id="app">
    <h1>ME-sida i kursen jsramverk</h1>
    <div id="nav">
      <router-link to="/">Hem</router-link> |
      <router-link to="/report">Redovisning</router-link> |
      <router-link to="/about">Om</router-link> |
      <router-link to="/vueinfo">VueInfo</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
