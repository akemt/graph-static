<template>
  <el-dialog title="提示" :visible.sync="open" :close-on-click-modal="false" center>
    <!--* 新建关系按钮，和表格-->
    <!--* 表格分为三列-->
    <el-row>
      <el-form :model="templetForm" :rules="createTempletRules" ref="templetForm">
        <el-form-item prop="templetName">
          <span class="svg-container svg-container_login">实体类名</span>
          <el-input name="templetName" type="text" v-model="templetForm.templetName" placeholder="请输入实体类名"/>
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
    props: ['open', 'tree', 'id'],
    data() {
      const validateType = (rule, value, callback) => {
        if (!(value)) {
          callback(new Error('输入不能为空'))
        } else {
          callback()
        }
      }
      return {
        templetForm: {
          templetName: null
        },
        templetTree: null,
        createTempletRules: {
          templetName: [{required: true, trigger: 'blur', validator: validateType}]
        }
      }
    },
    methods: {
      // 新建模板，跳转到模板页面
      createTemplet() {
        api.models_post({data: {name: this.templetForm.templetName, id: this.id}}).then((data) => {
          const id = data.data.id
          this.templetTree = JSON.parse(JSON.stringify(this.tree))
          this.cleanEntityValue(this.templetTree)
          const modelsPostParams = {
            path: {id: id},
            data: {
              json: JSON.stringify({
                name: this.templetForm.templetName,
                define: this.templetTree
              })
            }
          }
          api.models_id_post(modelsPostParams).then((data) => {
            this.close()
            this.$message('新建实体类成功')
            this.$router.push({name: 'model.item', params: {id: id}})
          })
          console.log('this.id', this.id)
          // api.entitys_id_post({
          // path: {
          // id: this.id
          // },
          // data: {
          // json: JSON.stringify({
          // mid: id
          // })
          // }
          // })
        })
      },
      ok() {
        this.$refs.templetForm.validate(valid => {
          if (valid) {
            this.createTemplet()
          } else {
            // 提示
            this.$message('输入不能为空')
            return false
          }
        })
      },
      close() {
        this.$emit('close')
      },
      cleanEntityValue(tree) {
        for (var index in tree) {
          tree[index].value = null
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

