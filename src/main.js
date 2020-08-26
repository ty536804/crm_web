import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import TreeTable from 'vue-table-with-tree-grid'
// 导入全局样式表
import './assets/css/global.css'

// 导入 NProgress对应的js和css
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import Qs from 'qs'

import Axios from 'axios'
// 配置请求根路径
Axios.defaults.baseURL = 'http://127.0.0.1:8000/api/v1/'
Axios.withCredentials = true
// 在request 拦截器中，展示进度条  NProgress.start()
Axios.interceptors.request.use(config => {
  console.log(config)
  NProgress.start()
  // var token = window.sessionStorage.getItem('token')
  // config.headers.Authorization = token
  return config
})
// 在response 拦截器中，隐藏进度条 NProgress.done
Axios.interceptors.response.use(config => {
  NProgress.done()
  return config
})

Vue.prototype.$http = Axios
Vue.prototype.$qs = Qs
Vue.config.productionTip = false

Vue.component('tree-table', TreeTable)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
