<template>
  <div class="app-container">
    <iframe :src="baseUrl+'/docs/gallery/graph.html'" frameborder="0"></iframe>
  </div>
</template>

<script>
  import baseUrl from '@/api/baseUrl'

  export default {
    data() {
      return {
        baseUrl
      }
    }
  }
</script>

<style scoped>
  iframe {
    height: 800px;
    width: 100%;
  }
</style>

