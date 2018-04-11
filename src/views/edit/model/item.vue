<template>
  <div class="">
    <entity-tree :id="this.$route.params.id" :ajaxPath="{init: 'models_id_get', save: 'models_id_post'}" :type="'model'"></entity-tree>
  </div>
</template>

<script>
  import entityTree from '@/components/entity/entityTree'

  export default {
    components: {entityTree}
  }
</script>

<style scoped>
</style>
