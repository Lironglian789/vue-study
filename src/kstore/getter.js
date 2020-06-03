
//  first blood
// 方法2: 借助Vue的computed属性
let Vue
class Store {
  constructor (options) {
    // 处理拿到的getters
    let getterComputed = {}
    this.getterKeys = Object.keys(options.getters)
    this.getterKeys.forEach(key => {
      getterComputed[key] = function() {
        return options.getters[key](this._data.$$state)
      }
    })
    this._vm = new Vue({
      data: {
        $$state: options.state
      },
      computed: {
        ...getterComputed
      },
    })
  }
  get getters() {
    let result = {}
    console.log(this._vm)
    this.getterKeys.forEach(key => {
      result[key] = this._vm[key]
    })
    return result
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

export default {Store, install}