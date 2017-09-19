var _ = require('lodash')
var objManager = module.exports = {}
var objTable

objManager.init = function (pObjTable) {
  objTable = pObjTable
}

objManager.filter = function (filter) {
  return _.filter(objTable, filter)
}
