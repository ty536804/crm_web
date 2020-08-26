<template>
  <div>
    <!-- 面包屑导航区 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item><a href="/">权限管理</a></el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图 -->
    <el-card>
      <el-table :data="rightList" border stripe>
        <el-table-column type="index">#</el-table-column>
        <el-table-column label="权限名称" prop="authName"></el-table-column>
        <el-table-column label="路径" prop="path"></el-table-column>
        <el-table-column label="权限等级" prop="level">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.level==1">一级标签</el-tag>
            <el-tag type="success" v-else-if="scope.row.level==2">二级标签</el-tag>
            <el-tag type="warning" v-else>三级标签</el-tag>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      rightList: [
        {
          id: 1,
          authName: 'admin',
          path: null,
          level: 1,
          statues: 1
        },
        {
          id: 4,
          authName: 'admin111',
          path: null,
          level: 2,
          statues: 1
        }
      ]
    }
  },
  created () {
    this.getRightList()
  },
  methods: {
    getRightList () {

    }
  }
}
</script>

<style>
</style>
