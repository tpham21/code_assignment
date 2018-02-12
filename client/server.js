var express = require('express');
var app     = express();
var server = require('http').createServer(app);  
var port = process.env.PORT || 9000;

app.use(express.static(__dirname ));
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/*', function(req, res) {
    res.sendfile('./index.html');
});

server.listen(port);
console.log('Magic happens on ' + port);