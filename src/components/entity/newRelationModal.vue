<template>
  <el-dialog
    title="提示"
    :visible.sync="open"
    :close-on-click-modal="false"
    center>
    * 新建关系按钮，和表格
    * 表格分为三列
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
  export default {
    props: ['open'],
    methods: {
      ok() {
        // do something
        this.close()
      },
      close() {
        this.$emit('close')
      }
    }
  }
</script>

<style scoped>
</style>

