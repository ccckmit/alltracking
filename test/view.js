var V = module.exports = {
  loginPage: {},
  userPage: {},
  filterPage: {},
  objPage: {},
  objListPage: {},
  objMapPage: {}
}

V.init = function (pModel) {
  V.model = pModel
}

V.loginPage.show = function () {}

V.loginPage.fill = function (user) { // id, password
  this.user = user // {id: id, password: password}
}

V.loginPage.submit = function () {
  V.userPage.user = V.model.login(this.user.id, this.user.password)
}

V.filterPage.show = function () {}

V.filterPage.fill = function (filter) {
//  console.log('filter = %j', filter)
  this.filter = filter
}

V.filterPage.submit = function () {
  V.objListPage.objList = V.model.findObjects(this.filter)
//  console.log('objList = %j', objManager.objList)
}

V.objListPage.show = function () {
//  console.log(objManager.objList)
}

V.objListPage.choose = function (id) {
  V.objPage.obj = V.model.chooseObject(id)
}

V.objPage.show = function () {
// console.log('objPage.obj = %j', V.objPage.obj)
}

