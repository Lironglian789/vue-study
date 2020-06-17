import { extend } from "vue/types/umd"

// 类型的使用
let var1: string // 类型注解
var1 = 'hello'
// var1 = 4 // no ok

// 类型推论
let var2 = true
// var2 = 'aaa' // no ok

// 常用类型：string, number, boolean,undefined,null,symbbol,any
// 结合数组使用
let arr: string[]
arr = ['tom', 'jerry']

// 任意类型
let varAny: any
varAny = 'xx'
varAny = 2

// any 也可以用于数组
let arrAny: any[]
arrAny = [1, true, 'fee']
arrAny[1] = 100

//  函数中的类型约束
function greet(person: string): string {
  return 'hello' + person
}

//  void类型，常⽤于没有返回值的函数
function greet1(): void {
  // 无需return
}

// 类型别名
type FooBar = { foo: string, bar: string }
const aliasType: FooBar = {
  foo: 'foo',
  bar: 'bar'
}

// 联合类型
let union: string | number
union = '1'
union = 2


//  交叉类型： 扩展类型
type First = { first: number }
type Second = { Second: number }
type FirstAndSecond = First & Second


// 函数
// 必填参数
// 可选参数： ？
function greeting(person: string = 'jerry', msg?: string): string {
  return 'hello' + person + msg
}
greeting('Tom')

// 重载: 形参或者返回值的数量或类型区别多个同名函数
// 先声明再实现
function watch(cn1: () => void): void;
function watch(cn1: () => void, cb2: (v1: any, v2: any) => void): void;
// 实现
function watch(cb1: () => void, cb2?: (v1: any, v2: any) => void) {
  if (cb1 && cb2) {
    console.log('重载2')
  } else {
    console.log('重载1')
  }
}

// class 的使用
class Parent {
  private _foo = "foo"; // 私有属性，不能在类的外部访问
  protected bar = "bar"; // 保护属性，可以在⼦类中访问
  // 参数属性：构造函数参数加修饰符，能够定义为成员属性
  constructor(public tua = "tua") { }
  // ⽅法也有修饰符
  private someMethod() { }
  // 存取器：属性⽅式访问，可添加额外逻辑，控制读写性
  get foo() {
    return this._foo;
  }
  set foo(val) {
    this._foo = val;
  }
}

class Child extends Parent {

}
const child =  new Child()  // private 不能继承

// 泛型
