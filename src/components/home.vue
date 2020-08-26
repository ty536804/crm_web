<template>
  <el-container>
    <!-- 头部区 -->
    <el-header>
      <div>
        <img src="../assets/logo.png" alt="CRM" class="logo">
        <span>CRM</span>
      </div>
      Header<el-button type="infor" @click="logout">退出</el-button>
    </el-header>
    <!-- 页面主体区 -->
    <el-container>
      <!-- 侧边栏 -->
      <el-aside :width="isCollapse ? '64px' : '200px'">
            <div class="taggle-button" @click="toggleCollapse">|||</div>
            <el-menu
              background-color="#333744"
              text-color="#fff"
              active-text-color="#ffd04b"
              unique-opened
              :collapse="isCollapse"
              :collapse-transition="false"
              router
              :default-active="avitvePath">
              <!-- 一级菜单 -->
              <el-submenu :index="item.id + '' " v-for="item in menuList" :key="item.id">
                <!-- 一级菜单的模板区域 -->
                <template slot="title">
                  <!-- 图标 -->
                  <i class="el-icon-s-home"></i>
                  <!-- 文本 -->
                  <span>{{item.authoName}}</span>
                </template>
                <!-- 二级菜单 -->
                <el-menu-item :index="'/' + subItem.path"
                v-for="subItem in item.children"
                :key="subItem.id"
                @click="saveNavState('/' + subItem.path)">
                  <template slot="title">
                    <!-- 图标 -->
                    <i class="el-icon-arrow-right"></i>
                    <!-- 文本 -->
                    <span>{{subItem.authoName}}</span>
                  </template>
                </el-menu-item>
              </el-submenu>
            </el-menu>
      </el-aside>
      <!-- 左侧内容 -->
      <el-main>
        <!-- 路由展位符 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data () {
    return {
      menuList: [{
        id: 1,
        authoName: '基础设置',
        children: [
          { id: 2, authoName: '网站信息', path: 'sites' },
          { id: 3, authoName: '会员列表', path: 'users' }
        ]
      },
      {
        id: 4,
        authoName: '权限管理',
        children: [
          { id: 5, authoName: '角色列表', path: 'roles' },
          { id: 6, authoName: '权限列表', path: 'rights' }
        ]
      },
      {
        id: 7,
        authoName: '商品管理',
        children: [
          { id: 8, authoName: '角色列表', path: 'roles' },
          { id: 9, authoName: '商品管理', path: 'cate' }
        ]
      }],
      isCollapse: false,
      avitvePath: ''
    }
  },
  created () {
    // this.getMenuList()
    this.avitvePath = window.sessionStorage.getItem('activePath')
  },
  methods: {
    logout: function () {
      window.sessionStorage.clear()
      this.$router.push('/login')
    },
    // async getMenuList () {
    //   const { data: res } = await this.$http.get('/menus')
    //   console.log(res)
    // },
    // 点击按钮 展开与收缩
    toggleCollapse () {
      this.isCollapse = !this.isCollapse
    },
    // 保存状态
    saveNavState (activePath) {
      window.sessionStorage.setItem('activePath', activePath)
      this.avitvePath = activePath
    }
  }
}
</script>

<style scoped>
  .el-container {
    height: 100%;
  }
  .el-header {
    background: #373D41;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #fff;
    font-size: 20px;
    > div {
      display: flex;
      align-items: center;
      span {
        margin-left: 15px;
      }
    }
  }
  .logo {
    width: 20px;
    height: 20px;
  }
  .el-aside {
    background: #333744;
    .el-menu{
      border-right: none;
    }
  }
  .el-main {
     background: #EAEDF1;
  }
  .taggle-button{
    background-color: #4A5064;
    color: #fff;
    font-size: 10px;
    line-height: 24px;
    text-align: center;
    letter-spacing: 0.2em;
    cursor: pointer;
  }
</style>
