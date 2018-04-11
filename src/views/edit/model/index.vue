<template>
  <div class="app-container">
    <el-card class="box-card div-button">
      <el-button type="primary" plain @click="newTemplet()" class="button-right">新建实体类</el-button>
    </el-card>
    <el-row>
      <el-col :span="8">
        <el-card class="box-card">
          <search ajax-path="models_get" root-path="xxx" @selected="editModel"></search>
        </el-card>
      </el-col>
      <el-col :span="16">
        <router-view></router-view>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import search from '@/components/search/index'
  const api = require('@/api/kg/index')

  export default {
    data() {
      return {
        search: ''
      }
    },
    methods: {
      editModel(item) {
        this.$router.push({name: 'model.item', params: {id: item.id}})
      },
      newTemplet() {
        api.models_post({data: {name: '新建实体类'}}).then((data) => {
          this.$message('新建实体类成功')
          this.$router.push({name: 'model.item', params: {id: data.data.id}})
        })
      }
    },
    components: {search}
  }
</script>

<style scoped>
</style>

