@log
class Foo {
  @freeze
  prop: String = '';

  @emit
  func() {
    // ...
    return 123
  }
}

function log(target) {
  console.log('class decorator', target)
}

/**
 * 
 * @param target 类的实例
 * @param key 要装饰的属性
 * @param desc 
 */
function freeze(target, key) {
  console.log('prop decorator', target, key)
}

/**
 * 
 * @param target 类实例
 * @param key 方法名
 */
function emit(target, key) {
  
}

const foo = new Foo()
console.log(foo)