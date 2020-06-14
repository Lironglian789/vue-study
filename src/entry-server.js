import { createApp } from './main'
// 首屏渲染， 在服务端执行
// 创建 Vue实例
// renderer
export default context => {
  // 为了让renderer 可以异步处理结果， 这里应该返回Promise
  return new Promise((resolve, reject) => {
    // 创建Vue 实例和路由实例
    const { app, router, store } = createApp(context)
    
    // 获取用户请求url， 从而知道要渲染的那个页面
    // 跳转至首屏
    router.push(context.url)

    // 监听路由器的ready事件，确保异步任务都完成
    router.onReady(() => { 
      // 首先处理异步的请求
      // 货取当前匹配的组件
      const matchCpmponents = router.getMatchedComponents()

      if (!matchCpmponents.length) {
        return reject({ code: 404 })
      }

      Promise.all(matchCpmponents.map((comp) => {
        if (comp.asyncData) {
          return comp.asyncData({
            store,
            route: router.currentRoute
          })
        }
      })).then(() => {
        // 所有预取钩子resolve之后 store已经填充了当前数据Z状态
        // 这些数据需要同步到前端
        // 做一个序列化操作，前端使用window.__INITIAL_STATE__获取
        // 此处赋值给context.state，这是约定
        context.state = store.state
        resolve(app)
      }).catch(reject)
    }, reject)
  })
}