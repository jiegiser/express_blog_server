/*
 * @Descripttion: 
 * @Author: jiegiser
 * @Date: 2020-02-10 16:16:06
 * @LastEditors  : jiegiser
 * @LastEditTime : 2020-02-10 16:17:11
 */
const redis = require('redis')

const { REDIS_CONF } = require('../config/db')

// 创建客户端
const redisClient = redis.createClient(REDIS_CONF.port, REDIS_CONF.host)

redisClient.on('error', err => {
  console.error(err)
})

module.exports = redisClient