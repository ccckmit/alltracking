var gps = module.exports = {
  isStart: false
}

gps.init = function () {

}

gps.start = function () {
  this.isStart = true
}

gps.stop = function () {
  this.isStart = false
}

gps.getCurrentLocation = function () {
  if (this.isStart) {
    return {lat: 24.450, lng: 118.335}
  }
}
