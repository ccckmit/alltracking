var userManager = module.exports = {}
var userTable

userManager.init = function (pUserTable) {
  userTable = pUserTable
}

userManager.login = function (id, password) {
//  console.log('user: id=%j password=%j', id, password)
//  console.log('userTable=%j', userTable)
  var getUser = userTable.find((user) => user.id === id)
//  console.log('getUser=%j', getUser)
  if (getUser.password === password)
    return getUser
}
