var dbConnection =  require('./mongoConnection');
var async = require("async");
var ObjectId = require('mongodb').ObjectId;
var connection = new dbConnection();
var getAllItems = function(collectionName, sort, callback){

	connection.findAll(collectionName, sort, function(err, result){
		callback(err, result);
	});
}

var getItems = function(collectionName, query, sort, callback){
	connection.findObjs(collectionName, query, sort, function(err, result){
		callback(err, result);
	});
}

var getItemsByLimit = function(collectionName, query, limit, offset, callback){
	connection.findObjsWithLimitDesc(collectionName, query, limit, offset, "_id", function(err, result){
		callback(err, result);
	});
}

var createItem = function(collectionName, obj, callback){
	connection.insertObj(collectionName, obj, function(err, result){
		callback(err, result);
	});	
}

var updateItem =  function(collectionName, id, obj, callback){
	id = new ObjectId(id);
	obj._id = id;
	connection.updateObj(collectionName, {_id: id}, obj, function(err, result){
		callback(err, result);
	});
}

var deleteItem =  function(collectionName, id, callback){
	id = new ObjectId(id);
	connection.deleteObj(collectionName, {_id: id}, function(err, result){
		callback(err, result);
	});
}

var countItems =  function(collectionName, query, callback){
	connection.countObjects(collectionName, query, function(err, result){
		if(err)
			callback(err, null);
		else
			callback(null, {count: result});
	});
}

/********************************************/
exports.getAllItems = getAllItems;
exports.getItems = getItems;
exports.getItemsByLimit = getItemsByLimit;
exports.createItem = createItem;
exports.updateItem = updateItem;
exports.deleteItem = deleteItem;
exports.countItems = countItems;