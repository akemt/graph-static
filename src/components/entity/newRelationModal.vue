<template>
  <el-dialog title="提示" :visible.sync="open" :close-on-click-modal="false" center>
    <!--* 新建关系按钮，和表格-->
    <!--* 表格分为三列-->
    <el-row>
      <el-col :span="8">
        <search ajax-path="entitys_get" root-path="xxx" @selected="editEntity"></search>
      </el-col>
      <el-col :span="14" :push="2">
        <el-form :model="createRelationForm" :rules="createRelationRules" ref="createRelationForm">
          <h3 class="title" style="display: none">实体：{{item.id}}</h3>
          <el-form-item prop="ename">
            <span class="svg-container svg-container_login">实体</span>
            <el-input name="ename" type="text" v-model="createRelationForm.ename" :disabled="true"
                      placeholder="请选择实体名称"/>
          </el-form-item>
          <el-form-item prop="relation">
            <span class="svg-container svg-container_login">关系</span>
            <el-select
              style="width: 100%"
              name="relation"
              v-model="createRelationForm.relation"
              filterable
              allow-create
              remote
              reserve-keyword
              placeholder="请输入关系"
              :remote-method="remoteMethod"
              @blur="remote($event)"
              @keyup.enter.native="remote($event)"
              :loading="loading">
              <el-option
                v-for="item in searchResult"
                :key="item.id"
                :label="item.name"
                :value="item.name"></el-option>
            </el-select>
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
    props: ['open', 'item', 'mid'],
    data() {
      const validateType = (rule, value, callback) => {
        if (!isvalidUsername(value)) {
          callback(new Error('输入不能为空'))
        } else {
          callback()
        }
      }
      return {
        createRelationForm: {
          relation: '',
          rid: this.item.id,
          eid: '',
          ename: ''
        },
        createRelationRules: {
          ename: [{required: true, trigger: 'blur', validator: validateType}],
          relation: [{required: true, trigger: 'blur', validator: validateType}]
        },
        searchResult: [],
        loading: false
      }
    },
    methods: {
      editEntity(item) {
        this.createRelationForm.ename = item.name
        this.createRelationForm.eid = item.id
      },
      ok() {
        this.$refs.createRelationForm.validate(valid => {
          if (valid) {
            api.entitys_id_relations_post({path: {id: this.item.id}, data: {json: JSON.stringify(this.createRelationForm)}}).then((data) => {
              // 提示
              this.$message('创建关系成功')
              this.close()
            })
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
      remoteMethod(query) {
        if (!Object.is(query, '')) {
          this.loading = true
          setTimeout(() => {
            api.models_id_relations_get({path: {mid: this.mid}, params: {searchStr: query}}).then((data) => {
              this.loading = false
              this.searchResult = data.data
            })
          }, 200)
        } else {
          this.searchResult = []
        }
      },
      remote(event) {
        this.createRelationForm.relation = event.target.value
      }
    },
    components: {search}
  }
</script>

<style scoped>
</style>

