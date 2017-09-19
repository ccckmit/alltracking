// var odb = require('./odb')
var loki = require('lokijs')
var tdb = new loki('tracker.db')

var db = module.exports = {}

db.init = function () {
  this.tables = require('./trackerdb.json')
  this.userTable = db.loadTable(tdb, 'userTable', this.tables.userList)
  this.objTable = db.loadTable(tdb, 'objTable', this.tables.objList)
}

db.loadTable = function (tdb, tableName, list) {
  var table = tdb.addCollection(tableName)
  for (var obj of list) {
    table.insert(obj)
  }
  return table
}

db.save = function () {
  tdb.saveDatabase()
}
