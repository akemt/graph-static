<template>
  <div>
    <el-input placeholder="请输入内容" v-model="searchStr" @keyup.enter.native="search">
      <template slot="append">
        <el-button type="success" @click="search">搜索</el-button>
      </template>
    </el-input>
    <ul class="entitys-list">
      <li v-for="item in list" @click="select(item)">{{item.name}}</li>
    </ul>
  </div>
</template>

<script>
  const api = require('@/api/index').kg
  /**
   * 搜索，点击列表，显示实体编辑界面
   */
  export default {
    name: 'search',
    props: ['ajaxPath', 'rootPath'],
    data() {
      return {
        searchStr: '',
        list: []
      }
    },
    methods: {
      search() {
        const vm = this
        api[vm.ajaxPath]({searchStr: vm.searchStr}).then((data) => {
          vm.list = data.data
        })
      },
      select(item) {
        this.$emit('selected', item)
      }
    }
  }
</script>

<style scoped>
  ul.entitys-list {
    list-style: none;
    padding: 0 10px
  }
  ul.entitys-list li {
    cursor: pointer;
    padding: 5px 0;
    font-size: 14px;
  }
  ul.entitys-list li:hover {
    color: #409eff;
    font-size: 15px;
  }

</style>
