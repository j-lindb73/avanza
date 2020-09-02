<template>
  
    <div class="w3-content">
      <Nav />
      <div class="w3-card-4">
        <h1> Redovisning </h1>
        <article class="w3-container">
          <MarkdownItVue :content="content" />

        </article>
      </div>
    </div>
</template>

<script>
import Nav from '@/components/Nav.vue'
import MarkdownItVue from 'markdown-it-vue'
// import 'markdown-it-vue/dist/markdown-it-vue.css'
// https://www.npmjs.com/package/markdown-it-vue

export default {
  name: 'report',

  components: {
    Nav,
    MarkdownItVue
  },
  data() {
    return {
      content: '## Kmom01 ##'
    }
  }
}
</script>

<style scoped>
  article {
    text-align: left;
  }
</style>
