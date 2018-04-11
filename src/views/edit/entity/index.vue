<template>
  <div class="app-container">
    <el-button type="primary" plain @click="newEntity()" class="create-button">新建实体</el-button>
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

  const api = require('@/api/kg/index')

  export default {
    data() {
      return {
        search: ''
      }
    },
    methods: {
      editEntity(item) {
        this.$router.push({name: 'entity.item', params: {id: item.id}})
      },
      newEntity() {
        api.entitys_post({json: '新建实体'}).then((data) => {
          console.log('成功 ID：', data.data.id)
          this.$router.push({name: 'entity.item', params: {id: data.data.id}})
        })
      }
    },
    components: {search}
  }
</script>

<style scoped>
  .create-button{
    margin-bottom: 5px;
  }
</style>

