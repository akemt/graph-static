<template>
  <div class="app-container">
    <el-row>
      <el-col :span="8">
        <search ajax-path="entitys_get" root-path="xxx" @selected="editEntity"></search>
      </el-col>
      <el-col :span="16">
        <router-view></router-view>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import search from '@/components/search/index'

  export default {
    data() {
      return {
        search: ''
      }
    },
    methods: {
      editEntity(item) {
        this.$router.push({name: 'entity.item', params: {id: item.id}})
      }
    },
    components: {search}
  }
</script>

<style scoped>
</style>

