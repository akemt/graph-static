<template>
  <div>
    搜索框
    {{ajaxPath}}
    {{rootPath}}
    <button @click="selected(1)">selected</button>
  </div>
</template>

<script>
  /**
   * 搜索，点击列表，显示实体编辑界面
   */
  export default {
    name: 'search',
    props: ['ajaxPath', 'rootPath'],
    data() {
      return {
        searchStr: ''
      }
    },
    methods: {
      selected(id) {
        this.$emit('selected', id)
      }
    }
  }
</script>

<style scoped>
</style>
