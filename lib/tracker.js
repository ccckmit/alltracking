var model = require('./model')
var view = require('./view')
// var objManager: require('./objManager'),

var tracker = module.exports = {
  model: model,
  view: view
}

/**
 * @name init
 * @function
 * @return nothing
 */
tracker.init = function () {
  model.init()
  view.init(model)
}
