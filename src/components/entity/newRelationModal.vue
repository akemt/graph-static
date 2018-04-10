<template>
  <el-dialog title="提示" :visible.sync="open" :close-on-click-modal="true" center>
    <!--* 新建关系按钮，和表格-->
    <!--* 表格分为三列-->
    <el-row>
      <el-col :span="8">
        <search ajax-path="entitys_get" root-path="xxx" @selected="editEntity"></search>
      </el-col>
      <el-col :span="14" :push="2">
        <el-form :model="createRelationForm" :rules="createRelationRules" ref="createRelationForm">
          <h3 class="title">实体：{{item.id}}</h3>
          <el-form-item prop="type">
            <span class="svg-container svg-container_login">关系</span>
            <el-input name="type" type="text" v-model="createRelationForm.type" :disabled="true" placeholder="请输入内容"/>
          </el-form-item>
          <el-form-item prop="action">
            <span class="svg-container svg-container_login">动作</span>
            <el-input name="action" type="text" v-model="createRelationForm.action" placeholder="请输入内容"/>
          </el-form-item>
        </el-form>

      </el-col>
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
  import {isvalidUsername} from '@/utils/validate'
  import search from '@/components/search/index'

  export default {
    props: ['open', 'item'],
    data() {
      const validateType = (rule, value, callback) => {
        if (!isvalidUsername(value)) {
          callback(new Error('请输入正确的用户名'))
        } else {
          callback()
        }
      }
      return {
        createRelationForm: {
          type: '',
          action: ''
        },
        createRelationRules: {
          type: [{required: true, trigger: 'blur', validator: validateType}],
          action: [{required: true, trigger: 'blur', validator: validateType}]
        }
      }
    },
    methods: {
      editEntity(id) {
        console.log('edit', id)
        this.createRelationForm.type = id
      },
      ok() {
        this.$refs.createRelationForm.validate(valid => {
          if (valid) {
            // this.loading = true
            const newEntity = {
              name: this.item.name,
              type: this.createRelationForm.type,
              action: this.createRelationForm.action
            }
            this.$emit('newEntiry', newEntity)
            api.entitys_post(newEntity).then((data) => {
              console.log('创建成功', data)
            })
            this.close()
          } else {
            console.log('error submit!!')
            return false
          }
        })
        // do something
        // const newEntity = {
        //   name: this.item.name,
        //   type: this.type,
        //   action: this.action
        // }
        // this.$emit('newEntiry', newEntity)
        // api.entitys_post(newEntity).then((data) => {
        //   console.log('创建成功', data)
        // })
        // this.close()
      },
      close() {
        this.$emit('close')
      }
    },
    components: {search}
  }
</script>

<style scoped>
</style>

