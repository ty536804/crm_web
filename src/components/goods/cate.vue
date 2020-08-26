<template>
  <div>
    <!-- 面包屑导航区 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item><a href="/">商品管理</a></el-breadcrumb-item>
      <el-breadcrumb-item>商品列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 内容区 -->
    <el-card>
      <!-- 添加角色按钮区 -->
      <el-row>
        <el-col>
          <el-button type="primary" @click="showAddDialog">添加分类</el-button>
        </el-col>
      </el-row>
      <tree-table :data="cateList" :columns="columns" :selection-type="false"
      :expand-type="false" show-index index-text="#" border :show-row-hover="false" class="treeTable">
        <!-- 是否有效 -->
        <template slot="isok" slot-scope="scope">
          <i class="el-icon-success" v-if="scope.row.cat_deleted===false" style="color: lightgreen;"></i>
          <i class="el-icon-error" v-else style="color: red;"></i>
        </template>
        <!-- 排序 -->
        <template slot="order" slot-scope="scope">
          <el-tag size="mini" v-if="scope.row.cat_level===0">一级标签</el-tag>
          <el-tag type="success" size="mini" v-else-if="scope.row.cat_level===1">二级标签</el-tag>
          <el-tag type="warning" size="mini" v-else>三级标签</el-tag>
        </template>
        <template slot="opt">
          <el-button type="primary" class="el-icon-edit" size="mini">编辑</el-button>
          <el-button type="danger" class="el-icon-delete" size="mini">删除</el-button>
        </template>
      </tree-table>
      <!-- 分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </el-card>
    <!-- 添加分类对话框 -->
    <el-dialog
      title="添加分类"
      width="50%"
      :visible.sync="addCartdialogVisible" @close="addCateDialogClosed">
      <!-- 添加分类表单 -->
      <el-form :model="addCateForm" :rules="addCateRules" ref="addCateFormRef" label-width="100px">
        <el-form-item label="分类名称:" prop="cat_name">
          <el-input v-model="addCateForm.cat_name"></el-input>
        </el-form-item>
        <el-form-item label="父级分类:">
           <!-- options 用来指定数据源 -->
           <!-- props 指定绑定对象 -->
           <el-cascader
              expand-trigger="hover" :options="parentCateList"
              :props="cascaderProps" v-model="selectedKeys"
              @change="parentChange" change-on-select clearable>
          </el-cascader>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addCartdialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addCartdialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      queryInfo: {
        type: 3,
        pagenum: 1,
        pagesize: 10
      },
      cateList: [
        {
          cat_id: 1,
          cat_name: '大家电',
          cat_pid: 0,
          cat_level: 0,
          cat_deleted: false,
          children: [
            {
              cat_id: 3,
              cat_name: '电视',
              cat_pid: 1,
              cat_level: 1,
              cat_deleted: false,
              children: [
                {
                  cat_id: 6,
                  cat_name: '曲面电视',
                  cat_pid: 3,
                  cat_level: 2,
                  cat_deleted: false
                },
                {
                  cat_id: 7,
                  cat_name: '海信',
                  cat_pid: 3,
                  cat_level: 2,
                  cat_deleted: false
                }
              ]
            }
          ]
        }
      ],
      columns: [
        {
          label: '分类名称',
          prop: 'cat_name'
        },
        {
          label: '是否有效',
          // 表示，将当前列定义为模板列
          type: 'template',
          // 表示当前和一列使用模板名称
          template: 'isok'
        },
        {
          label: '排序',
          // 表示，将当前列定义为模板列
          type: 'template',
          // 表示当前和一列使用模板名称
          template: 'order'
        },
        {
          label: '操作',
          // 表示，将当前列定义为模板列
          type: 'template',
          // 表示当前和一列使用模板名称
          template: 'opt'
        }
      ],
      total: 0,
      addCartdialogVisible: false,
      // 添加分类表单数据
      addCateForm: {
        cat_name: '',
        cat_pid: 0,
        cat_level: 0
      },
      // 添加分类表单验证
      addCateRules: {
        cat_name: [
          { required: true, message: '请添写分类名称', trigger: 'blur' }
        ]
      },
      parentCateList: [],
      cascaderProps: {
        value: 'cat_id',
        lable: 'cat_name',
        children: 'children'
      },
      // 选中的父级分类ID数组
      selectedKeys: []
    }
  },
  created () {
    this.getCateList()
  },
  methods: {
    getCateList () {

    },
    // 监听pagesize改变的事件
    handleSizeChange (newsize) {
      this.queryInfo.pagesize = newsize
    },
    handleCurrentChange (newpagenum) {
      this.queryInfo.pagenum = newpagenum
    },
    // 添加按钮添加
    showAddDialog () {
      this.getParentList()
      this.addCartdialogVisible = true
    },
    // 获取父级分类列表数据
    getParentList () {
      this.parentCateList = this.cateList
    },
    // 选择项发生变化，触发
    parentChange () {
    },
    addCateDialogClosed () {
      this.$refs.addCateFormRef.resetFields()
    }
  }
}
</script>

<style scoped>
  .treeTable{
    margin-top: 15px;
  }
  .el-cascader{
    width: 100%;
  }
</style>
