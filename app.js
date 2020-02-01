/*
 * @Descripttion: 
 * @Author: jiegiser
 * @Date: 2020-01-29 19:14:44
 * @LastEditors  : jiegiser
 * @LastEditTime : 2020-01-30 11:29:38
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
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

app.use(logger('dev'));
// 处理post请求的数据，获取content-type=applica/json格式的数据，可以通过req.body获取数据
app.use(express.json());
// 处理
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
