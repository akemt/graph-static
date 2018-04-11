<template>
  <div class="">
    <entity-tree :id="this.$route.params.id"></entity-tree>
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
