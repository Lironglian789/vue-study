
// 全局定义，install时传入，而不是直接引入Vue，是为了减轻插件的包，直接引入会打包进来
let Vue  

//  构建VueRouter类 new VueRouter({routers:[...]})
class VueRouter {
  constructor (options) {
    this.$options = options // 保存选项备用

    // 处理router
    this.routerMap = {}
    this.$options.routes.forEach((route) => {
      this.routerMap[route.path] = route
    })
    // 设置响应式的current 保存当前的url 用于匹配当前组件==》渲染当前组件
    Vue.util.defineReactive(this, 'current', '/')

    // 监听哈希变化 bind(this) 锁死this指向为当前实例，否则会指向window
    window.addEventListener('hashchange', this.onHashChange.bind(this))
  }
  onHashChange(){
    // 修改当前url hash格式 #/xxx
    this.current = window.location.hash.slice(1)
    console.log(this.current)
  }
}

// 实现静态方法install， Vue.use()时调用，参数1是Vue的构造函数
VueRouter.install = function (_Vue) {
  Vue = _Vue

  // 1. 挂载VueRouter实例 引入mixin是为了拿到Vue跟实例中的注入的router实例
  Vue.mixin({
    beforeCreate() {
      if (this.$options.router) {
        Vue.prototype.$router = this.$options.router
      }
    }
  })

  // 2. 注册两个组件 router-link router-view
  Vue.component('router-link', {
    props: {
      to: {
        type: String,
        default: ''
      }
    },
    render (h) {
      return h('a', {attrs: {href: '#' + this.to}}, this.$slots.default)
      // jsx 实现 但不推荐，因为这是插件封装，不可能要求使用者必须去配置JSX环境
      // return <a href={'#' + this.to}>{this.$slot.default} </a>
    }
  })
  Vue.component('router-view', {
    render (h) {
      const {routerMap, current} = this.$router
      const component = routerMap[current]? routerMap[current].component : null
      return h(component)
    }
  })
  


}

export default VueRouter