<template>
  <div class="app-container">
    {{this.$route.params}}
    <entity-tree></entity-tree>
    <entity-relation></entity-relation>
  </div>
</template>

<script>
  import entityTree from '@/components/entity/entityTree'
  import entityRelation from '@/components/entity/entityRelation'

  export default {
    components: {entityTree, entityRelation}
  }
</script>

<style scoped>
</style>

