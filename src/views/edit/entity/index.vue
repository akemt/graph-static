<template>
  <div class="app-container">
    编辑实体
    <search ajax-path="xxx" root-path="xxx" @selected="editEntity"></search>
    other
    <router-view></router-view>
  </div>
</template>

<script>
  import search from '@/components/search/index'

  export default {
    methods: {
      editEntity(id) {
        // 路由跳转
        this.$router.push({name: 'entity.item', params: {id}})
      }
    },
    components: {search}
  }
</script>

<style scoped>
</style>

