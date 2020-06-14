const express = require('express')
const app = express()

// 静态文件服务， 获取⽂件路径
const path = require('path')
const resolve = dir => path.resolve(__dirname, dir)
// 第 1 步：开放dist/client⽬录，关闭默认下载index⻚的选项，不然到不了后⾯路由
app.use(express.static(resolve('../dist/client'), {index: false})) // 关闭默认返回index页面
// 第 2 步：获得⼀个createBundleRenderer, 它可以获取打包生成的json文件
const {createBundleRenderer} = require('vue-server-renderer')
// 第 3 步：服务端打包⽂件地址
const bundle = resolve('../dist/server/vue-ssr-server-bundle.json')
// 第 4 步：创建渲染器, 可以直接渲染vue实例
const renderer = createBundleRenderer(bundle, {
  runInNewContext: false, // https://ssr.vuejs.org/zh/api/#runinnewcontext
  // 宿主文件
  template: require('fs').readFileSync(resolve("../public/index.html"), "utf-8"), // 宿主文件
  clientManifest: require(resolve("../dist/client/vue-ssr-client-manifest.json")) // 客户端清单
})


// 路由和同构
app.get('*', async (req, res) => {
  const context = {
    url: req.url
  }
  try {
    // 渲染获取HTML字符串
    // renderer 会调用，创建Vue实例， 跳转至首屏将它渲染出来
    const html = await renderer.renderToString(context)
    res.send(html)
  } catch(error) {
    res.status(500).send('Internal Server Error')
  }
})

app.listen(3000)