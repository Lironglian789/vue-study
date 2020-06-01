// 老杨喊你来搬砖
import Vue from 'vue'

export default function createNotice(Component, props) {
  // 方案1：通过Vue.extend(Component)获取组件构造函数
  // const Constructor = Vue.extend(Component)
  // const Comp = new Constructor({
  //   propsData: {
  //     ...props
  //   }
  // }).$mount()

  // 方案2：借鸡生蛋，借助Vue构造组件实例
  const Comp = new Vue({
    render(h) {
      // h 是createElement函数，可以返回vdom
      // 需要挂载才能变成真实的dom
      return h(Component, {props})
    }
  }).$mount() // $mount()目标：将vdom=》dom，不指定宿主元素，会创建真丝dom，但是不会追加操作

  document.body.appendChild(Comp.$el)

  Comp.remove = () => {
    document.body.removeChild(Comp.$el)
    Comp.$destroy()
  }

  return Comp
}