<template>
  <div class="w3-content">
    <Nav />
    <NavSecure />
    <div class="w3-animate-opacity w3-card-4">
      <h2 >Skapa rapport</h2>
    <Repform />
    </div>
    <Footer />
  </div>
</template>

<script>

import Nav from '@/components/Nav.vue'
import NavSecure from '@/components/NavSecure.vue'
import Footer from '@/views/Footer'
import Repform from '@/components/Report_form'

export default {
    name: 'reportnew',
    components: {
        Nav,
        NavSecure,
        Footer,
        Repform
    }
}
</script>