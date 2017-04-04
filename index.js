var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mysql = require('mysql');
var pool = mysql.createPool({
	host: 'localhost',
	user: 'root',
	password: '170859lol#3',
	database: 'nodejs'
});

app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function(req, res){
	pool.getConnection((err, connection)=>{
		connection.query("SELECT * from projects", (err, rows)=>{
			connection.release();
			//console.log(rows);
			res.send(rows);
		});
	});
});

app.post('/', function(req, res){
	var name = req.body.name;
	pool.getConnection((err, connection)=>{
		connection.query("INSERT INTO projects(name) VALUES('" + name + "')", (err)=>{
			connection.release();
			if(err){
				res.send("There was an error inserting into the database.");
			}else{
				res.send("Insert successful.");
			}
		});
	});
});

app.listen(9090, function () {
  console.log('Example app listening on port 9090!');
});