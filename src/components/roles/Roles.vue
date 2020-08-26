<template>
  <div>
    <!-- 面包屑导航区 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item><a href="/">权限管理</a></el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 内容区 -->
    <el-card>
      <!-- 添加角色按钮区 -->
      <el-row>
        <el-col>
          <el-button type="primary">添加角色</el-button>
        </el-col>
      </el-row>
      <el-table :data="roleList" border stripe>
        <el-table-column type="expand">
          <template slot-scope="scope">
            <el-row :class="['bdbottom', i1===0 ? 'bdtop' : '', 'vcenter']" v-for="(item,i1) in scope.row.children" :key="item.id">
              <!-- 渲染一级权限 -->
              <el-col :span="5">
                <el-tag closable @close="removeRightById(scope.row,item.id)">{{item.roleName}}</el-tag>
                <i class="el-icon-caret-right"></i>
              </el-col>
              <!-- 渲染二级和三级权限 -->
              <el-col :span="19">
                <!-- 通过for循环嵌套渲染二级权限 -->
                <el-row :class="[i2 ===0 ? '' : 'bdtop', 'vcenter']" v-for="(item2,i2) in item.children" :key="item2.id">
                  <el-col :span="6">
                    <el-tag type="success" closable @close="removeRightById(scope.row,item2.id)">{{item2.roleName}}</el-tag>
                    <i class="el-icon-caret-right"></i>
                  </el-col>
                  <el-col :span="18">
                    <el-tag closable v-for="(item3) in item2.children" :key="item3.id" type="warning" @close="removeRightById(scope.row,item3.id)">{{item3.roleName}}</el-tag>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column label="角色名称" prop="roleName"></el-table-column>
        <el-table-column label="角色描述" prop="roleDesc"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
              <el-button type="primary" icon="el-icon-edit" size="mini">编辑</el-button>
              <el-button type="danger" icon="el-icon-delete" size="mini" @click="removeById(scope.row.id)">删除</el-button>
              <el-button type="warning" icon="el-icon-setting" size="mini" @click="showSetRightDialog(scope.row)">分配权限</el-button>
            </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 分配权限 -->
    <el-dialog
      title="分配权限"
      :visible.sync="setRightDialogVisible"
      width="50%">
      <!-- 树形控件 -->
      <el-tree
      :default-checked-keys="defKeys"
      default-expand-all
      :data="roleList"
      :props="treeProps"
      show-checkbox node-key="id"
      ref="treeRef"
      ></el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button @click="setRightDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="allRights">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      roleList: [
        {
          id: 1,
          roleName: '主管',
          roleDesc: '技术负责人',
          level: 1,
          children: [{
            id: 2,
            roleName: '商品管理',
            roleDesc: '技术负责人',
            level: 1,
            children: [{
              id: 7,
              roleName: '商品列表',
              roleDesc: '分类参数',
              level: 1,
              children: [
                {
                  id: 15,
                  roleName: '商品修改',
                  roleDesc: '商品修改',
                  level: 1
                }
              ]
            },
            {
              id: 8,
              roleName: '分类参数',
              roleDesc: '分类参数',
              level: 1,
              children: [
                {
                  id: 16,
                  roleName: '获取参数列表',
                  roleDesc: '商品修改',
                  level: 1
                },
                {
                  id: 17,
                  roleName: '创建商品参数',
                  roleDesc: '商品修改',
                  level: 1
                },
                {
                  id: 18,
                  roleName: '删除商品参数',
                  roleDesc: '商品修改',
                  level: 1
                }
              ]
            },
            {
              id: 9,
              roleName: '商品分类',
              roleDesc: '分类参数',
              level: 1,
              children: [
                {
                  id: 19,
                  roleName: '添加分类',
                  roleDesc: '商品修改',
                  level: 1
                },
                {
                  id: 20,
                  roleName: '删除分类',
                  roleDesc: '商品修改',
                  level: 1
                },
                {
                  id: 21,
                  roleName: '获取分类详情',
                  roleDesc: '商品修改',
                  level: 1
                }
              ]
            }]
          },
          {
            id: 3,
            roleName: '订单管理',
            roleDesc: '技术负责人',
            level: 1,
            children: [{
              id: 10,
              roleName: '订单列表',
              roleDesc: '分类参数',
              level: 1,
              children: [{
                id: 22,
                roleName: '添加订单',
                roleDesc: '分类参数',
                level: 1
              }]
            }]
          },
          {
            id: 93,
            roleName: '权限管理',
            roleDesc: '技术负责人',
            level: 1,
            children: [{
              id: 11,
              roleName: '角色列表',
              roleDesc: '分类参数',
              level: 1
            },
            {
              id: 12,
              roleName: '角色列表',
              roleDesc: '权限列表',
              level: 1,
              children: [
                {
                  id: 11,
                  roleName: '查看权限',
                  roleDesc: '分类参数',
                  level: 1
                }
              ]
            }]
          },
          {
            id: 5,
            roleName: '用户管理',
            roleDesc: '技术负责人',
            level: 1,
            children: [{
              id: 13,
              roleName: '用户列表',
              roleDesc: '分类参数',
              level: 1
            }]
          },
          {
            id: 6,
            roleName: '数据统计',
            roleDesc: '技术负责人',
            level: 1,
            children: [{
              id: 14,
              roleName: '数据报表',
              roleDesc: '分类参数',
              level: 1
            }]
          }]
        },
        {
          id: 4,
          roleName: '测试角色',
          roleDesc: '测试角色描述',
          level: 2,
          statues: 1
        }
      ],
      setRightDialogVisible: false,
      rightsData: [],
      // 树形控件绑定对象
      treeProps: {
        label: 'roleName',
        children: 'children'
      },
      defKeys: [13, 15],
      // 当前即将分配权限的角色id
      roleId: ''
    }
  },
  created () {
    this.getRoleList()
  },
  methods: {
    getRoleList () {
    },
    removeById () {

    },
    // 删除
    async removeRightById (row, rightId) {
      const confirmResult = await this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      if (confirmResult !== 'confim') {
        return this.$message.info('取消了')
      }
      // const { data: res } = await this.$http.delete(`/del/${row.id}/${rightId}`)
      // console.log(res)
      // role.children = res.data
    },
    // 分配权限
    showSetRightDialog (row) {
      this.roleId = row.id
      this.setRightDialogVisible = true
    },
    // 获取要修改的权限
    allRights () {
      // const keys = [
      //   ...this.$refs.treeRef.getCheckedNodes(),
      //   ...this.$refs.treeRef.getHalfCheckedNodes()
      // ]
      // const idStr = keys.join(',')
    }
  }
}
</script>

<style scoped lang="less">
  .el-tag{
    margin: 7px;
  }
  .bdtop{
    border-top: 1px solid #eee;
  }
  .bdbottom{
    border-bottom: 1px solid #eee;
  }
  .vcenter{
    display: flex;
    align-items: center;
  }
</style>
