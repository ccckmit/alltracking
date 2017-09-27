var marked = require('marked')
var fs = require('mz/fs')
var path = require('path')

marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: false,
  smartLists: true,
  smartypants: false
})

var V = module.exports = {
  loginPage: {},
  userPage: {},
  objFilterPage: {},
  objTablePage: {},
  objMapPage: {},
  objPage: {},
}

V.init = function (pModel) {
  V.model = pModel
}

V.sendHtml = function (ctx, code, msg) {
  ctx.type = 'text/html; charset=utf-8'
  ctx.code = code
  ctx.body = msg
}

V.sendBookFile = async function (ctx, book, file) {
  ctx.type = 'text/html; charset=utf-8'
  ctx.body = await V.renderBookFile(book, file)
  ctx.code = 200
}

V.viewBookFile = async function (ctx, next) {
  console.log('ctx.isAuthenticated() = ', ctx.isAuthenticated())
  console.log('ctx.state.user=', ctx.state.user)
  return V.sendBookFile(ctx, ctx.params.book, ctx.params.file)
}

V.renderBookFile = async function (book, file) {
  let bookJson = await fs.readFile(path.join(__dirname, '../view', book, 'book.json'), 'utf8')
  let fileText = await fs.readFile(path.join(__dirname, '../view', book, file), 'utf8')
  let fileHtml = fileText
  if (file.endsWith('.md')) {
    fileHtml = marked(fileText)
  }
  let bookObj = JSON.parse(bookJson)
  return V.renderBookHtml(bookObj, fileHtml)
}

V.bookSideMenu = function (bookObj) {
  let links = []
  for (let part of bookObj.parts) {
    links.push(`<a href="${part.link}">${part.title}</a>`)
  }
  return links.join('\n')
}

V.renderBookHtml = function (bookObj, fileHtml) {
  return `
<html>
<head>
  <meta name="viewport" content="initial-scale=1.0, user-scalable=no"/>
  <meta charset="utf-8"/>  
  <link rel="stylesheet" type="text/css" href="/main.css"/>
  <title>${bookObj.title}</title>
</head>
<body>
<div id="sideMenu" class="sidenav">
  <a href="javascript:void(0)" class="closebtn" onclick="closeNav()">&times;</a>
  <a id="homeBtn" href="/book/home.md">&#x1F3E0;</a>
  <div id="sideBar">
    ${V.bookSideMenu(bookObj)}
  </div>
</div>
<div>
  <span id="sideBarController" onclick="openNav()">&#9776;</span>
  <span id="userController" class="dropdown">
    <button onclick="taggleButtonMenu()" class="dropbtn">&#x1F464;</button>
    <div id="userDropdown" class="dropdown-content">
      <a href="/user/login.html">Login</a>
      <a href="/user/logout">Logout</a>
      <a href="/user/signup.html">Signup</a>
    </div>
  </span>
  <span id="main">
    <div id="mainHtml" class="center fullwidth">
    ${fileHtml}
    </div>
  </span>
</div>
<script src="https://cdnjs.cloudflare.com/ajax/libs/showdown/1.7.4/showdown.min.js"></script>
<script src="/main.js"></script>
</body>
</html>  
`
}


// ---------------------------- Tracker -------------------------------

V.loginPage.show = async function (ctx, next) {
  await V.sendFile(ctx, 'login.html')
}

V.loginPage.fill = function (user) {
  this.user = user
}

V.loginPage.submit = function () {
  V.userPage.user = V.model.login(this.user.id, this.user.password)
}

V.objFilterPage.show = async function (ctx, next) {
  await V.sendFile(ctx, 'objFilter.html')
}

V.objFilterPage.fill = function (filter) {
//  console.log('filter = %j', filter)
  this.filter = filter
}

V.objFilterPage.submit = function () {
  V.objTablePage.objTable = V.model.findObjects(this.filter)
//  console.log('objList = %j', objManager.objList)
}

V.objMapPage.show = async function (ctx, next) {
  await V.sendFile(ctx, 'objMap.html')
}

V.objTablePage.show = async function (ctx, next) {
  await V.sendFile(ctx, 'objTable.md')
}

V.objTablePage.choose = function (id) {
  V.objPage.obj = V.model.chooseObject(id)
}

V.objPage.show = async function (ctx, next) {
  await V.sendFile(ctx, 'obj.html')
}

