var odb = require('./odb')

var db = module.exports = {}

db.init = function () {
  this.database = odb.open('./trackerdb.json')
//  console.log('database=%j', this.database)
  this.userTable = this.database.userTable
  this.objTable = this.database.objTable
}
