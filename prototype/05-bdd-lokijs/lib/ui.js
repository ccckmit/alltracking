var ui = module.exports = {
  loginPage: {},
  userPage: {},
  filterPage: {},
  objPage: {},
  objListPage: {},
  objMapPage: {}
}

var userManager, objManager

ui.init = function (pUserManager, pObjManager) {
  userManager = pUserManager
  objManager = pObjManager
}

ui.loginPage.show = function () {}

ui.loginPage.fill = function (user) { // id, password
  this.user = user // {id: id, password: password}
}

ui.loginPage.submit = function () {
  ui.userPage.user = userManager.login(this.user.id, this.user.password)
}

ui.filterPage.show = function () {}

ui.filterPage.fill = function (filter) {
//  console.log('filter = %j', filter)
  this.filter = filter
}

ui.filterPage.submit = function () {
  ui.objListPage.objList = objManager.find(this.filter)
//  console.log('objList = %j', objManager.objList)
}

ui.objListPage.show = function () {
//  console.log(objManager.objList)
}

ui.objListPage.choose = function (id) {
  ui.objPage.obj = objManager.choose(id)
}

ui.objPage.show = function () {
// console.log('objPage.obj = %j', ui.objPage.obj)
}
