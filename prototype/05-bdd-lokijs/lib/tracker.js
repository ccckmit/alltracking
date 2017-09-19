var ui = require('./ui')
var userManager = require('./userManager')
var objManager = require('./objManager')
var db = require('./db')
var gps = require('./gps')
// var objManager: require('./objManager'),

var tracker = module.exports = {
  db: db,
  gps: gps,
  userManager: userManager,
  objManager: objManager,
  ui: ui,
}

tracker.init = function () {
  db.init()
  gps.init()
  userManager.init(db.userTable)
  objManager.init(db.objTable)
  ui.init(userManager, objManager)
}
