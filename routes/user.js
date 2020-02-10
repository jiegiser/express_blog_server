/*
 * @Descripttion: 
 * @Author: jiegiser
 * @Date: 2020-02-01 14:42:06
 * @LastEditors  : jiegiser
 * @LastEditTime : 2020-02-01 15:19:34
 */
var express = require('express');
var router = express.Router();

router.post('/login', function(req, res, next) {
  // express.json()解析得到的数据存放在req.body
  const { username, password } = req.body
  // 返回json格式的数据。相当于之前的res.end(JSON.stringify)
  res.json({
    errmo: 0,
    data: {
      username,
      password
    }
  })
});

module.exports = router;
