<template>
  
    <div class="w3-content">
      <Nav />
      <div class="w3-animate-opacity w3-card-4">
        <h1> Redovisning </h1>
        <article class="w3-container">
          <MarkdownItVue :content='content' />
          <div>
          <h3>Länk till github:</h3>
            <a href='https://github.com/j-lindb73/me-app/' target='_blank'>https://github.com/j-lindb73/me-app/</a>
          </div>
          <div>
            <h1> me-app </h1>

            <h2> Project setup </h2>
            Set up the environment and install dependencies
            <div class="code-body">
              npm install
            </div>

            <h3> Compiles and hot-reloads for development</h3>
            Start development server. Saved changes a loaded on-the-fly.
            <div class="code-body">
              npm run serve
            </div>


            <h3> Compiles and minifies for production</h3>
            Create production files.
            <div class="code-body">
              npm run build
            </div>

            <h3> Lints and fixes files</h3>
            Check and fix files for/from lint errors.
            <div class="code-body">
             npm run lint
            </div>

            <h3> Customize configuration</h3>
            See <a href="https://cli.vuejs.org/config/" target="_blank">Configuration Reference</a>
          </div>
        </article>
      </div>
      <Footer />
    </div>
</template>

<script>
import Nav from '@/components/Nav.vue'
import MarkdownItVue from 'markdown-it-vue'
import Footer from '@/views/Footer'
// import 'markdown-it-vue/dist/markdown-it-vue.css'
// https://www.npmjs.com/package/markdown-it-vue



export default {

  name: 'report',
  components: {
    Nav,
    MarkdownItVue,
    Footer
  },
  data() {
    return {
      content: '## Kmom01 ##'
    }
  },
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
