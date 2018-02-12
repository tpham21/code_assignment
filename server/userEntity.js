var crypto = require('crypto');
var ObjectId = require('mongodb').ObjectId;
var async = require("async");
var dbConnection =  require('./mongoConnection');
var accessTokenModule = require('./accessToken');
var connection = new dbConnection('EntityDB');
var connectionName = "userEntity";
module.exports.createUser = function(name, pass, callback){
	//.....
}

module.exports.getUser = function(query, callback){
	//....
}

module.exports.deleteUser = function(query, callback){
	//....
}

module.exports.updateUser = function(query, obj, callback){
	//....
}
