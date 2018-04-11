<template>
  <div class="">
    <new-relation-modal :open.sync="showDialog" @close="closeModel()" :item="item"></new-relation-modal>
    <el-card class="box-card">
    <div>
      <el-button style="float: right; padding: 3px 0" type="text" @click="showDialog = true">新建关系</el-button>
      <!--<el-button type="primary" plain @click="showDialog = true" class="entity-relation-float">新建关系</el-button>-->
    </div>
    <el-table
      :data="dataList"
      style="width: 100%"
    >
      <el-table-column
        prop="ename"
        label="实体"
        width="440">
        <template slot-scope="scope">
          <p @click="go(scope.row)"><a>{{scope.row.ename}}</a></p>
        </template>
      </el-table-column>
      <el-table-column
        prop="relation"
        label="关系"
        width="440">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary" plain
            @click="handleEdit(scope.$index, scope.row)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    </el-card>
  </div>
</template>

<script>
  /**
   * 新建关系按钮，和表格
   * 点击新建关系按钮弹出模态框，关闭模态框后刷新本组件数据
   * 表格分为三列，实体（实体链接）|关系（关系描述）|动作（删除按钮）
   */
  import newRelationModal from './newRelationModal'

  const api = require('@/api/kg/index')

  export default {
    props: ['item'],
    data() {
      return {
        showDialog: false,
        dataList: []
      }
    },
    created() {
      this.$watch('item.id', () => {
        this.refreshData()
      })
      this.refreshData()
    },
    methods: {
      go(item) {
        this.$router.push({params: {id: item.eid}})
      },
      handleEdit(index, row) {
        api.relations_id_delete({path: {id: row.rid}}).then((data) => {
          this.$message('删除关系成功')
          this.refreshData()
        })
      },
      refreshData() {
        api.entitys_id_relations_get({path: {id: this.item.id}}).then((data) => {
          this.dataList = data.data
        })
      },
      closeModel() {
        this.showDialog = false
        this.refreshData()
      }
    },
    components: {newRelationModal}
  }
</script>

<style scoped>
  a {
    color: #000;
    text-decoration: underline;
  }
</style>

