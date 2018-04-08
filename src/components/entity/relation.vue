<template>
  <div class="app-container">
    relation
    <new-relation-modal :open.sync="showDialog" @close="showDialog = false"></new-relation-modal>
    <button @click="showDialog = true">新建关系</button>
  </div>
</template>

<script>
  /**
   * 新建关系按钮，和表格
   * 点击新建关系按钮弹出模态框，关闭模态框后刷新本组件数据
   * 表格分为三列，实体（实体链接）|关系（关系描述）|动作（删除按钮）
   */
  import newRelationModal from './newRelationModal'

  export default {
    data() {
      return {
        showDialog: false
      }
    },
    components: {newRelationModal}
  }
</script>

<style scoped>
</style>

