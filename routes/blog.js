/*
 * @Descripttion: 
 * @Author: jiegiser
 * @Date: 2020-02-01 14:42:00
 * @LastEditors  : jiegiser
 * @LastEditTime : 2020-02-10 09:18:19
 */
var express = require('express');
var router = express.Router();
const { getList, getDetail, newBlog, updateBlog, delBlog } = require('../controller/blog')
const { SuccessModel, ErrorModel } = require('../model/resModel')
router.get('/list', function(req, res, next) {
  // 返回json格式的数据。相当于之前的res.end(JSON.stringify)
  // res.json({
  //   errmo: 0,
  //   data: [1, 2, 3]
  // })
  let author = req.query.author || ''
  const keyword = req.query.keyword || ''

  // 判断是否为admin用户
  // if(req.query.isadmin) {
  //   // 管理员界面
  //   const loginCheckResult = loginCheck(req)
  //   if(loginCheckResult) {
  //     // 未登录
  //     return loginCheckResult
  //   }
  //   // 强制查询自己的博客
  //   author = req.session.username
  // }

  const result = getList(author, keyword)
  return result.then(listData => {
    res.json(new SuccessModel(listData))
  })
});
router.get('/detail', function(req, res, next) {
  res.json({
    errmo: 0,
    data: 'ok'
  })
});
module.exports = router;
