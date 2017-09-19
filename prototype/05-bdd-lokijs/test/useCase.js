var expect = require('chai').expect
// var Tracker = require('../lib/tracker')
var user = require('./user')

describe('Tracker', function () {
  describe('testCase.searchObject', function () {
    it('init', function () {
      user.testInit()
    })
    it('login', function () {
      user.testLogin('ccc', '1234567')
    })
    it('search', function () {
      user.testSearchObject()
    })
  })
})

