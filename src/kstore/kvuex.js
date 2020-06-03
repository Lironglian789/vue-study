let Vue

// 声明Store 类
class Store {
  constructor (options) {
    // let getterComputed = {}
    // this.getterKeys = Object.keys(options.getters)
    // this.getterKeys.forEach(key => {
    //   getterComputed[key] = function() {
    //     return options.getters[key](this._data.$$state)
    //   }
    // })
    
    this.$options = options
    // data 中的值做响应式处理 用_vm标识私有属性
    this._vm = new Vue({
      data: {
        $$state: options.state
      },
      // computed: {
      //   ...getterComputed
      // },
    })
    // 保存 mutation 和 actions
    this._mutations = options.mutations
    this._actions = options.actions

    // 锁死 commit 和 dipatch 的this指向
    // 方案1
    // this.commit = this.commit.bind(this)
    // this.dipatch = this.commit.dipatch(this)

    // 方案2 
    const store = this
    const {commit, dispath} = store
    this.commit = function boundCommit (type, payload) {
      commit.call(store, type, payload)
    }
    this.dispath = function boundDispath (type, payload) {
      dispath.call(store, type, payload)
    }
    this.handleGetters()
  }

  handleGetters() {
    this.getters = {}
    Object.keys(this.$options.getters).forEach(key => {
      Object.defineProperty(this.getters, key, {
        get: () => {
          return this.$options.getters[key](this.$options.state)
        }
      })
    })
  }
  
  // 存取器使之成为只读
  get state() {
    return this._vm._data.$$state
  }
  // 用户尝试直接进行修改是给出提示
  set state (v) {
    console.log('please use replaceState to reset state')
  }

  // get getters() {
  //   let result = {}
  //   console.log(this._vm)
  //   this.getterKeys.forEach(key => {
  //     result[key] = this._vm[key]
  //   })
  //   return result
  // }

  // commit 修改状态
  commit (type, payload) {
    const entry = this._mutations[type]
    if (!entry) {
      console.log(' no such mutation')
      return
    }
    entry(this.state, payload)
  }
  // dipatch 执行异步任务或者复杂逻辑
  dispath (type, payload) {
    const entry = this._actions[type]
    if (!entry) {
      console.log('no such action')
      return
    }
    entry(this, payload)
  }
}

function install (_Vue) {
    Vue = _Vue
    Vue.mixin({
      beforeCreate () {
        if (this.$options.store) {
          Vue.prototype.$store = this.$options.store
        }
      }
    })
}


// 导出一个对象，作为Vuex
export default {Store, install}