var crypto = require('crypto');
var ObjectId = require('mongodb').ObjectId;
var async = require("async");
var dbConnection =  require('./mongoConnection');
var accessTokenModule = require('./accessToken');
var connection = new dbConnection('EntityDB');
var connectionName = "serviceEntity";
module.exports.createService = function(serviceObj, callback){
	var service;
	if(!serviceObj.name){
		callback({"message":"field \'name\' is required!","status": 501}, null);
		return;
	}
	if(!serviceObj.endpoint){
		callback({"message":"field \'endpoint\' is required!","status": 501}, null);
		return;
	}
	async.series({
		createService : function(next){
			var service = {name:serviceObj.name, endpoint: serviceObj.endpoint};
			connection.insertObj(connectionName, service, function(err, res){
				if(err){
					callback(err, null);
					return;
				}
				serviceObj._id = res._id;
				next();
			});
		},
		createAccessToken: function(next){
			accessTokenModule.generateAccessToken('service', serviceObj, callback);
		}

	});

}

module.exports.getService = function(serviceId, callback){
	var token;
	var accessToken;
	connection.findObjs(connectionName, {_id: new ObjectId(serviceId)}, null, function(err, res){
		console.log(JSON.stringify(err));
		console.log(JSON.stringify(res));
		if(err){
			callback(err, null);
			return;
		}
		callback(null, res[0]);
	});
}

module.exports.getServices = function(query, callback){
	var token;
	var accessToken;
	connection.findObjs(connectionName, query, null, function(err, res){
		if(err){
			callback(err, null);
			return;
		}
		callback(null, res);
	});
}

module.exports.deleteService = function(query, callback){
	connection.deleteObj(connectionName, query, callback);
}

module.exports.updateService = function(serviceId, obj, callback){
	connection.findObjs(connectionName, {_id:new ObjectId(serviceId)}, null, function(err, res){
		if(err){
			callback(err, null);
			return;
		}
		if(obj.name) res[0].name = obj.name;
		if(obj.endpoint) res[0].endpoint = obj.endpoint
	});
	connection.updateObj(connectionName, query, res[0], callback);
}
