const express = require('express');
const cors = require('cors');
var bodyParser = require('body-parser')
var app = express()
var mongo = require('mongodb');

//DEFINE DB================================================================

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/mydb";

//MIDDLEWARE================================================================

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//ROUTES================================================================
app.get('/entries', (req, res) => {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("mydb");
        dbo.collection("customers").find({}).toArray(function (err, result) {
            if (err) throw err;
            //console.log(result);
            db.close();
            return res.json({
                data: result
            })
        });
    })
});

app.get('/entries/add', (req, res) => {
    const { date, comments } = req.query;
    const INSERT_ENTRIES_QUERY = `INSERT INTO entries (date, comments) VALUES ('${date}', '${comments}')`;
    connection.query(INSERT_ENTRIES_QUERY, (err, results) => {
        if (err) {
            return res.send(err)
        }
        else {
            return res.send('successfully added entries')
        }
    })
});

app.get('/entries/delete', (req, res) => {
    // MongoClient.connect(url, function (err, db) {
    //     if (err) throw err;
    //     var dbo = db.db("mydb");
    //     dbo.collection("customers").deleteOne({ _id: mongo.ObjectID(req.query.id)}(function (err, result) {
    //         if (err) throw err;
    //         console.log(result);
    //         db.close();
    //     });
    // });


    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("mydb");
        var myquery = { _id: mongo.ObjectID(req.query.id)}
        console.log(myquery)
        dbo.collection("customers").deleteOne(myquery, function (err, obj) {
            if (err) throw err;
            console.log("1 document deleted");
            db.close();
        });
    });


    // const { id } = req.query;
    // const DELETE_ENTRIES_QUERY = `DELETE FROM entries WHERE id=${id}`;
    // connection.query(DELETE_ENTRIES_QUERY, (err, results) => {
    //     if (err) {
    //         return res.send(err)
    //     }
    //     else {
    //         return res.send('successfully deleted entries')
    //     }
    // })
});


//START SERVER================================================================

app.listen(4000, function () {
    console.log('Server listening on Port 4000...')
})

//FUNCTIONS BY ACTION////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//Create Database
function createDatabase() {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        console.log("Database created!");
        db.close();
    });
}

//Create Collection
function createCollection() {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("mydb");
        dbo.createCollection("customers", function (err, res) {
            if (err) throw err;
            console.log("Collection created!");
            db.close();
        });
    });
}

//Insert One Record
function insertOneRecord() {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("mydb");
        var myobj = { name: "Banana Town", address: "123 Banana Way" };
        dbo.collection("customers").insertOne(myobj, function (err, res) {
            if (err) throw err;
            console.log("1 document inserted");
            db.close();
        });
    });
}

//Insert Multiple Records
function insertMultipleRecords() {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("mydb");
        var myobj = [
            { name: 'John', address: 'Highway 71' },
            { name: 'Peter', address: 'Lowstreet 4' },
            { name: 'Amy', address: 'Apple st 652' },
            { name: 'Hannah', address: 'Mountain 21' },
            { name: 'Michael', address: 'Valley 345' },
            { name: 'Sandy', address: 'Ocean blvd 2' },
            { name: 'Betty', address: 'Green Grass 1' },
            { name: 'Richard', address: 'Sky st 331' },
            { name: 'Susan', address: 'One way 98' },
            { name: 'Vicky', address: 'Yellow Garden 2' },
            { name: 'Ben', address: 'Park Lane 38' },
            { name: 'William', address: 'Central st 954' },
            { name: 'Chuck', address: 'Main Road 989' },
            { name: 'Viola', address: 'Sideway 1633' }
        ];
        dbo.collection("customers").insertMany(myobj, function (err, res) {
            if (err) throw err;
            console.log("Number of documents inserted: " + res.insertedCount);
            db.close();
        });
    });
}

//Find All Records
function findAllRecords() {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("mydb");
        dbo.collection("customers").find({}).toArray(function (err, result) {
            if (err) throw err;
            console.log(result);
            db.close();
        });
    });
}

//Find One Record
function findOneRecord() {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("mydb");
        dbo.collection("customers").findOne({}, function (err, result) {
            if (err) throw err;
            console.log(result.name);
            db.close();
        });
    });
}

//Query Records
function queryRecords() {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("mydb");
        var query = { address: "123 Banana Way" };
        dbo.collection("customers").find(query).toArray(function (err, result) {
            if (err) throw err;
            console.log(result);
            db.close();
        });
    });
}

//Sort Records
function sortRecords() {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("mydb");
        var mysort = { name: 1 };
        dbo.collection("customers").find().sort(mysort).toArray(function (err, result) {
            if (err) throw err;
            console.log(result);
            db.close();
        });
    });
}

//Delete One Record
function deleteOneRecord() {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("mydb");
        var myquery = { address: 'Mountain 21' };
        dbo.collection("customers").deleteOne(myquery, function (err, obj) {
            if (err) throw err;
            console.log("1 document deleted");
            db.close();
        });
    });
}

//Update One Record
function updateOneRecord() {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("mydb");
        var myquery = { address: "Valley 345" };
        var newvalues = { $set: { name: "Michael", address: "Canyon 123" } };
        dbo.collection("customers").updateOne(myquery, newvalues, function (err, res) {
            if (err) throw err;
            console.log("1 document updated");
            db.close();
        });
    });
}