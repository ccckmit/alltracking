function initMap () {
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 15,
    center: {lat: 24.450606, lng: 118.330145}
  })

  var infoWindow = new google.maps.InfoWindow()

  var markers = objList.map(function (obj, i) {
    var marker = new google.maps.Marker({
      position: obj.location,
      label: obj.type,
    })

    marker.addListener('click', function () {
      var content =
      `<div id="content">
      <div id="bodyContent">
        <p><b>${obj.type}</b> ${obj.title} : <b>${obj.price}</b></p>
        <a href="#obj=${i}">${i}</a>
      </div>
      </div>`
      infoWindow.setContent(content)
      infoWindow.open(map, marker)
    })
    return marker
  })

  var markerCluster = new MarkerClusterer (map, markers,
    {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'})

}

var objList = [
  { type: '書', title: '計算機結構', owner: 'ccc', price: 100, quantity: 1, location: {lat: 24.450606, lng: 118.335100} },
  { type: '書', title: '系統程式', owner: 'ccc', price: 50, quantity: 2, location: {lat: 24.450606, lng: 118.330100} },
  { type: '屋', title: '套房出租', owner: 'snoopy', price: 5000, quantity: 5, location: {lat: 24.455606, lng: 118.330100} },
  { type: '屋', title: '雅房出租', owner: 'snoopy', price: 3000, quantity: 1, location: {lat: 24.455606, lng: 118.335100} },
]

function showObjContent(obj) {
  $('#objType').html(obj.type)
  $('#objTitle').html(obj.title)
  $('#objPrice').html(obj.price)
  $('#objQuantity').html(obj.quantity)
  $('#objOwner').html(`<a href='#owner=${obj.owner}'>${obj.owner}</a>`)
  location.hash = '#objectDetail'
}

window.onhashchange = function () {
  if (location.hash.startsWith('#obj=')) {
    var id = parseInt(location.hash.substring('#obj='.length))
    showObjContent(objList[id])
  }
}
