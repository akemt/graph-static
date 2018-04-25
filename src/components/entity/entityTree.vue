<template>
  <div class="">
    <new-templet-by-entity-modal :open.sync="showNewTempletByEntityDialog" @close="closeModel()"
                              :id="id"   :tree="tree"></new-templet-by-entity-modal>
    <new-entity-by-templet-modal :open.sync="showNewEntityByTempletDialog" @close="closeModel()"
                                 :id="id"  :tree="tree"></new-entity-by-templet-modal>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span v-if="type == 'entity'&&modelName.length>0" size="small" style="width: auto;">[{{modelName}}]</span>
        <el-input v-model="treeName" size="small" style="width: 60%;"></el-input>
        <el-button style="float: right; padding: 8px 0" type="text" @click="saveTree">保存</el-button>
        <el-button style="float: right; padding: 8px 0; margin-right: 10px;" type="text"
                   @click="showNewTempletByEntityDialog = true" v-if="type == 'entity'">以此实体新建实体类
        </el-button>
        <el-button style="float: right; padding: 8px 0; margin-right: 10px;" type="text"
                   @click="showNewEntityByTempletDialog = true" v-if="type == 'model'">以此实体类新建实体
        </el-button>
      </div>
      <el-tree
        default-expand-all
        :expand-on-click-node="false"
        :data="tree"
        :props="defaultProps">
        <span class="tree-slot-node" slot-scope="{ node, data }">
          <tree-item :data.sync="data" :node="node" :type="type" :mid="modelId" :id="id"></tree-item>
        </span>
      </el-tree>
      <el-button size="mini" icon="el-icon-plus" @click="appendRootNode">增加根节点</el-button>
    </el-card>
  </div>
</template>

<script>
  import newTempletByEntityModal from './newTempletByEntityModal'
  import newEntityByTempletModal from './newEntityByTempletModal'
  import treeItem from './entityTreeItem'

  const api = require('@/api/index').kg
  export default {
    components: {newEntityByTempletModal, newTempletByEntityModal, treeItem},
    props: ['id', 'ajaxPath', 'type'],
    data() {
      return {
        showNewTempletByEntityDialog: false,
        showNewEntityByTempletDialog: false,
        treeId: '',
        treeName: '',
        modelId: '',
        modelName: '',
        tree: [],
        defaultProps: {
          children: 'children',
          label: 'name'
        },
        inputTag: ''
      }
    },
    watch: {
      'id': function() {
        this.initAjax()
      }
    },
    mounted() {
      this.init()
    },
    methods: {
      init() {
        const _vm = this
        _vm.initAjax()
      },
      initAjax() {
        const _vm = this
        api[_vm['ajaxPath']['init']]({path: {id: _vm.id}}).then((data) => {
          _vm.tree = data.data.define
          _vm.treeName = data.data.name
          _vm.treeId = data.data.id
          _vm.modelId = data.data.mid
          _vm.modelName = data.data.model
          if (Object.is(_vm.type, 'model')) {
            _vm.modelId = data.data.id
          }
          _vm.$emit('getModel', _vm.modelId)
        })
      },
      saveTree() {
        const _vm = this
        const content = {
          id: _vm.treeId,
          name: _vm.treeName,
          define: _vm.tree
        }
        api[_vm['ajaxPath']['save']]({path: {id: _vm.id}, data: {json: JSON.stringify(content)}}).then((data) => {
          if (Object.is(data.code, 200)) {
            _vm.$message({
              message: data.msg,
              type: 'success'
            })
          }
        })
      },
      appendRootNode() {
        const node = {name: '新节点', children: [], value: []}
        this.tree.push(node)
      },
      closeModel() {
        this.showNewTempletByEntityDialog = false
        this.showNewEntityByTempletDialog = false
      }
    }
  }
</script>

<style scoped>
</style>

