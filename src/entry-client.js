import { createApp } from './main'
// 客户端激活， 在浏览器执行
//创建Vue实例

const { app, router, store } = createApp()

// 当使⽤ template 时，context.state 将作为 window.__INITIAL_STATE__ 状态⾃动嵌⼊到最终的 HTML 
// 在客户端挂载到应⽤程序之前，store 就应该获取到状态：
if (window.__INITIAL_STATE__) {
  store.replaceState(window.__INITIAL_STATE__);
}

// 等待router就绪， 挂载激活
router.onReady (() => {
  app.$mount('#app')
})