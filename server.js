// var fs = require('mz/fs')
var logger = require('koa-logger')
var koaStatic = require('koa-static')
var bodyParser = require('koa-bodyparser')
// var cobody = require('co-body')
// var asyncBusboy = require('async-busboy')
var path = require('path')
var session = require('koa-session')
var model = require('./lib/model')
var view = require('./lib/view')
var Koa = require('koa')
var Router = require('koa-router')

var app = new Koa()
var router = new Router()
// authentication
const passport = require('./lib/auth')
/* const passport = require('koa-passport') */
app.use(passport.initialize())
app.use(passport.session())

app.keys = ['#*$*#$)_)*&&^^']

var CONFIG = {
  key: 'koa:sess', // (string) cookie key (default is koa:sess)
  maxAge: 86400000, // (number) maxAge in ms (default is 1 days)
  overwrite: true, // (boolean) can overwrite or not (default true)
  httpOnly: true, // (boolean) httpOnly or not (default true)
  signed: true // (boolean) signed or not (default true)
}

app.use(logger())
app.use(session(CONFIG, app))
app.use(bodyParser())
app.use(koaStatic(path.join(__dirname, 'web')))

router
.get('/', function (ctx, next) {
  ctx.redirect('/book/home.md')
})
/*
.post('/user/login', function (ctx, next) {
  console.log('/user/login start')
  let body = ctx.request.body
  console.log('body = %j', body)
  return passport.authenticate('local', function (err, user, info, status) {
    console.log('user=%j info=%j status=%j', user, info, status)
    if (user) {
        ctx.body = 'Y'
        return ctx.login(user)
    } else {
        ctx.body = info
    }
  })(ctx, next)
})
*/
.post('/user/login', passport.authenticate('local', {
  successRedirect: '/user/success.md',
  failureRedirect: '/user/fail.md'
}))
.get('/user/logout', function (ctx) {
  ctx.logout()
  ctx.redirect('/user/success.md')
})
.get('/auth/facebook', passport.authenticate('facebook'))
.get('/auth/facebook/callback',
  passport.authenticate('facebook', {
    successRedirect: '/user/success.md',
    failureRedirect: '/user/fail.md'
  })
)
.get('/:book/:file', view.viewBookFile)

async function main () {
  await model.init()
  view.init(model)
  var port = 3000
  app.use(router.routes()).listen(port)
  console.log('http server started: http://localhost:' + port)
}

main()

/*
var isPass = function (ctx) {
  return typeof ctx.session.user !== 'undefined'
}

var parse = async function (ctx) {
  var json = await cobody(ctx)
  return (typeof json === 'string') ? JSON.parse(json) : json
}

var loginPost = async function (ctx, next) {
  console.log('login()')
  var post = await parse(ctx)
  console.log('  post=%j', post)
  var user = model.login(post.user, post.password)
  if (user != null) {
    response(ctx, 200, 'Login Success!')
    ctx.session.user = user.id
  } else {
  }
}

var logout = async function (ctx, next) {
  delete ctx.session.user
  response(ctx, 200, 'Logout Success!')
}
*/

