var expect = require('chai').expect
// var Tracker = require('../lib/tracker')
var tester = require('./tester')

describe('Tracker', function () {
  describe('testCase.searchObject', function () {
    it('init', function () {
      tester.testInit()
    })
    it('login', function () {
      tester.testLogin('ccc', '1234567')
    })
    it('search', function () {
      tester.testSearchObject()
    })
  })
})
