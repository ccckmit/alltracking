// var odb = require('./odb')
var loki = require('lokijs')
var tdb = new loki('tracker.db')

/**
 * Tracker 的資料庫管理模組
 * @name db
 */
var db = module.exports = {}

/** Database Initialize */
db.init = function () {
  this.tables = require('./trackerdb.json')
  this.userTable = db.loadTable(tdb, 'userTable', this.tables.userList)
  this.objTable = db.loadTable(tdb, 'objTable', this.tables.objList)
}

/** load a json list into table in tdb */
db.loadTable = function (tdb, tableName, list) {
  var table = tdb.addCollection(tableName)
  for (var obj of list) {
    table.insert(obj)
  }
  return table
}

/** save database into file tracker.db */
db.save = function () {
  tdb.saveDatabase()
}
