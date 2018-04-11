<template>
  <div class="app-container">
    <el-card class="box-card div-button">
      <el-button type="primary" plain @click="newEntity()" class="button-right">新建实体</el-button>
    </el-card>
    <el-row>
      <el-col :span="8">
        <el-card class="box-card">
        <search ajax-path="entitys_get" root-path="xxx" @selected="editEntity"></search>
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
      editEntity(item) {
        this.$router.push({name: 'entity.item', params: {id: item.id}})
      },
      newEntity() {
        api.entitys_post({name: '新建实体'}).then((data) => {
          this.$message('新建实体成功')
          this.$router.push({name: 'entity.item', params: {id: data.data.id}})
        })
      }
    },
    components: {search}
  }
</script>

<style scoped>
  .div-button{
    text-align:right;
  }
  .button-right{
    text-align:right;
    margin:0px auto 0px auto;
  }
</style>

