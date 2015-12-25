/*global console, require, io*/
'use strict';
var app  = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var mysql = require('mysql');
var sha1 = require('sha1');

app.get('/', function (req, res) {
    res.send('Test message');
});

var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'test'
});

connection.connect();

/*connection.query('INSERT INTO testowa (user, password) VALUES ("Kamil","' + sha1("poziom1") + '")', function(err, rows, fields) {
    if (!err)
        console.log('The solution is: ', rows);
    else
        console.log('Error while performing Query.');
});*/

connection.end();

io.on('connection', function (socket) {
    console.log('user connected');

    socket.on('login', function (msg) {
        console.log(msg);
        socket.emit('login', true);
    });

    socket.on('message', function (msg) {
        console.log(msg);
        io.emit('message', msg);
    });

    socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});

http.listen(3000, function () {
    console.log('listening on *:3000');
});