var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var prompt = require('prompt-sync')();
var url = "mongodb://abc1:c65sA1ROXg4rsNEMGLS4AlHDkvqkx4SjwK6LXsKUz1W76tjwR5AtdSP9dpxt3bZyukht050qOG4MZAr00G0DsA==@abc1.mongo.cosmos.azure.com:10255/?ssl=true&replicaSet=globaldb&retrywrites=false&maxIdleTimeMS=120000&appName=@abc1@";

/*
//Database
MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
    var myobj = [
      { name: 'John', address: 'Highway 71'},
      { name: 'Peter', address: 'Lowstreet 4'},
      { name: 'Amy', address: 'Apple st 652'},
      { name: 'Hannah', address: 'Mountain 21'},
      { name: 'Michael', address: 'Valley 345'},
      { name: 'Sandy', address: 'Ocean blvd 2'},
      { name: 'Betty', address: 'Green Grass 1'},
      { name: 'Richard', address: 'Sky st 331'},
      { name: 'Susan', address: 'One way 98'},
      { name: 'Vicky', address: 'Yellow Garden 2'},
      { name: 'Ben', address: 'Park Lane 38'},
      { name: 'William', address: 'Central st 954'},
      { name: 'Chuck', address: 'Main Road 989'},
      { name: 'Viola', address: 'Sideway 1633'}
    ];
    dbo.collection("customers").insertMany(myobj, function(err, res) {
      if (err) throw err;
      console.log("Number of documents inserted: " + res.insertedCount);
      db.close();
    });
  });
*/

//Insert Record
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db('mydb');
  var name = prompt('Enter name : ');
  var add = prompt('Enter address : ');
  var myobj = { name: name, address: add }
  dbo.collection('customers').insertOne(myobj, function(err, res) {
    if (err) throw err;
    console.log("Record inserted");
    db.close();
  });
});

//Query 1 - All address starting from the word Highway
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("mydb");
  var query = { address: /^Highway/ };
  dbo.collection("customers").find(query).toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
    db.close();
  });
});

//Query 2 - All records with name either Chuck or Ben
MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
    var query = { name: /(Chuck|Ben)/g };
    dbo
      .collection("customers")
      .find(query)
      .toArray(function (err, result) {
        if (err) throw err;
        console.log(result);
        db.close();
      });
  });

