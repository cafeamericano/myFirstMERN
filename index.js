const express = require('express');
const cors = require('cors');
var mysql = require('mysql')
var bodyParser = require('body-parser')
var app = express()

//DEFINE DB================================================================

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "phoebe17",
  database: "microstudy",
  dateStrings: true
});

//MIDDLEWARE================================================================

//app.use(express.static('public'));
const SELECT_ALL_ENTRIES_QUERY = 'SELECT * FROM entries ORDER BY date DESC';

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//CONNECT TO DB================================================================

connection.connect(function(err) {
if (err) throw err;
console.log("Connected to MySQL!");

//ROUTES================================================================
app.get('/entries', (req, res) => {
    connection.query(SELECT_ALL_ENTRIES_QUERY, (err, results) => {
        if(err) {
            return res.send(err)
        }
        else{
            return res.json({
                data: results
            })
        }
    })
})

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

});

app.listen(4000, function(){
    console.log('Server listening on Port 4000...')
})