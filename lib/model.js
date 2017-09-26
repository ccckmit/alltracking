var M = module.exports = {
  db: require('./db'),
  gps: require('./gps'),
}

M.init = function () {
  M.db.init()
  M.gps.init()
}

M.login = function (id, password) {
  let getUser = M.db.userTable.findOne({id: id})
  if (getUser != null && getUser.password === password) {
    this.user = getUser
    return getUser
  }
}

M.findObjects = function (filter) {
  this.objList = M.db.objTable.find(filter)
  return this.objList
}

M.chooseObject = function (filter) {
  this.chooseObj = M.db.objTable.findOne(filter)
  return this.chooseObj
}
