<template>
  <el-dialog :visible.sync="open" :close-on-click-modal="false" center style="cursor: default">
    <el-row style="margin-bottom: 10px">
      <el-input readOnly v-model="readValue" size="small">
        <template slot="prepend">单项表达式</template>
      </el-input>
    </el-row>
    <el-row style="margin-bottom: 10px">
      <el-form :model="form" :rules="rules" ref="ruleForm">
        <el-form-item prop="submitValue">
          <el-input v-model="form.submitValue" size="small">
            <template slot="prepend">$(</template>
            <template slot="append">)</template>
          </el-input>
        </el-form-item>
      </el-form>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-card class="box-card">
          <search ajax-path="entitys_get" root-path="xxx" @selected="editEntity"></search>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-tree
          default-expand-all
          :expand-on-click-node="false"
          :data="tree"
          :props="defaultProps">
        <span class="tree-slot-node model" slot-scope="{ node, data }">
          <el-input v-model="data.name" disabled></el-input>
          <span class="tag-list">
            <el-tag
              size="mini"
              :key="tag"
              v-for="(tag, $index) in data.value"
              :disable-transitions="false"
              @click.native="getTag(tag, $index, data.id)">{{tag}}</el-tag>
          </span>
        </span>
        </el-tree>
      </el-col>
    </el-row>
    <span slot="footer" class="dialog-footer">
      <el-button @click="close()">取 消</el-button>
      <el-button type="primary" @click="ok()">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
  const api = require('@/api/index').kg
  import search from '@/components/search/index'
  import entityTree from './entityTree'

  export default {
    components: {search, entityTree},
    props: ['open', 'id', 'mid', 'tag'],
    data() {
      return {
        tid: null,
        tree: [],
        defaultProps: {
          children: 'children',
          label: 'name'
        },
        searchResult: [],
        loading: false,
        readValue: '',
        form: {
          submitValue: ''
        },
        rules: {
          submitValue: [
            { required: true, message: '请输入计算表达式', trigger: 'blur' }]
        }
      }
    },
    mounted() {
      if (this.tag) {
        this.readValue = '[{' + this.tag.id + '}' + '(' + this.tag.index + ')]'
      }
      this.init()
    },
    methods: {
      init() {
        const _vm = this
        _vm.initAjax()
        _vm.$watch('tid', () => {
          _vm.initAjax(_vm.tid)
        })
      },
      initAjax(id) {
        const _vm = this
        let pid = this.id
        if (id) pid = id
        api.entitys_id_get({path: {id: pid}}).then((data) => {
          _vm.tree = data.data.define
          _vm.treeName = data.data.name
          _vm.treeId = data.data.id
          _vm.modelId = data.data.mid
          _vm.modelName = data.data.model
        })
      },
      editEntity(item) {
        this.tid = item.id
      },
      ok() {
        this.$refs.ruleForm.validate(valid => {
          if (valid) {
            this.$emit('refreshComputed', '$(' + this.form.submitValue + ')')
            this.close()
          } else {
            // 提示
            this.$message('输入不能为空')
            return false
          }
        })
      },
      close() {
        this.readValue = null
        this.submitValue = null
        this.$emit('close')
      },
      getTag(tag, index, id) {
        this.readValue = '[{' + id + '}' + '(' + index + ')]'
      }
    }
  }
</script>

<style scoped>
</style>

