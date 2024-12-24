import App from './App'
import store from '@/store/index.js'

// #ifndef VUE3
import Vue from 'vue'
import './uni.promisify.adaptor'
Vue.config.productionTip = false
Vue.prototype.$store = store
App.mpType = 'app'



const app = new Vue({
	store,
  ...App
})
app.$mount()
// #endif


// #ifdef VUE3
import { createSSRApp } from 'vue'

export function createApp() {
  const app = createSSRApp(App)
  app.config.globalProperties.$store = store;
  app.use(store)
  // 添加 onLaunch 钩子函数

  return {
    app,
  }
}
// #endif
