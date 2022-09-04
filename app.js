// 导入 express 模块
const express = require('express')
// 创建 express 的服务器实例
const app = express()
//解析表单数据中间件
app.use(express.urlencoded({ extended: false }))
const joi = require('joi')

const config = require('./config')
const expressJWT = require('express-jwt')

// 响应数据的中间件
app.use(function (req, res, next) {
  // status = 0 为成功； status = 1 为失败； 默认将 status 的值设置为 1，方便处理失败的情况
  res.cc = function (err, status = 1) {
    res.send({
      // 状态
      status,
      // 状态描述，判断 err 是 错误对象 还是 字符串
      message: err instanceof Error ? err.message : err,
    })
  }
  next()
})

// 使用 .unless({ path: [/^\/api\//] }) 指定哪些接口不需要进行 Token 的身份认证
app.use(expressJWT({ secret: config.jwtSecretKey }).unless({ path: [/^\/api\//] }))

//路由
const userRouter = require('./router/user')
app.use('/api',userRouter)

// 错误中间件
app.use(function (err, req, res, next) {
  // 数据验证失败  这里的return是执行了就不会有下面的res执行
  if (err instanceof joi.ValidationError) return res.cc(err)
  
  // 捕获身份认证失败的错误
  if (err.name === 'UnauthorizedError') return res.cc('身份认证失败！')

  // 未知错误
  res.cc(err)
})






// 调用 app.listen 方法，指定端口号并启动web服务器，这个是写在最后
app.listen(3007, function () {
  console.log('api server running at http://127.0.0.1:3007')
})