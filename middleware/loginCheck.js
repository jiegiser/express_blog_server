/*
 * @Descripttion: 
 * @Author: jiegiser
 * @Date: 2020-02-11 15:18:50
 * @LastEditors  : jiegiser
 * @LastEditTime : 2020-02-11 15:21:54
 */
const { ErrorModel } = require('../model/resModel')

// 写一个中间件
module.exports = (req, res, next) => {
  if(req.session.username) {
    // 已经登录了
    next()
    return
  }
  res.json(
    new ErrorModel('未登录')
  )
}