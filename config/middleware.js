const Joi = require('joi');
module.exports = {
	register : async function (req,res,next) {
		var schema = Joi.object().keys({
			  name : Joi.string().required(),
			  address : Joi.string().required(),
			  city : Joi.string().required(),
			  state : Joi.string().required(),
			  country : Joi.string().required(),
			  phone : Joi.number().min(10).required(),
			  email : Joi.string().email().required(),
			  password : Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/)
			});

		Joi.validate(req.body, schema, function(err, value) {
		  if (err) {
		   res.send({"status":"fail","message":err.message,"result" : {} })
		  }else{
		  	next();
		  }
		});
	},

	login : async function (req,res,next) {
		var schema = Joi.object().keys({
			  email : Joi.string().email().required(),
			  password : Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/)
			});

		Joi.validate(req.body, schema, function(err, value) {
		  if (err) {
		   res.send({"status":"fail","message":err.message,"result" : {} })
		  }else{
		  	next();
		  }
		});
	}
}
