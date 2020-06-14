const express = require('express')
const app = express()

// 导入vue构造函数
const Vue = require('vue')

// createRenderer 用于获取渲染器
const { createRenderer } = require('vue-server-renderer')

//  获取渲染器
const renderer = createRenderer()


// 路由和同构
app.get('/', async (req, res) => {
  const vm = new Vue({
    data: {name: 'hello world'},
    template: `
    <div><h1>{{name}}</h1></div>`
  })
  try {
    //  renderToString将vue实例渲染为html字符串，它返回⼀个Promise
    const html = await renderer.renderToString(vm)
    res.send(html)
  } catch(error) {
    res.status(500).send('Internal Server Error')
  }
})

app.listen(3000)