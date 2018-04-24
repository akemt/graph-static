<template>
  <div class="">
    <entity-tree :id="this.$route.params.id"
                 :ajaxPath="{init: 'entitys_id_get', save: 'entitys_id_post'}"
                 :type="'entity'"
                 @getModel="getModel"></entity-tree>
    <entity-relation :item="this.$route.params" :mid="modelId"></entity-relation>
  </div>
</template>

<script>
  import entityTree from '@/components/entity/entityTree'
  import entityRelation from '@/components/entity/entityRelation'

  export default {
    components: {entityTree, entityRelation},
    data() {
      return {
        modelId: ''
      }
    },
    methods: {
      getModel(modelId) {
        this.modelId = modelId
      }
    }
  }
</script>

<style scoped>
</style>
