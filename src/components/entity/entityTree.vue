<template>
  <div class="">
    <new-templet-modal :open.sync="showDialog" @close="closeModel()" :tree="tree"></new-templet-modal>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-input v-model="treeName" size="small" style="width: auto"></el-input>
        <el-button style="float: right; padding: 3px 0" type="text" @click="saveTree">保存</el-button>
        <el-button style="float: right; padding: 3px 0; margin-right: 10px;" type="text" @click="showDialog = true">新建模板</el-button>
      </div>
      <el-tree
        default-expand-all
        :expand-on-click-node="false"
        :data="tree"
        :props="defaultProps">
        <span class="tree-slot-node" slot-scope="{ node, data }">
          <label>
            <el-select
              v-model="data.name"
              filterable
              remote
              reserve-keyword
              placeholder="请输入关键词"
              :remote-method="remoteMethod"
              :loading="loading">
              <el-option
                v-for="item in searchResult"
                :key="item.id"
                :label="item.name"
                :value="item.name">
              </el-option>
            </el-select>
            <span v-if="data.value" class="tag-list">
              <el-tag
                size="mini"
                :key="tag"
                v-for="tag in data.value"
                closable
                :disable-transitions="false"
                @close="removeTag(tag, data.value)">
                {{tag}}
              </el-tag>
              <el-input
                v-if="showInputId == data.id"
                v-model="inputTag"
                ref="saveTagInput"
                size="mini"
                @keyup.enter.native="inputTagConfirm(data.value)"
                @blur="inputTagConfirm(data.value)"
              >
              </el-input>
            </span>
            <span class="button-group">
              <el-button size="mini" @click="showInput(data.id, node)">+ 新增</el-button>
              <el-button type="text" size="mini" @click="appendNode(data)"
                         icon="el-icon-circle-plus-outline"></el-button>
              <el-button type="text" size="mini" @click="removeNode(node, data)"
                         icon="el-icon-circle-close-outline"></el-button>
            </span>
          </label>
        </span>
      </el-tree>
      <el-button size="mini" icon="el-icon-plus" @click="appendRootNode">增加根节点</el-button>
    </el-card>
  </div>
</template>

<script>
  import newTempletModal from './newTempletModal'
  const api = require('@/api/index').kg
  export default {
    components: {newTempletModal},
    props: ['id', 'ajaxPath'],
    data() {
      return {
        showDialog: false,
        treeId: '',
        treeName: '',
        tree: [],
        defaultProps: {
          children: 'children',
          label: 'name'
        },
        searchResult: [],
        loading: false,
        showInputId: -1,
        inputTag: ''
      }
    },
    mounted() {
      this.init()
    },
    methods: {
      init() {
        const _vm = this
        _vm.initAjax()
        _vm.$watch('id', () => {
          _vm.initAjax()
        })
      },
      initAjax() {
        const _vm = this
        api[_vm['ajaxPath']['init']]({path: {id: _vm.id}}).then((data) => {
          _vm.tree = data.data.define
          _vm.treeName = data.data.name
          _vm.treeId = data.data.id
        })
      },
      saveTree() {
        const _vm = this
        const content = {
          id: _vm.treeId,
          name: _vm.treeName,
          define: _vm.tree
        }
        api[_vm['ajaxPath']['save']]({path: {id: _vm.id}, data: {json: content}}).then((data) => {
          if (Object.is(data.code, 200)) {
            _vm.$message({
              message: data.msg,
              type: 'success'
            })
          }
        })
      },
      remoteMethod(query) {
        if (!Object.is(query, '')) {
          this.loading = true
          setTimeout(() => {
            api.attributes_keys({params: {searchStr: query}}).then((data) => {
              this.loading = false
              this.searchResult = data.data
            })
          }, 200)
        } else {
          this.searchResult = []
        }
      },
      appendRootNode() {
        const node = {name: '新节点', children: [], value: []}
        this.tree.push(node)
      },
      appendNode(data) {
        const newChild = {name: '新节点', children: [], value: []}
        if (!data.children) {
          this.$set(data, 'children', [])
          this.$set(data, 'value', [])
        }
        data.children.push(newChild)
      },
      removeNode(node, data) {
        const parent = node.parent
        const children = parent.data.children || parent.data
        const index = children.findIndex(d => d.id === data.id)
        children.splice(index, 1)
      },
      removeTag(tag, data) {
        data.splice(data.indexOf(tag), 1)
      },
      showInput(id, node) {
        this.showInputId = id
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus()
        })
      },
      inputTagConfirm(data) {
        const inputValue = this.inputTag
        if (inputValue) {
          data.push(inputValue)
        }
        this.showInputId = -1
        this.inputTag = ''
      },
      closeModel() {
        this.showDialog = false
      }
    }
  }
</script>

<style scoped>
</style>

