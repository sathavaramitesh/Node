var mysql = require('mysql');
var db = require('../../config/database.js');
var userModule = require('../models/home.js');
module.exports = {

	create : async function (dbName,frields,value) {
		// var book1 = new user(data);
	 	return db.query("INSERT INTO "+dbName+" ("+frields+") VALUES ("+value+")");
	},

	getData : async function (dbName,query) {
		// var book1 = new user(data);
		console.log("getData ----::::::","SELECT * FROM "+dbName+" WHERE "+query);
	 	var data =  db.query("SELECT * FROM "+dbName+" WHERE "+query);
	 	console.log("result ---->>>>",data);
	},

	// getByFindOne : async function (data) {
	// 	try{
	// 		return await userModule.findOne(data);
	// 	}catch(error){
	// 		console.log("User service getByFindOne error :",error);
	// 	}
	// },
	// getByFind : async function (data) {
	// 	try{
	// 		return await userModule.find(data);
	// 	}catch(error){
	// 		console.log("User service getByFind error :",error);
	// 	}
		
	// },

	// getByFindTable : async function (data,skip,limit) {
	// 	try{
	// 		return await userModule.find(data).skip(skip).limit(limit);
	// 	}catch(error){
	// 		console.log("User service getByFind error :",error);
	// 	}
		
	// },

	// update : async function (condition,data) {
	// 	try{
	// 		return await userModule.update(condition,data);
	// 	}catch(error){
	// 		console.log("User service update error :",error);
	// 	}
		
	// },

	// delete : async function (data) {
	// 	try{
	// 		return await userModule.deleteOne({_id : data});
	// 	}catch(error){
	// 		console.log("User service update error :",error);
	// 	}
		
	// },


}