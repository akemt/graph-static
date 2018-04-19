<template>
  <div class="app-container">
    <create-templet-modal :open.sync="showNewTempletDialog" @close="closeModel()"></create-templet-modal>
    <el-row>
      <el-col :span="24">
        <el-card class="box-card div-button">
          <el-button size="mini" type="primary" plain @click="newTemplet()" class="button-right">新建实体类</el-button>
        </el-card>
      </el-col>
    </el-row>
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
  import createTempletModal from '../../../components/entity/createTempletModal'
  // const api = require('@/api/kg/index')

  export default {
    data() {
      return {
        search: '',
        showNewTempletDialog: false
      }
    },
    methods: {
      editModel(item) {
        this.$router.push({name: 'model.item', params: {id: item.id}})
      },
      newTemplet() {
        this.showNewTempletDialog = true
        // api.models_post({data: {name: '新建实体类'}}).then((data) => {
        //   this.$message('新建实体类成功')
        //   this.$router.push({name: 'model.item', params: {id: data.data.id}})
        // })
      },
      closeModel() {
        this.showNewTempletDialog = false
      }
    },
    components: {createTempletModal, search}
  }
</script>

<style scoped>
  .div-button{
    text-align:right;
    margin-bottom: 10px;
  }
  .button-right{
    text-align:right;
    margin:0px auto 0px auto;
  }
</style>

