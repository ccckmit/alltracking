var expect = require('chai').expect
// var Tracker = require('../lib/tracker')
var user = require('../lib/user')

describe('Tracker', function () {
  describe('testCase.searchObject', function () {
    it('init', function () {
      user.testInit()
    })
    it('login', function () {
      user.testLogin('ccc', '1234567')
    })
    it('search(object=book)', function () {
      user.testSearchObject('ccc', '1234567')
    })
  })
})

