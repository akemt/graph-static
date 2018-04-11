<template>
  <el-dialog title="提示" :visible.sync="open" :close-on-click-modal="false" center>
    <!--* 新建关系按钮，和表格-->
    <!--* 表格分为三列-->
    <el-row>
      <el-form>
        <el-form-item>
          <span class="svg-container svg-container_login">模板名</span>
          <el-input type="text" v-model="templetName" placeholder="请输入关系"/>
        </el-form-item>
      </el-form>
    </el-row>
    <span slot="footer" class="dialog-footer">
      <el-button @click="close()">取 消</el-button>
      <el-button type="primary" @click="ok()">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
  /**
   * 新建关系按钮，和表格
   * 表格分为三列
   */
  const api = require('@/api/kg/index')

  export default {
    props: ['open', 'tree'],
    data() {
      return {
        templetName: null,
        templetTree: null
      }
    },
    methods: {
      ok() {
        api.models_post({name: this.templetName}).then((data) => {
          const id = data.data.id
          this.templetTree = Object.assign({}, this.tree)
          this.cleanEntityValue(this.templetTree)
          api.models_id_get({id: id, name: this.templetName, define: this.templetTree}).then((data) => {
            this.close()
            this.$router.push({name: 'model.item', params: {id: id}})
          })
        })
      },
      close() {
        this.$emit('close')
      },
      cleanEntityValue(tree) {
        for (var index in tree) {
          tree[index].value = ''
          if (tree[index].children) {
            this.cleanEntityValue(tree[index].children)
          }
        }
      }
    }
  }
</script>

<style scoped>
</style>

