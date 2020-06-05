// 数据响应
function defineReactive (obj, key, val) {
  // 递归处理
  observe(val)

  const dep = new Dep()
  Object.defineProperty(obj, key, {
    get () {
      // console.log('get', key);
      // 依赖收集: 把watcher和dep关联
      Dep.target && dep.addDep(Dep.target)
      return val
    },
    set (newVal) {
      if (newVal !== val) {
        // console.log('set', key, newVal);
        observe(newVal)
        val = newVal
        dep.notify()
      }
    }
  })
}

// 使一个对象所有属性都被拦截
function observe(obj) {
  if (typeof obj !== 'object' || obj == null) {
    return 
  }
  // 创建Observer实例： 以后出现一个对象，就会有一个Observer实例
  new Observer(obj)
}

// 代理data中数据
function proxy(vm) {
  Object.keys(vm.$data).forEach(key => {
    Object.defineProperty(vm, key, {
      get() {
        return vm.$data[key]
      },
      set(v) {
        vm.$data[key] = v
      }
    })
  })
}

// 响应式操作
class KVue {
  constructor (options) {
    this.$el = options.el
    this.$options = options
    this.$data = options.data

    // 作响应处理
    observe(this.$data)
    // 代理data
    proxy(this)
    // 编译
    new Compiler(this.$el, this)
  }
}

// 做数据响应话
class Observer {
  constructor(value) {
    this.value = value
    this.walk(value)
  }
  // 遍历对象做响应式
  walk(obj) {
    Object.keys(obj).forEach(key => {
      defineReactive(obj, key, obj[key])
    })
  }
}

// Compiler: 解析模板，找到依赖，并和前面拦截的属性关联起来
// new Compiler('#app', vm)
class Compiler {
  constructor (el, vm) {
    this.$vm = vm
    this.$el = document.querySelector(el)

    // 执行编译
    this.compile(this.$el)
  }
  compile(el) {
    el.childNodes.forEach(node => {
      // 是否是元素
      if (node.nodeType === 1) {
        console.log('编译元素', node.nodeName)
        this.compileElement(node)
      } else if (this.isInter(node)) {
        console.log('编译文本', node.textContent);
        this.compileText(node)
      }
      // 递归
      if (node.childNodes) {
        this.compile(node)
      }
    })
  }
  // 文本节点且形如{{xx}}
  isInter (node) {
    return node.nodeType === 3 && /\{\{(.*)\}\}/.test(node.textContent)
  }
  compileElement (node) {
    // 处理元素上面的属性，典型的是v-，@开头的
    const attrs = node.attributes
    Array.from(attrs).forEach((attr) => {
      // attr:   {name: 'k-text', value: 'counter'}
      const attrName = attr.nodeName
      const value = attr.value
      if (attrName.indexOf('v-') === 0) {
        const dirName = attrName.substring(2)
        this[dirName] && this[dirName](node, value)
        if (dirName === 'model') {
          node.addEventListener('input',  (event) =>  {
            this.$vm[value] = event.target.value
          })
        }
      }
      if (attrName.indexOf('@') === 0) {
        const eventName = attrName.substring(1)
        node.addEventListener(eventName,  (event) =>  {
          this.$vm.$options.methods[value].call(this.$vm, event)
        })
      }
    }) 
  }
  compileText(node, ) {
    // node.textContent = this.$vm[RegExp.$1]
    this.update (node, RegExp.$1, 'text')
  }
  text (node, exp) {
    // node.textContent = this.$vm[exp]
    this.update (node, exp, 'text')
  }
  html (node, exp) {
    // node.innerHTML = this.$vm[exp]
    this.update (node, exp, 'html')
  }
  model(node, exp) {
    this.update (node, exp, 'model')
  }
  update (node, exp, dirName) {
    // 初始化
    const fn = this[dirName + 'Updater']
    fn && fn(node, this.$vm[exp])
    // 更新
    new Watcher(this.$vm, exp, val => {
      fn && fn(node, val)
    })
  }
  modelUpdater(node, val) {
    node.value = val
  }
  textUpdater (node, val) {
    node.textContent = val
  }
  htmlUpdater(node, val) {
    node.innerHTML = val
  }
}

// 管理一个依赖，未来执行更新
class Watcher {
  constructor (vm, key, updateFun) {
    this.vm = vm
    this.key = key
    this.updateFun = updateFun 

    // 读一下当前key，触发依赖收集
    Dep.target = this
    vm[key]
    Dep.target = null
  }
  // 未来会被dep调用
  update() {
    this.updateFun.call(this.vm, this.vm[this.key])
  }
}

// Dep: 保存所有watcher实例，当某个key发生变化，通知他们执行更新
class Dep {
  constructor() {
    this.deps = []
  }
  addDep (watcher) {
    this.deps.push(watcher)
  }
  notify() {
    this.deps.forEach(dep => dep.update())
  }
}
