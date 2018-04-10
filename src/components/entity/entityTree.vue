<template>
  <div class="">
    <el-tree
      default-expand-all
      :expand-on-click-node="false"
      :data="tree"
      :props="defaultProps"
      @node-click="updateNode">
      <span class="tree-slot-node" slot-scope="{ node, data }">
        <label>
          {{ node.label }}
          <span v-if="data.value.length" v-for="v in data.value">{{v}}</span>
        </label>
        <label class="button-group">
          <el-button
            type="text"
            size="mini"
            @click="append(data)">
            <i class="el-icon-circle-plus-outline"></i>
          </el-button>
          <el-button
            type="text"
            size="mini"
            @click="remove(node, data)">
            <i class="el-icon-circle-close-outline"></i>
          </el-button>
        </label>
      </span>
    </el-tree>
  </div>
</template>

<script>
  const api = require('@/api/index').kg
  let id = 1000
  export default {
    props: ['id'],
    data() {
      return {
        name: '',
        tree: [],
        defaultProps: {
          children: 'children',
          label: 'name'
        }
      }
    },
    mounted() {
      this.init()
    },
    methods: {
      init() {
        const _vm = this
        api.entitys_id_get({path: {id: _vm.id}}).then((data) => {
          _vm.tree = data.data.define
          _vm.name = data.data.name
        })
      },
      append(data) {
        const newChild = {id: id++, name: '新节点', children: []}
        if (!data.children) {
          this.$set(data, 'children', [])
        }
        data.children.push(newChild)
      },
      remove(node, data) {
        const parent = node.parent
        const children = parent.data.children || parent.data
        const index = children.findIndex(d => d.id === data.id)
        children.splice(index, 1)
      },
      updateNode(data, node, e) {
        console.log(data)
        console.log(node)
        console.log(e)
      }
    }
  }
</script>

<style scoped>
  .tree-slot-node .button-group {
    margin-left: 10px
  }

  .tree-slot-node .button-group button {
    font-size: 14px;
  }
</style>

