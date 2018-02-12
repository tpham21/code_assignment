var crypto = require('crypto');
var ObjectId = require('mongodb').ObjectId;
var async = require("async");
var dbConnection =  require('./mongoConnection');
var connection = new dbConnection('EntityDB');
var connectionName = "AccessToken";
module.exports.generateAccessToken = function(type, entity, callback){
	var d = new Date();
	var token;
	var accessToken;
	async.series({
		generateToken : function(next){
			crypto.randomBytes(16, function(err, buffer) {
				if(err){
					callback(err, null)
					return;
				}
				token =  buffer.toString('hex');
				next();
			});	
		},
		createAccessToken: function(next){
			accessToken =  {
				accessToken : token,
				entityName: entity.name,
				entityId: new ObjectId(entity._id),
				type: type
			}
			if(type!=='service')
				accessToken.expiration= new Date(d.getTime() + 3600000);
			connection.insertObj(connectionName, accessToken, function(err, res){
				if(err){
					callback(err, null);
					return;
				}
				if(type ==='service'){
					delete accessToken.accessToken;
					accessToken.serviceToken = token;
				}

				callback(null, accessToken);
			});
		}

	});

}

module.exports.getAccessToken = function(accessToken, callback){
	var token;
	var accessToken;
	connection.findObjs(connectionName, {accessToken: accessToken}, null, function(err, res){
		if(err){
			callback({"message": "Not Found", "status":404}, null);
			return;
		}if(!res || res.length ===0){
			callback({"message": "invalid token", "status":403}, null);
			return;
		}
		if(res[0].type!=='service'){
			var date = new Date();
			var expiration = new Date(res[0].expiration);
			if(date.getTime()>expiration.getTime()){
				deleteAccessToken({_id: new ObjectId(res[0]._id)}, function(err, res){
					callback({"message":"session timeout", "status": 401}, null);
					return;
				});
			}
		}
		callback(null, res[0]);
	});
}

module.exports.deleteAccessToken = function(query, callback){
	connection.deleteObj(connectionName, query, callback);
}

module.exports.updateAccessToken = function(query, obj, callback){
	var token;
	var accessToken;
	connection.updateObj(connectionName, query, obj, callback);
}
