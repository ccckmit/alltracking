// var _ = require('lodash')
var objManager = module.exports = {}
var objTable

objManager.init = function (pObjTable) {
  objTable = pObjTable
}

objManager.find = function (filter) {
//  return _.filter(objTable, filter)
//  console.log('filter=%j', filter)
  this.objList = objTable.find(filter)
  return this.objList
}

objManager.choose = function (filter) {
  this.chooseObj = objTable.findOne(filter)
  return this.chooseObj
}
