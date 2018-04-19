<template>
  <el-dialog title="提示" :visible.sync="open" :close-on-click-modal="false" center>
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
  const api = require('@/api/kg/index')

  export default {
    props: ['open'],
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
        createTempletRules: {
          templetName: [{required: true, trigger: 'blur', validator: validateType}]
        }
      }
    },
    methods: {
      // 新建模板，跳转到模板页面
      newTemplet() {
        api.models_post({data: {name: this.templetForm.templetName}}).then((data) => {
          this.close()
          this.$message('新建实体类成功')
          this.$router.push({name: 'model.item', params: {id: data.data.id}})
        })
      },
      ok() {
        this.$refs.templetForm.validate(valid => {
          if (valid) {
            this.newTemplet()
          } else {
            // 提示
            this.$message('输入不能为空')
            return false
          }
        })
      },
      close() {
        this.$emit('close')
      }
    }
  }
</script>

<style scoped>
</style>

