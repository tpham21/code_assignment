var express = require('express');
var app     = express();
var documents = require('./documents');
var serviceEntity = require('./serviceEntity');
var ObjectId = require('mongodb').ObjectId;
var server = require('http').createServer(app);  
var port = process.env.PORT || 8000;
var authorization = require('./authorization');
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Methods', '*');
  next();
});


/********************* MICROSERVICE *****************************/
app.post('/microservice/v1.0/services' ,function(req, res, next){
	serviceEntity.createService(req.body, function(err, result){
		if(err) return next(err);
		res.send(result);
	});
});

app.get('/microservice/v1.0/services/:serviceId' ,authorization.authorise, function(req, res, next){
	serviceEntity.getService(req.params.serviceId, function(err, result){
		if(err) return next(err);
		res.send(result);
	});
});

app.put('/microservice/v1.0/services/:serviceId' ,authorization.authorise, function(req, res, next){
	serviceEntity.updateService(req.params.serviceId, req.body, function(err, result){
		if(err) return next(err);
		res.send(result);
	});
});

app.delete('/microservice/v1.0/services/:serviceId' ,authorization.authorise, function(req, res, next){
	serviceEntity.deleteService({_id: new ObjectId(req.params.serviceId)}, function(err, result){
		if(err) return next(err);
		res.send(result);
	});
});
/*****************************************************************/



/************************** FOR PART 1 *******************************/
app.get('/code_assignment/v1.0',function(req, res, next){
	console.log(JSON.stringify(req.headers));
	res.send({"version":"1.0"});

});

app.get('/code_assignment/v1.0/documents/count',function(req, res, next){
	console.log(JSON.stringify(req.headers));
	documents.countDocuments(function(err, result){
		console.log(JSON.stringify(err));
		if(err) return next(err);
		res.send(result);
	});
});

app.get('/code_assignment/v1.0/documents',function(req, res, next){
	var limit = req.query.limit?parseInt(req.query.limit):null;
	var offset = req.query.offset?parseInt(req.query.offset):null;
	documents.getDocumentsByLimit(limit, offset, function(err, result){
		if(err) return next(err);
		res.send(result);
	});
});

app.post('/code_assignment/v1.0/documents',function(req, res, next){
	documents.createDocument(req.body, function(err, result){
		if(err) return next(err);
		res.send(result);
	});
});


app.get('/code_assignment/v1.0/documents/:id',function(req, res, next){
	documents.getDocument(req.params.id, function(err, result){
		if(err) return next(err);
		res.send(result);
	});
});

app.put('/code_assignment/v1.0/documents/:id',function(req, res, next){
	documents.updateDocument(req.params.id, req.body, function(err, result){
		if(err) return next(err);
		res.send(result);
	});
});

app.delete('/code_assignment/v1.0/documents/:id',function(req, res, next){
	documents.deleteDocument(req.params.id, function(err, result){
		if(err) return next(err);
		res.send(result);
	});
});
/**********************************************/

app.use(function (err, req, res, next) {
  var status = err.status?err.status:501;
  res.status(status).json({error: err});
  //res.render('error', { error: err })
});


server.listen(port);
console.log('Magic happens on ' + port);