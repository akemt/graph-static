<template>
  <div class="app-container">
    <el-row>
      <el-col :span="8">
        <search ajax-path="models_get" root-path="xxx" @selected="editModel"></search>
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
      editModel(item) {
        this.$router.push({name: 'model.item', params: {id: item.id}})
      }
    },
    components: {search}
  }
</script>

<style scoped>
</style>

