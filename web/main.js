// ------------------- side menu ---------------------
function openNav () {
  document.getElementById('sideMenu').style.width = '15em'
}

function closeNav () {
  document.getElementById('sideMenu').style.width = '0'
}

function login () {
  alert('login')
}

/* When the user clicks on the button, 
toggle between hiding and showing the dropdown content */
function taggleButtonMenu () {
  document.getElementById('userDropdown').classList.toggle('show');
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function (event) {
  if (!event.target.matches('.dropbtn')) {
    var dropdowns = document.getElementsByClassName('dropdown-content')
    var i
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i]
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show')
      }
    }
  }
}

/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/*
var converter = new showdown.Converter()
converter.setFlavor('github')

function md2html (mdText) {
  var mdHtml = converter.makeHtml(mdText)
  document.getElementById('mdHtml').innerHTML = mdHtml
}

function linkOnclick () {
//  [].forEach.call(document.querySelectorAll('a'), function (a) {
  document.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var href = a.getAttribute('href')
      console.log('href=', href)
      if (/^[\w.]+$/.test(href)) {
        window.location.hash = '#' + href
        e.preventDefault()
      }
    }, false)
  })
}

function show () {
  var file = window.location.hash.substring(1)
  console.log('file=', file)
  const req = new window.Request('./' + file, {method: 'GET', cache: 'reload'})
  window.fetch(req).then(function (response) {
    return response.text().then(function (text) {
      if (file.endsWith('.md')) {
        md2html(text)
      } else {
        document.getElementById('mdHtml').innerHTML = text
      }
      linkOnclick()
    })
  }).catch(function (err) {
    window.alert(file + ' load error ! ' + err.message)
  })
}

function load () {
  const req = new window.Request('./book.json', {method: 'GET', cache: 'reload'})
  window.fetch(req).then(function (response) {
    return response.json().then(function (json) {
//      console.log('json=', json)
      var partHtml = []
      for (let part of json.parts) {
        partHtml.push(`<a href="${part.link}">${part.title}</a>`)
      }
//      console.log('partHtml=', partHtml)
      document.getElementById('sideBar').innerHTML = partHtml.join('\n')
    })
  }).catch(function (err) {
    window.alert('load error ! ' + err.message)
  })

  show()
}

window.addEventListener('hashchange', show)
window.addEventListener('load', load)
*/
