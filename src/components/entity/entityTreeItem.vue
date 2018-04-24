<template>
  <div class="">
    <label>
      <el-select
        v-model="data.name"
        filterable
        allow-create
        remote
        reserve-keyword
        placeholder="请输入关键词"
        :remote-method="remoteMethod"
        @blur="remote(data, $event)"
        @keyup.enter.native="remote(data, $event)"
        :loading="loading">
        <el-option
          v-for="item in searchResult"
          :key="item.id"
          :label="item.name"
          :value="item.name"></el-option>
      </el-select>
      <span v-if="data.value && type == 'entity'" class="tag-list">
        <el-tag
          size="mini"
          :key="tag"
          v-for="(tag, $index) in data.value"
          closable
          :disable-transitions="false"
          @click.native="editExpression(tag, $index, data.id, $event)"
          @close="removeTag(tag, data.value)">{{tagRender(tag)}}</el-tag>
        <el-input
          v-if="showInputId == data.id"
          v-model="inputTag"
          ref="saveTagInput"
          size="mini"
          @keyup.enter.native="inputTagConfirm(data.value)"
          @blur="inputTagConfirm(data.value)"></el-input>
      </span>
      <span class="button-group">
        <el-button size="mini" @click="showInput(data.id, node)" v-if="type == 'entity'">+ 新增</el-button>
        <el-button type="text" size="mini" @click="appendNode(data)"
                   icon="el-icon-circle-plus-outline"></el-button>
        <el-button class="new-expression" @click="showDialog = true">新建表达式</el-button>
        <el-button type="text" size="mini" @click="removeNode(node, data)"
                   icon="el-icon-circle-close-outline"></el-button>
      </span>
    </label>
    <new-computed-expression :open.sync="showDialog"
                             @close="closeModel()"
                             :id="id" :mid="mid" :tag="tags"
                             @refreshComputed="refreshComputed"></new-computed-expression>
  </div>
</template>

<script>
  /* eslint-disable no-eval */

  import newComputedExpression from './newComputedExpression'

  const api = require('@/api/index').kg
  export default {
    components: {newComputedExpression},
    props: ['data', 'node', 'type', 'mid', 'id'],
    data() {
      return {
        showInputId: -1,
        searchResult: [],
        loading: false,
        computeCache: {},
        showDialog: false,
        tags: null
      }
    },
    methods: {
      remote(data, event) {
        data.name = event.target.value
      },
      remoteMethod(query) {
        if (!Object.is(query, '')) {
          this.loading = true
          setTimeout(() => {
            api.attributes_keys({path: {mid: this.mid}, params: {searchStr: query}}).then((data) => {
              this.loading = false
              this.searchResult = data.data
            })
          }, 200)
        } else {
          this.searchResult = []
        }
      },
      removeTag(tag, data) {
        data.splice(data.indexOf(tag), 1)
      },
      inputTagConfirm(data) {
        const inputValue = this.inputTag
        if (inputValue) {
          data.push(inputValue)
        }
        this.showInputId = -1
        this.inputTag = ''
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
      showInput(id, node) {
        this.showInputId = id
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus()
        })
      },
      tagRender: function(tag) {
        const _vm = this
        const regBrace = /([^\{\}]+)(?=\})/g
        const regSquare = /\[(.+?)\]/g
        const regParenthesis = /([^\(\)]+)(?=\))/g
        if (Object.is(tag.substr(0, 1), '$')) {
          const idList = tag.match(regBrace)
          const replaceStrs = tag.match(regSquare)

          const promises = []
          for (let p = 0; p < idList.length; p++) {
            if (!_vm.computeCache[idList[p]]) {
              promises.push(api.attributes_id_get({path: {id: idList[p]}}))
            }
          }

          if (promises.length) {
            Promise.all(promises).then((data) => {
              for (let pd = 0; pd < data.length; pd++) {
                _vm.computeCache[data[pd].data.id] = data[pd].data
              }
            })
          }

          let expression = ''
          for (let reg = 0; reg < replaceStrs.length; reg++) {
            const id = replaceStrs[reg].match(regBrace)
            const index = replaceStrs[reg].match(regParenthesis)
            if (!expression.length) {
              expression = tag.replace(replaceStrs[reg], _vm.computeCache[id][index])
            } else {
              expression = expression.replace(replaceStrs[reg], _vm.computeCache[id][index])
            }
          }
          return eval(expression)
        }
        return tag
      },
      closeModel() {
        this.showDialog = false
      },
      editExpression(tag, index, id, event) {
        console.log()
        this.tags = {
          tag: tag,
          index: index,
          id: id
        }
        this.showDialog = true
      },
      refreshComputed(value) {
        this.tags.tag = value
        console.log('--saveComputedExpression--', value)
        this.$emit('saveComputedExpression', value, this.tags)
      }
    }
  }
</script>

<style scoped>
</style>

