
// const {ObjectId} = require('mongodb');
var userServices = require('../services/CommonQuery.js');
var bcrypt   = require('bcrypt-nodejs');
var sess;
module.exports = {

	register : async function (req , res) {
		let frields = 'name,address,city,state,country,phone,email,password';
		let value = "'"+req.body.name+"','"+req.body.address+"','"+req.body.city+"','"+req.body.state+"','"+req.body.country+"','"+req.body.phone+"','"+req.body.email+"','"+bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(8), null)+"'";
		let user = await userServices.create('user',frields,value);
		res.send({"status":"success","message":"register successfully","result" : {} })
	},

	login : async function (req , res) {
		let query = "email='"+req.body.email+"'";
		// let value = "'"+req.body.email+"','"++"'";
		let user = await userServices.getData('user',query);
		res.send({"status":"success","message":"register successfully","result" :user })
	}
}


    
