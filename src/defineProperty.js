// 数据响应
function defineReactive (obj, key, val) {
  // 递归处理
  observe(val)
  Object.defineProperty(obj, key, {
    get () {
      console.log('get:' + key + '--' +val)
      return val
    },
    set (newVal) {
      if (newVal !== val) {
        console.log('set:' + newVal)
        observe(newVal)
        val = newVal
      }
    }
  })
}

// let obj = {}
// defineReactive(obj, 'a', 'foo')
// obj.a
// obj.a = 'fooooo'

// 让使对象的所有属性都被拦截
function observe(obj) {
  if (typeof obj !== 'object' || obj == null) {
    return 
  }
  Object.keys(obj).forEach(key => {
    defineReactive(obj, key, obj[key])
  })
}

// let obj = {a: '1', b: '2', c: {baz: 3}}
// observe(obj)
// obj.c
// obj.c.baz

// 由于新增属性无法被拦截，所以必须有特定api做对应响应式拦截
function set (obj, key, val) {
  defineReactive(obj, key, val)
}
let obj = {a: '1', b: '2', c: {baz: 3}}
observe(obj)
// obj.dong = 'dong'
set(obj, 'dong', 'dong')
obj.dong
// obj.c = {foo: 444}
set(obj, 'c', {foo: 444})
obj.c.foo


