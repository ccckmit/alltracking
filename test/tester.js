/* eslint-disable no-unused-expressions */
var expect = require('chai').expect
var tracker = require('../lib/tracker') // 全域變數，方便測試。

var tester = module.exports = {}
var view

tester.testInit = function () {
  tracker.init()
  view = tracker.view
}

tester.testLogin = function () {
  tester.login({id: 'ccc', password: '123'})
  expect(view.userPage.user).to.be.undefined
  tester.login({id: 'ccc', password: '1234567'})
  expect(view.userPage.user).to.exist
}

tester.login = function (tester) { // id, password
  view.loginPage.show()
  view.loginPage.fill(tester) // id, password
  view.loginPage.submit()
}

tester.testSearchObject = function () {
  view.filterPage.show()
//  view.filterPage.fill({$and: [{type: 'book'}, {'location.lng': {$gt: 118}}, {'location.lng': {$lt: 119}}, {'location.lat': {$gt: 24}}, {'location.lat': {$lt: 25}}]})
  view.filterPage.fill({$and: [{type: 'book'}, {'location.lng': {$between: [118, 119]}}, {'location.lat': {$between: [24, 25]}}]})
  view.filterPage.submit()
  expect(view.objListPage.objList).to.be.an('array').that.is.not.empty
  view.objListPage.show()
  view.objListPage.choose({id: '2'})
  view.objPage.show()
  expect(view.objPage.obj.id).to.equal('2')
}
