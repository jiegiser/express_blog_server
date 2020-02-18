/*
 * @Descripttion: 
 * @Author: jiegiser
 * @Date: 2020-02-18 11:19:47
 * @LastEditors: jiegiser
 * @LastEditTime: 2020-02-18 11:19:48
 */

 const express = require('./like-express')

// 本次 http 请求的实例

const app = express()
console.log(app.use)
app.use((req, res, next) => {
  console.log('请求开始', req.method, req.url)
  next()
})

app.use((req, res, next) => {
  // 假设在处理 cookie、
  req.cookie = {
    userId: 'abc123'
  }
  next()
})

app.use('/api', (req, res, next) => {
  console.log('处理 /api 路由')
  next()
})

app.get('/api', (req, res, next) => {
  console.log('get /api 路由')
  next()
})

// 模拟登陆验证
function loginCheck(req, res, next) {
  setTimeout(() => {
    console.log('模拟登陆成功')
    next()
  })
}
app.get('/api/get-cookie', loginCheck, (req, res, next) => {
  console.log('get /api/get-cookoe')
  res.json({
    errno: 0,
    data: req.cookie
  })
})

app.listen(8888, () => {
  console.log('server is running on port 8888')
})