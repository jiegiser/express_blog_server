/*
 * @Descripttion: 
 * @Author: jiegiser
 * @Date: 2020-01-29 19:14:44
 * @LastEditors: jiegiser
 * @LastEditTime : 2020-02-12 11:53:49
 */
// 处理路由请求出错
var createError = require('http-errors');
var express = require('express');
var path = require('path');
const fs = require('fs')
// 解析cookie  可以通过req.cookie访问cookie内容
var cookieParser = require('cookie-parser');
// 记录日志的插件
var logger = require('morgan');
// 使用express-session处理session
const session = require('express-session')
// 将session存储到redis中
const RedisStore = require('connect-redis')(session)
// 引入两个路由
// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');
const blogRouter = require('./routes/blog')
const userRouter = require('./routes/user')
var app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');
const ENV = process.env.NODE_ENV

// https://github.com/expressjs/morgan 查看打印日志的格式
if(ENV != 'production') {
  // 对日志进行配置
  app.use(logger('dev', {
    // 标准输出，直接输出到控制台
    stream: process.stdout
  }));
} else {
  // 线上环境使用，打印的日志比较详细--将日志写到access.log文件当中
  const logFileName = path.join(__dirname, 'logs', 'access.log')
  const writeStream = fs.createWriteStream(logFileName, {
    flags: 'a'
  })
  app.use(logger('combined', {
    stream: writeStream
  }))
}
// 线上环境使用，打印的日志比较详细
// app.use(logger('combined', {
//   stream: process.stdout
// }))


// 处理post请求的数据，获取content-type=applica/json格式的数据，可以通过req.body获取数据
app.use(express.json());
// 处理post数据，兼容处理json数据
app.use(express.urlencoded({ extended: false }));
// 解析cookie
app.use(cookieParser());

const redisClient = require('./db/redis')
const sessionStore = new RedisStore({
  client: redisClient
})
// 解析session
app.use(session({
  // 密匙
  secret: 'jiegiser_95#',
  cookie: {
    // path: '/', // 模式配置
    // httpOnly: true, // 默认配置
    maxAge: 24 * 60 * 60 * 1000
  },
  // session存储到redis中
  store: sessionStore
}));
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
