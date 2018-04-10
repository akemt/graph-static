<template>
  <div class="app-container">
    <new-relation-modal :open.sync="showDialog" @close="closeModel()" :item="item" @newEntiry="test"></new-relation-modal>
    <!--<button @click="showDialog = true">新建关系</button>-->
    <div><p class="entity-relation-p">实体：{{item.id}}</p>
      <el-button type="primary" plain @click="showDialog = true" class="entity-relation-float">新建关系</el-button>
    </div>
    <el-table
      :data="dataList"
      style="width: 100%">
      <el-table-column
        prop="name"
        label="实体"
        width="440">
      </el-table-column>
      <el-table-column
        prop="id"
        label="关系"
        width="440">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary" plain
            @click="handleEdit(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
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
        dataList: [],
        exampleItem: {
          name: 'j20',
          type: '555',
          action: 'fly'
        }
      }
    },
    methods: {
      handleEdit(index, row) {
        console.log('index', index)
        console.log('row', row)
      },
      closeModel() {
        this.showDialog = false
        api.entitys_id_relations_get(this.item.id).then((data) => {
          this.dataList = data.data
        })
      },
      test(el) {
        console.log('传出来了' + el.action)
      }
    },
    components: {newRelationModal}
  }
</script>

<style scoped>
</style>

