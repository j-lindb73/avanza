<template>
  <div class="w3-content">
    <Nav />
     <NavSecure v-if= "true" />
    <div class="w3-animate-opacity w3-card-4">
      <h2 >Registrera användare</h2>
    <Regform />
    </div>
    <Footer />
    <cookie-consent
      :cookie-expiry-days="-1"
    />
  </div>
</template>

<script>

import Nav from '@/components/Nav.vue'
import Footer from '@/views/Footer'
import Regform from '@/components/Register_form'
import NavSecure from '@/components/NavSecure'
import CookieConsent from '@/components/CookieConsent';

export default {
    name: 'register',
    components: {
        Nav,
        Footer,
        Regform,
        NavSecure,
        CookieConsent
    }
}
</script>