module.exports = {
  devServer: {
    before (app) {
      app.get('/api/list', (req, res) => {
        res.json([
          {id: 1, name:'类型注解', selected: true},
          {id: 2, name: '静态类型检测', selected: false}
        ])
      })
    }
  }
}