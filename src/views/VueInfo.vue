<template>
  <div class="home">
    <Nav />
    <div class="w3-animate-opacity w3-card-4">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    </div>
    <Footer />
  </div>
</template>

<script>
// @ is an alias to /src
import Nav from '@/components/Nav.vue'
import HelloWorld from '@/components/HelloWorld.vue'
import Footer from '@/views/Footer'

export default {
  name: 'VueInfo',
  components: {
    Nav,
    HelloWorld,
    Footer
  }
}
</script>
