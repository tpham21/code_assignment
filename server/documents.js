var collectionName =  require('./config').documentCollection;
var main = require('./main');
var ObjectId = require('mongodb').ObjectId;

module.exports.getDocument = function(documentId, callback){
	main.getItems(collectionName, {_id: new ObjectId(documentId)}, null, function(err, result){
		if(err)
			return callback(err, null);
		callback(null, result[0]);
	});
}

module.exports.getDocuments = function(limit, offset, callback){
	main.getItems(collectionName, {_id: new ObjectId(documentId)}, null, callback);
}

module.exports.getDocumentsByLimit = function(limit, offset, callback){
	main.getItemsByLimit(collectionName, {}, limit, offset, callback);
}

module.exports.createDocument = function(document, callback){
	main.createItem(collectionName, document, callback);
}

module.exports.updateDocument = function(documentId, document, callback){
	main.updateItem(collectionName, documentId, document, callback);
}

module.exports.deleteDocument = function(documentId, callback){
	main.deleteItem(collectionName, documentId, callback);
}

module.exports.countDocuments = function(callback){
	main.countItems(collectionName, {}, callback);
}