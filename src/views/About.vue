<template>
  <div class="w3-content">
    <Nav />
    <div class="w3-animate-opacity w3-card-4">
      <h2 >Läs mer om kursen jsramverk på <a href="https://jsramverk.se" target="_blank">jsramverk.se</a></h2>
    </div>
    <Footer />
  </div>
</template>


<script>

import Nav from '@/components/Nav.vue'
import Footer from '@/views/Footer'
export default {
  name: 'about',
  components: {
    Nav,
    Footer
  }
}
</script>