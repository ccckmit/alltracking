var odb = module.exports = {}

odb.open = function (dbPath) {
  this.db = require(dbPath)
  return this.db
}
