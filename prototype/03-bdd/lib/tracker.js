var ui = require('./ui')
var userManager = require('./userManager')
var objManager = require('./objManager')
var db = require('./db')
// var objManager: require('./objManager'),

var tracker = module.exports = {
  ui: ui,
  db: db,
  userManager: userManager,
  objManager: objManager
}

tracker.init = function () {
  db.init()
  userManager.init(db.userTable)
  objManager.init(db.objTable)
  ui.init(userManager, objManager)
}
