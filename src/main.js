import Vue from 'vue'
import App from './App.vue'
import createRouter from './router'
import { createStore } from './store'

Vue.config.productionTip = false

// 添加一个全局混入：beforeMount钩子在服务端不会触发，所以这个混入只会在客户端执行
Vue.mixin({
  beforeMount () {
    const {asyncData} = this.$options
    if (asyncData) {
      // 如果存在则执行异步调用
      asyncData ({
        store: this.$store,
        route: this.$route
      })
    }
  }
})


// 导出Vue实例⼯⼚函数，为每次请求创建独⽴实例
// 将被entry-server调用，上下⽂⽤于给vue实例传递参数
export function createApp (context) {
 const router =  createRouter ()
 const store = createStore()
  const app = new Vue({
    router,
    store,
    context, 
    render: h => h(App)
  }).$mount('#app') 
  return {app, router, store}
}
