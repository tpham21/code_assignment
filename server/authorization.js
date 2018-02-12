var accessTokenModule = require('./accessToken');
var serviceEntityModule = require('./serviceEntity');
module.exports.authorise = function(req, res, next){
	console.log("im here");
	console.log(JSON.stringify(req.headers));
	var type, token;
	if(req.headers.authorization){
		token = req.headers.authorization;
	}
	else if(req.headers.service_token){
		token = req.headers.service_token;
	}
	else{
		console.log("unauthorize");
		res.status(401).json({message:"unAuthorize!"}).end();
		return;
	}
	console.log("wodn here");
	accessTokenModule.getAccessToken(token, function(_err, _res){
		console.log("accessTokenModule.getAccessToken");
		console.log(JSON.stringify(_err));
		if(_err){
			res.status(_err.status).json(_err).end();	
			return;
		}
		type = _res.type;
		if(type === 'service'){
			serviceEntityModule.getService(_res.entityId, function(__err, __res){
				if(__err){
					res.status(404).json(__err).end();
					return;
				}
				if(req.headers.origin && (req.headers.origin !==__res.endpoint)){
					res.status(401).json({message:"unAuthorize!"}).end();
					return;
				}
				next();
			});
		}else
			next();
	})
}