/*
 * @Descripttion: 
 * @Author: jiegiser
 * @Date: 2020-01-03 08:12:01
 * @LastEditors  : jiegiser
 * @LastEditTime : 2020-02-10 15:45:24
 */

const { exec, escape } = require('../db/mysql')
const { genPassword } = require('../utils/cryp')
const login = (username, password) => {
  // 防止sql注入
  username = escape(username)

  // 生成加密密码 ---密码没有进行加密，所以取消验证加密后的密码---需要在登录的时候进行密码的加密存储到数据库中
  // password = genPassword(password)
  password = escape(password)
  console.log(username, password)
  // 删除单引号
  const sql = `select username,realname from users where username =${username} and password =${password}`
  return exec(sql).then(rows => {
    return rows[0] || {}
  })
}
module.exports = {
  login
}