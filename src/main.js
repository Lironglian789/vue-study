import Vue from 'vue'
import App from './App.vue'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import createNotice from '@/utils/creatNotice.js'
import Notice from '@/components/Notice'

Vue.use(Element)

Vue.config.productionTip = false
// 时间总线
Vue.prototype.$bus = new Vue()
Vue.prototype.$Notice = function (props) {
  return createNotice (Notice, props)
}

new Vue({
  render: h => h(App),
}).$mount('#app')
