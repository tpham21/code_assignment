var mongoose = require("mongodb").MongoClient;
var config = require('./config');
var async = require("async");
var host = config.mongodbHost;
function dbConnection(env){
	this.mongoEnv = host + (env?env:config.defaultEnv);
}


dbConnection.prototype.createConnection = function(callback){
	mongoose.connect(this.mongoEnv, function(err,db){
		if(err){
			callback(err,null);
			return;
		}
		callback(null,db);
	});
}

dbConnection.prototype.insertObj = function(collectionName, obj, callback){
	var self = this;
	var db;
	async.series({
		connection: function(next){
			self.createConnection(function(err, result){
				if(err){
					console.log("Connection error");
					callback(err, null);
					return;
				}
				db = result;
				next();
			});
		},
		insert: function(next){
			console.log("Insert");
			db.collection(collectionName).insert(obj, function(err,result){
				db.close();
				if(err){
					callback(err, null);
					return;
				}
				callback(null, {_id: result.insertedIds[0]});
			});
		}
	});
};

dbConnection.prototype.findAll = function(collectionName, sort, callback){
	var db;
	var self = this;
	async.series({
		connection: function(next){
			self.createConnection(function(err, result){
				if(err){
					console.log("Connection error");
					callback(err, null);
					return;
				}
				db = result;
				next();
			});
		},
		findAll: function(next){
			var options = {};
			if(sort){
				options.sort = sort;
			}
			db.collection(collectionName).find({}, options).toArray(function(err,result){
				db.close();
				callback (err, result);
			});
		}
	});
};

dbConnection.prototype.findAllWithLimit = function(collectionName, offset, limit, callback){
	var db;
	var self = this;
	async.series({
		connection: function(next){
			self.createConnection(function(err, result){
				if(err){
					console.log("Connection error");
					callback(err, null);
					return;
				}
				db = result;
				next();
			});
		},
		findAllWithLimit: function(next){
			db.collection(collectionName).find({}).skip(offset > 0 ? ((offset-1)*limit) : 0).limit(limit).toArray(function(err,result){
				db.close();
				callback (err, result);
			});
		}
	});
};

dbConnection.prototype.findObjs = function(connectionName, query, sort, callback){
	var db;
	var self = this;
	async.series({
		connection: function(next){
			self.createConnection(function(err, result){
				if(err){
					console.log("Connection error");
					callback(err, null);
					return;
				}
				db = result;
				next();
			});
		},
		findObjs: function(next){
			var options = {};
			if(sort){
				options.sort = sort;
			}
			db.collection(connectionName).find(query, options).toArray(function(err,result){
				db.close();
				callback (err, result);
			});
		}
	});
}

dbConnection.prototype.findObjsWithLimit = function(connectionName, query, offset, limit, callback){
	var db;
	var self = this;
	async.series({
		connection: function(next){
			self.createConnection(function(err, result){
				if(err){
					console.log("Connection error");
					callback(err, null);
					return;
				}
				db = result;
				next();
			});
		},
		findObjsWithLimit: function(next){
			var options = {
				skip: (offset > 0 ? ((offset-1)*limit) : 0),
				limit: limit
			};
			db.collection(connectionName).find(query, options).toArray(function(err,result){
				db.close();
				callback (err, result);
			});
		}
	});
}

dbConnection.prototype.findObjsWithLimitDesc = function(connectionName, query, limit, offset, descKey, callback){
	var db;
	var self = this;
	async.series({
		connection: function(next){
			self.createConnection(function(err, result){
				if(err){
					console.log("Connection error");
					callback(err, null);
					return;
				}
				db = result;
				next();
			});
		},
		findObjsWithLimitDesc: function(next){
			var options = {
				sort: [[descKey,'desc']],
				skip: (offset > 0 ? ((offset)*limit) : 0),
				limit: limit
			};
			console.log("query: "+JSON.stringify(query));
						console.log("options: "+JSON.stringify(options));
			db.collection(connectionName).find(query,options).toArray(function(err,result){
				db.close();
				callback (err, result);
			});
		}
	});
}

dbConnection.prototype.updateObj = function(connectionName, query, obj, callback){
	var db;
	var self = this;
	async.series({
		connection: function(next){
			self.createConnection(function(err, result){
				if(err){
					console.log("Connection error");
					callback(err, null);
					return;
				}
				db = result;
				next();
			});
		},
		update: function(next){
			db.collection(connectionName).update(query, obj, function(err,result){
				if(err){
					callback(err, null);
					return;
				}
				callback(null, result);
			});
		}
	});
}

dbConnection.prototype.deleteObj = function(connectionName, query, callback){
	var db;
	var self = this;
	async.series({
		connection: function(next){
			self.createConnection(function(err, result){
				if(err){
					console.log("Connection error");
					callback(err, null);
					return;
				}
				db = result;
				next();
			});
		},
		delete: function(next){
			db.collection(connectionName).remove(query, function(err,result){
				if(err){
					callback(err, null);
					return;
				}
				callback(null, result);
			});
		}
	});
}


dbConnection.prototype.countObjects = function(collectionName, query, callback){
	var db;
	 var self = this;
	async.series({
		connection: function(next){
			self.createConnection(function(err, result){
				if(err){
					console.log("Connection error");
					callback(err, null);
					return;
				}
				db = result;
				next();
			});
		},
		countObjs: function(next){
			db.collection(collectionName).count(query,function(err, result){
				db.close();
				callback (err, result);
			});
		}
	});
};

exports = module.exports = dbConnection;