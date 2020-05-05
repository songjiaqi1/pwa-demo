var path = require('path');
var express = require('express');
var https = require('https');
var http = require('http');
var fs = require('fs');
var app = express();

var privateKey  = fs.readFileSync('private.pem', 'utf8');
var certificate = fs.readFileSync('file.crt', 'utf8');

app.use(express.static(path.join(__dirname)));

app.get('/', function (req, res) {
  res.send('hello world')
})

http.createServer(app).listen(3000);
