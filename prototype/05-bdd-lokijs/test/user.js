/* eslint-disable no-unused-expressions */
var expect = require('chai').expect
var tracker = require('../lib/tracker') // 全域變數，方便測試。

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
//  ui.filterPage.fill({$and: [{type: 'book'}, {'location.lng': {$gt: 118}}, {'location.lng': {$lt: 119}}, {'location.lat': {$gt: 24}}, {'location.lat': {$lt: 25}}]})
  ui.filterPage.fill({$and: [{type: 'book'}, {'location.lng': {$between: [118, 119]}}, {'location.lat': {$between: [24, 25]}}]})
  ui.filterPage.submit()
  expect(ui.objListPage.objList).to.be.an('array').that.is.not.empty
  ui.objListPage.show()
  ui.objListPage.choose({id: '2'})
  ui.objPage.show()
  expect(ui.objPage.obj.id).to.equal('2')
}
