/*
 * @Descripttion: 
 * @Author: jiegiser
 * @Date: 2020-01-29 19:14:44
 * @LastEditors  : jiegiser
 * @LastEditTime : 2020-02-10 08:50:06
 */
// 处理路由请求出错
var createError = require('http-errors');
var express = require('express');
var path = require('path');
// 解析cookie  可以通过req.cookie访问cookie内容
var cookieParser = require('cookie-parser');
// 记录日志的插件
var logger = require('morgan');
// 引入两个路由
// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');
const blogRouter = require('./routes/blog')
const userRouter = require('./routes/user')
var app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

app.use(logger('dev'));
// 处理post请求的数据，获取content-type=applica/json格式的数据，可以通过req.body获取数据
app.use(express.json());
// 处理post数据，兼容处理json数据
app.use(express.urlencoded({ extended: false }));
// 解析cookie
app.use(cookieParser());
// public文件夹
// app.use(express.static(path.join(__dirname, 'public')));

// 注册路由
// app.use('/', indexRouter);
// 访问/users/
// app.use('/users', usersRouter);
app.use('/api/blog', blogRouter);
app.use('/api/user', userRouter);

// 检测404
app.use(function(req, res, next) {
  next(createError(404));
});

// 处理错误信息
app.use(function(err, req, res, next) {
  // dev环境错误会直接抛出
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'dev' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
