const Koa = require('koa')
const koaStatic = require('koa-static')
const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')
const { database } = require('./mongodb') 
const GraphqlRouter = require('./router')

const app = new Koa()
const router = new Router()
const port = 4000

database() //链接数据库并执行初始化模型

app.use(bodyParser())
app.use(koaStatic(__dirname + '/public'))

router.use('', GraphqlRouter.routes())

app.use(router.routes()).use(router.allowedMethods)

app.listen(port)

console.log('server listen port  ' + port)


