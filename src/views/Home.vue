<template>
  <div class="w3-content" style="max-width:1400px">
    <Nav />

    <article class="w3-animate-opacity w3-card-4 w3-row">
        
      <img class="w3-card-2 w3-col m4 l3"  src="../assets/johan.jpg" width="300" alt="Bild på mig">
      <div class="w3-padding-large w3-col m8 l9 w3-large">
        <p>{{ text }}</p>
        <p>{{ name }}</p>
      </div>
    </article>

    <Footer />
  </div>
</template>

<script>
import Nav from '@/components/Nav'
import Footer from '@/views/Footer'

export default {
  name: 'Me',
  props: { },
  components: {
    Nav,
    Footer
  },
  data() {
    return {
        text: "",
        name: ""
    }
  },
  mounted() {
    this.getMe();
  },
  methods: {
    getMe() {
      let that = this;
      // fetch("https://me-api.jsramverk.se")
      fetch("http://localhost:1337")
      .then(function(response) {
        console.log(response);
          return response.json();
      })
      .then(function(result) {
          that.text = result.description;
          that.name = result.name;
      });
    }

  }
}
</script>

<style scoped>
  article {
    text-align: left;
  }
</style>