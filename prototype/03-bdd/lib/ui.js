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
  this.filter = filter
}

ui.filterPage.submit = function () {
  objManager.filter(this.filter)
}

ui.objListPage.show = function () {}

ui.objListPage.choose = function (id) {
  ui.objPage.obj = objManager.choose({id: id})
}

ui.objPage.show = function () {
  console.log('chooseObject = %j', objManager.chooseObject)
}
