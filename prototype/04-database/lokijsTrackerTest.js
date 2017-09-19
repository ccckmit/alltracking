var loki = require('lokijs')
var db = new loki('sandbox.db')

// Add a collection to the database
var objTable = db.addCollection('objTable');

var currentLocation = {"lat": 24.455606, "lng": 118.330100}
var objArray = [
    { "id": "1", "type": "book", "title": "計算機結構", "owner": "ccc", "price": 100, "quantity": 1, "location": {"lat": 24.450606, "lng": 118.335100} },
    { "id": "2", "type": "book", "title": "系統程式", "owner": "ccc", "price": 50, "quantity": 2, "location": {"lat": 24.450606, "lng": 118.330100} },
    { "id": "3", "type": "room", "title": "套房出租", "owner": "snoopy", "price": 5000, "quantity": 5, "location": {"lat": 24.455606, "lng": 118.330100} },
    { "id": "4", "type": "room", "title": "雅房出租", "owner": "snoopy", "price": 3000, "quantity": 1, "location": {"lat": 24.455606, "lng": 118.335100} },
    { "id": "5", "type": "book", "title": "JavaScript Foundation", "owner": "mike", "price": 3000, "quantity": 1, "location": {"lat": 23.455606, "lng": 5.335100} },
]

for (var obj of objArray) {
  objTable.insert(obj)
}

// Find and update an existing document
var sp = objTable.findOne({'title': '系統程式'})
console.log('sp: %j', sp)
sp.owner = 'snoopy'
objTable.update(sp)

var snoopyObjList = objTable.find({'owner': 'snoopy'})
console.log('snoopyObjList: %j', snoopyObjList)

objTable.remove(sp)

var nearObjList = objTable.find({$and: [{'location.lng': {$gt: 118}}, {'location.lng': {$lt: 119}}, {'location.lat': {$gt: 24}}, {'location.lat': {$lt: 25}}]})
console.log('nearObjList: %j', nearObjList)

db.saveDatabase()