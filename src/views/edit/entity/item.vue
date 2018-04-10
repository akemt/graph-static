<template>
  <div class="">
    <entity-tree :id="this.$route.params.id"></entity-tree>
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
