<template>
  <div class="">
    <entity-tree :id="this.$route.params.id" :ajaxPath="{init: 'entitys_id_get', save: 'entitys_id_post'}"></entity-tree>
    <entity-relation :item="this.$route.params"></entity-relation>
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
