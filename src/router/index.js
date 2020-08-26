import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/components/login.vue'
import Home from '@/components/home.vue'
import Welcome from '@/components/welcome.vue'
import Users from '@/components/user/Users.vue'
import Rights from '@/components/power/Rights.vue'
import Roles from '@/components/roles/Roles.vue'
import Cate from '@/components/goods/cate.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login },
  {
    path: '/home',
    component: Home,
    redirect: '/welcome',
    children: [
      { path: '/welcome', component: Welcome },
      { path: '/users', component: Users },
      { path: '/rights', component: Rights },
      { path: '/roles', component: Roles },
      { path: '/cate', component: Cate }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

// // 挂载路由导航守卫
// router.beforeEach((to, form, next) => {
//   // to代表将要访问的页面
//   if (to.path === '/login') return next()
//   // 获取token
//   const tokenStr = window.sessionStorage.getItem('token')
//   if (!tokenStr) return next('/login')
//   next()
// })
export default router
