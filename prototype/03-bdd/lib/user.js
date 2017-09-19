var expect = require('chai').expect
var tracker = global.tracker = require('./tracker') // 全域變數，方便測試。

var user = module.exports = {}
var ui

user.testInit = function () {
  tracker.init()
  ui = tracker.ui
}

user.testLogin = function () {
  user.login({id: 'ccc', password: '123'})
  expect(ui.userPage.user).to.be.undefined
  user.login({id: 'ccc', password: '1234567'})
  expect(ui.userPage.user).to.exist
}

user.login = function (user) { // id, password
  ui.loginPage.show()
  ui.loginPage.fill(user) // id, password
  ui.loginPage.submit()
}

user.testSearchObject = function () {
  ui.filterPage.show()
  ui.filterPage.fill({type: 'book'})
  ui.filterPage.submit()
  ui.objListPage.show()
/*
  ui.objListPage.choose({id: '2'})
  ui.objPage.show()
  expect(ui.objPage.id).to.equal('2')
*/  
}
