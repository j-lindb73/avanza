<template>
  <div class="w3-content">
    <Nav />
    <div class="w3-animate-opacity w3-card-4">
      <h2 >Redigera rapport</h2>
    <RepformEdit />
    </div>
    <Footer />
  </div>
</template>

<script>

import Nav from '@/components/Nav.vue'
import Footer from '@/views/Footer'
import RepformEdit from '@/components/Report_formEdit'

export default {
    name: 'reportnew',
    components: {
        Nav,
        Footer,
        RepformEdit
    }
}
</script>