import Vue from 'vue'
import App from './App.vue'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import createNotice from '@/utils/creatNotice.js'
import Notice from '@/components/Notice'
// import store from './store'
// import router from './router'

import store from './kstore'
import router from './krouter'

Vue.use(Element)

Vue.config.productionTip = false
// 时间总线
Vue.prototype.$bus = new Vue()
Vue.prototype.$Notice = function (props) {
  return createNotice (Notice, props)
}

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
