# vue-practise

## Project setup
```
npm install
```
server
├────simple-ssr.js 简版的ssr实现
├────ssr.js 完整版的ssr实现
src
├── router
├────── index.js # 路由声明
├── store
├────── index.js # 全局状态
├── main.js # ⽤于创建vue实例
├── entry-client.js # 客户端⼊⼝，⽤于静态内容“激活”
├──entry-server.js # 服务端⼊⼝，⽤于⾸屏内容渲染
└──vue.config.js 配置文件


每次修改之后重新打包并重启 
打包：npm run build
重启：node server/ssr.js


```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


