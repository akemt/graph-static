<template>
  <div class="app-container">
    {{this.$route.params}}
    <tree></tree>
    <relation></relation>
  </div>
</template>

<script>
  import tree from '@/components/entity/tree'
  import relation from '@/components/entity/relation'

  export default {
    components: {tree, relation}
  }
</script>

<style scoped>
</style>

