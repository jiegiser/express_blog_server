/*
 * @Descripttion: 
 * @Author: jiegiser
 * @Date: 2020-02-17 15:08:40
 * @LastEditors: jiegiser
 * @LastEditTime: 2020-02-17 15:08:40
 */
const http = require('http')
const slice = Array.prototype.slice

class LikeExpress {
  constructor() {
    // 存放中间件的列表
    this.routers = {
      all: [], // app.use(...)
      get: [], // app.get(...)
      post: [] // app.post(...)
    }
  }
  // 处理注册
  register(path) {
    const info = {}
    if(typeof path === 'string') {
      info.path = path
      // 从第二个参数开始转换为数组，最终获取到的是一个数组
      info.stack = slice.call(arguments, 1)
    } else {
      info.path = '/'
      // 从第一个参数开始，转换为数组，存入stack
      info.stack = slice.call(arguments, 0)
    }
    return info
  }
  use() {
    const info = this.register.apply(this, arguments)
    this.routers.all.push(info)
  }

  get() {
    const info = this.register.apply(this, arguments)
    this.routers.get.push(info)    
  }
  post() {
    const info = this.register.apply(this, arguments)
    this.routers.post.push(info)       
  }
  match(method, url) {
    let stack = []
    if(url === '/favicon.ico') {
      return stack
    }

    // 获取 routes
    let curRoutes = []
    // 通过use注册的路由不管是get还是post请求都要执行
    curRoutes = curRoutes.concat(this.routers.all)
    // 然后根据请求的类型获取到对应的路由
    curRoutes = curRoutes.concat(this.routers[method])

    curRoutes.forEach(routerInfo => {
      if (url.indexOf(routerInfo.path) === 0) {
        // url === '/api/get-cookie' 且 routeInfo.path === '/'
        // url === '/api/get-cookie' 且 routeInfo.path === '/api'
        // url === '/api/get-cookie' 且 routeInfo.path === '/api/get-cookie'
        stack = stack.concat(routerInfo.stack)
      }
    })
    return stack
  }

  // 核心的 next 机制
  handle(req, res, stack) {
    const next = () => {
      // 拿到第一个匹配的中间件
      const middleware = stack.shift()
      if(middleware) {
        console.log(middleware)
        // 执行中间件函数
        middleware(req, res, next)
      }
    }
    next()
  }

  callback() {
    return (req, res) => {
      res.json = (data) => {
        res.setHeader('Content-type', 'application/json')
        res.end(
          JSON.stringify(data)
        )
      }
      const url = req.url
      const method = req.method.toLowerCase()

      const resultList = this.match(method, url)
      this.handle(req, res, resultList)
    }
  }
  listen(...args) {
    const server = http.createServer(this.callback())
    server.listen(...args)
  }
}

// 工厂函数
module.exports = () => {
  return new LikeExpress()
}