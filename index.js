const express = require('express');
const cors = require('cors');
var bodyParser = require('body-parser')
var app = express()

//DEFINE DB================================================================

const dbImport = require('./config/database.js')
let mongo = dbImport.mongo
let databaseName = dbImport.databaseName
let entriesCollection = dbImport.entriesCollection
let MongoClient = dbImport.MongoClient
let url = dbImport.url

//MIDDLEWARE================================================================

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//ROUTES================================================================

app.get('/', (req, res) => {
    showAllEntries(req, res)
});

app.get('/entries/add', (req, res) => {
    addNewEntry(req, res)
});

app.get('/entries/delete', (req, res) => {
    deleteEntry(req, res)
});

//START SERVER================================================================

var PORT = process.env.PORT || 4000;

app.listen(PORT, function () {
    console.log('Server listening on Port ' + PORT + '...' )
})

//FUNCTIONS BY ACTION////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//Show All Entries
function showAllEntries(req, res){
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db(databaseName);
        var mysort = { dueDate: -1 };
        dbo.collection(entriesCollection).find({}).sort(mysort).toArray(function (err, result) {
            if (err) throw err;
            db.close();
            return res.json({
                data: result
            })
        });
    })
}

//Add New Entry
function addNewEntry(req, res){
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db(databaseName);
        var myobj = { dueDate: req.query.dueDate, taskDescription: req.query.taskDescription };
        dbo.collection(entriesCollection).insertOne(myobj, function (err, res) {
            if (err) throw err;
            console.log("1 document inserted");
            console.log(myobj)
            db.close();
        });
    });
}

//Delete an Entry
function deleteEntry(req, res){
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db(databaseName);
        var myquery = { _id: mongo.ObjectID(req.query.id)}
        console.log(myquery)
        dbo.collection(entriesCollection).deleteOne(myquery, function (err, obj) {
            if (err) throw err;
            console.log("1 document deleted");
            db.close();
        });
    });
}