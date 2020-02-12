/*
 * @Descripttion: 
 * @Author: jiegiser
 * @Date: 2020-02-01 14:42:00
 * @LastEditors  : jiegiser
 * @LastEditTime : 2020-02-12 10:17:43
 */
var express = require('express');
var router = express.Router();
const { getList, getDetail, newBlog, updateBlog, delBlog } = require('../controller/blog')
const { SuccessModel, ErrorModel } = require('../model/resModel')
const loginCheck = require('../middleware/loginCheck')
router.get('/list', (req, res, next) => {
  // 返回json格式的数据。相当于之前的res.end(JSON.stringify)
  // res.json({
  //   errmo: 0,
  //   data: [1, 2, 3]
  // })
  let author = req.query.author || ''
  const keyword = req.query.keyword || ''

  // 判断是否为admin用户
  if(req.query.isadmin) {
    // 管理员界面
    if(req.session.username === null) {
      // 未登录
      res.json(
        new ErrorModel('未登录')
      )
      return
    }
    // 强制查询自己的博客
    author = req.session.username
  }

  const result = getList(author, keyword)
  return result.then(listData => {
    res.json(new SuccessModel(listData))
  })
});
router.get('/detail', (req, res, next) => {
  // 从url中获取id
  const result = getDetail(req.query.id)
  return result.then(data => {
    res.json(
      new SuccessModel(data)
    )
  })
});

// 新建
router.post('/new', loginCheck, (req, res, next) => {
  // 检测是否登录--直接替换成中间件
  // const loginCheckResult = loginCheck(req)
  // if(loginCheckResult) {
  //   // 未登录
  //   return loginCheckResult
  // }
  req.body.author = req.session.username
  const result = newBlog(req.body)
  return result.then(data => {
    res.json(
      new SuccessModel(data)
    )
  })
})

// 更新博客
router.post('/update', loginCheck, (req, res, next) => {
  // 获取文章id
  const result = updateBlog(req.query.id, req.body)
  return result.then(val => {
    if(val) {
      res.json(
        new SuccessModel()
      )
    } else {
      res.json(
        new ErrorModel('更新博客失败')
      )
    }
  })
})

router.post('/del', loginCheck, (req, res, next) => {
  const author = req.session.username
  const result = delBlog(req.query.id, author)
  return result.then(val => {
    if(val) {
      res.json(
        new SuccessModel()
      )
    } else {
      res.json(
        new ErrorModel('删除博客失败')
      )
    }
  }) 
})
module.exports = router;
