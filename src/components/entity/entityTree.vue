<template>
  <div class="">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>{{name}}</span>
        <el-button style="float: right; padding: 3px 0" type="text">保存</el-button>
      </div>
      <el-tree
        default-expand-all
        :expand-on-click-node="false"
        :data="tree"
        :props="defaultProps">
        <span class="tree-slot-node" slot-scope="{ node, data }">
        <label>
          <!--<span v-show="show(data.$treeNodeId)" @click="editTitle(node, data)">{{ node.label }}</span>-->
          <el-input v-model="data.name" size="mini"></el-input>
          <span v-if="data.value.length" class="tag-list">
            <el-tag
              size="mini"
              :key="tag"
              v-for="tag in data.value"
              closable
              :disable-transitions="false"
              @close="handleClose(tag)">
              {{tag}}
            </el-tag>
            <el-input
              class="input-new-tag"
              v-if="inputVisible"
              v-model="inputValue"
              ref="saveTagInput"
              size="small"
              @keyup.enter.native="handleInputConfirm"
              @blur="handleInputConfirm"
            >
            </el-input>
            <el-button v-else class="" size="mini" @click="showInput">+ 新增</el-button>
          </span>
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
    </el-card>
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
        },
        inputVisible: false,
        inputValue: ''
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
      handleClose(tag) {
        this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
      },

      showInput() {
        this.inputVisible = true;
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus();
        });
      },

      handleInputConfirm() {
        let inputValue = this.inputValue;
        if (inputValue) {
          this.dynamicTags.push(inputValue);
        }
        this.inputVisible = false;
        this.inputValue = '';
      }
    }
  }
</script>

<style scoped>
</style>

