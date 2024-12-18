import App from './App'

// #ifndef VUE3
import Vue from 'vue'
import './uni.promisify.adaptor'
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
  ...App
})
app.$mount()
// #endif
// #ifdef VUE3
import { createSSRApp } from 'vue'

export function createApp() {
  const app = createSSRApp(App)
  // 将 axios 挂载到 Vue 3 应用的全局配置上
  // import axios from 'src/utils/axios.js'
  // app.config.globalProperties.$axios = axios;
  return {
    app
  }
}

// app.$ip = "localhost"
// 设置全局变量
// #endif