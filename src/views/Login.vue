<template>
  <div class="w3-content">
    <Nav />
    <NavSecure />
    <div class="w3-animate-opacity w3-card-4">
      <h2 >Logga in användare</h2>
    <Loginform />
    </div>
    <Footer />
  </div>
</template>

<script>

import Nav from '@/components/Nav.vue'
import NavSecure from '@/components/NavSecure.vue'
import Footer from '@/views/Footer'
import Loginform from '@/components/Login_form'

export default {
    name: 'login',
    components: {
        Nav,
        NavSecure,
        Footer,
        Loginform
    }
}
</script>