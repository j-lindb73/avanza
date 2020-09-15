<template>
  
    <div class="w3-content">
      <Nav />
      <NavReport />
      <div class="w3-animate-opacity w3-card-4">
        <h1> Redovisning </h1>
        <router-link :to="{ path: `/reports/week/edit/${$route.params.kmom}` }">Redigera</router-link>
        <article class="w3-container">
          <MarkdownItVue :content='text' />
          <div>
            <!-- {{ text }} -->

          </div>
        </article>
      </div>
      <Footer />
    </div>
</template>

<script>
import Vars from '@/components/Vars';
import Nav from '@/components/Nav.vue'
import NavReport from '@/components/NavReport';
import MarkdownItVue from 'markdown-it-vue'
import Footer from '@/views/Footer'
console.log()
// import 'markdown-it-vue/dist/markdown-it-vue.css'
// https://www.npmjs.com/package/markdown-it-vue



export default {


  name: 'report',
  components: {
    Nav,
    NavReport,
    MarkdownItVue,
    Footer
  },
  data() {
    return {
      content: '## Kmom01 ##',
      text: ""
    }
  },
  mounted() {
    console.log("mounted");
    this.getReport()
  },
  watch: {
    // console.log("updated");
    '$route': 'getReport'
  },
  methods: {
    getReport() {
      let week = this.$route.params.kmom;
      let that = this;
      // fetch("https://me-api.jsramverk.se")
      // fetch("http://localhost:1337/reports/week/" + week)
      fetch(Vars.baseUrl +'/reports/week/' + week)
      .then(function(response) {
        return response.json();
      })
      .then(function(result) {
        console.log(result.data);
        that.text = result.data.text;
      })
      .catch(function(err) {
        console.log(err);
      });
    }

  }
}


</script>

<style scoped>
  article {
    text-align: left;
  }

  .code-body{
    padding: 16px;
    overflow: auto;
    font-size: 85%;
    line-height: 1.45;
    background-color: #f6f8fa;
    border-radius: 6px;
}
</style>
