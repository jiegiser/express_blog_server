/*
 * @Descripttion: 
 * @Author: jiegiser
 * @Date: 2020-02-01 14:42:06
 * @LastEditors  : jiegiser
 * @LastEditTime : 2020-02-10 15:57:54
 */
var express = require('express');
var router = express.Router();
const { login } = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../model/resModel')
router.post('/login', function(req, res, next) {
  // // express.json()解析得到的数据存放在req.body
  // const { username, password } = req.body
  // // 返回json格式的数据。相当于之前的res.end(JSON.stringify)
  // res.json({
  //   errmo: 0,
  //   data: {
  //     username,
  //     password
  //   }
  // })
  const { username, password } = req.body
  const result = login(username, password)
  return result.then(data => {
    if(data.username) {
      req.session.username = data.username
      req.session.realname = data.realname
      res.json(new SuccessModel())
      return
    }
    res.json(new ErrorModel('登录失败'))
  })
});

router.get('/login-test', (req, res, next) => {
  if(req.session.username) {
    res.json({
      errno: 0,
      msg: '测试成功'
    })
    return
  }
  res.json({
    errno: -1,
    msg: '测试失败'  
  })
})

router.get('/session-test', (req, res, next) => {
  const session = req.session
  if(session.viewNum == null) {
    session.viewNum = 0
  }
  session.viewNum ++
  res.json({
    viewNum: session.viewNum
  })
})

module.exports = router;
