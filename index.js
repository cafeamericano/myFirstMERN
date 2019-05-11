const express = require('express');
const cors = require('cors');
var mysql = require('mysql');
var bodyParser = require('body-parser');
var app = express();
var firebase = require('firebase');

//DEFINE DB================================================================

var firebaseConfig = {
    apiKey: "AIzaSyDSevOfF8fYXRT4MFreN62Q9Pp4bXxQSYM",
    authDomain: "tasks-react-b1a21.firebaseapp.com",
    databaseURL: "https://tasks-react-b1a21.firebaseio.com",
    projectId: "tasks-react-b1a21",
    storageBucket: "tasks-react-b1a21.appspot.com",
    messagingSenderId: "521561853052",
    appId: "1:521561853052:web:98ed87895f6c33a5"
  };

firebase.initializeApp(firebaseConfig);

var taskspool = firebase.firestore().collection('taskspool')

//MIDDLEWARE================================================================

//app.use(express.static('public'));

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//ROUTES================================================================
app.get('/entries', function(req, res) {
    var selectEntries = taskspool.orderBy('date', 'desc');
    let passToView = [];
    selectEntries.get().then(recordsRetrieved => {
        recordsRetrieved.forEach(record => {
            let x = record.data()
            let y = record.id
            x.id = y
            passToView.push(x)
            console.log(x)
        });
        return res.json({
            data: passToView
        });
    });
});

app.get('/entries/add', (req, res) => {
    const {date, comments} = req.query;
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
    const {id} = req.query;
    const DELETE_ENTRIES_QUERY = `DELETE FROM entries WHERE id=${id}`;
    connection.query(DELETE_ENTRIES_QUERY, (err, results) => {
        if (err) {
            return res.send(err)
        }
        else {
            return res.send('successfully deleted entries')
        }
    })
});


//START SERVER================================================================

app.listen(4000, function(){
    console.log('Server listening on Port 4000...')
})