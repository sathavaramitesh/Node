
// const {ObjectId} = require('mongodb');
var userServices = require('../services/UserServices-old.js');
var bcrypt   = require('bcrypt-nodejs');
var sess;
module.exports = {

	home : async function (req , res) {
			res.render('home.ejs', {
				error : req.flash("error"),
				success: req.flash("success"),
				session:req.session,
		
		 	});
	},

	loggedIn : async function (req , res , next) {
		if (req.session.details) { // req.session.passport._id
			next();
		} else {
			res.redirect('/login');
		}
	},

	login : async function (req , res) {
		if (req.session.details) {
			res.redirect('/userList');
		} else {
			res.render('login', {
				error : req.flash("error"),
				success: req.flash("success"),
				session:req.session
			});

		}
	},

	logout : async function (req , res) {
		req.session.destroy(function(err) {
		  if(err) {
		    console.log(err);
		  } else {
		    res.redirect('/home');
		  }
		});
	},

	postLogin : async function (req , res) {
		try{
			let user = await userServices.getByFindOne({email : req.body.email});
			if(user){
				if(bcrypt.compareSync(req.body.password, user.password)){
					sess=req.session;
					sess.details = {
						id : user.id,
						email : user.email,
						image : user.image,
						flag : true
					}

					res.redirect('/userList');
				}else{
					res.redirect('/home');
				}
			}else{
				req.flash('error', 'Registration successfully');
				res.redirect('/home');
			}

		}catch (error){
			console.log("home controller postLogin error : ",error)
		}
	},

	signup : async function (req , res) {
		if (req.session.user) {

			res.redirect('/home');

		} else {

			res.render('signup', {
				error : req.flash("error"),
				success: req.flash("success"),
				session:req.session
			});
		}
	},

	getUser : async function (req,res) {
		 try{
		 var perPage = 2
    	 var page = req.query.page || 1
    	 let skip = (perPage * page) - perPage;

		 let user  = await userServices.getByFindTable({},skip,perPage);
		 let findUser = await userServices.getByFind({});
		 res.render('user/index',{data : user,current: page,pages: Math.ceil(findUser.length / perPage)})
		 }catch(error){
		 	console.log("user controller getUser error -:" ,error)
		 }
	},

	add : async function (req,res) {
		 try{
		 res.render('user/add',{data : ''})
		 }catch(error){
		 	console.log("user controller add error -:" ,error)
		 }
	},

	addPost : async function (req,res) {
		 try{
			let store =  await userServices.create({
			 	name : req.body.name,
			 	email : req.body.email,
			 	password : bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(8), null),
			 	image : req.file.filename

			 });
			 res.redirect('/userList');
		 }catch(error){
		 	console.log("user controller add error -:" ,error)
		 }
	},

	edit : async function (req,res) {
		 try{
			 let user = await userServices.getByFindOne({_id : ObjectId(req.params.id)});
			 res.render('user/add',{data : user})
		 }catch(error){
		 	console.log("user controller edit error -:" ,error)
		 }
	},

	editPost : async function (req,res) {
		 try{

		 	if(req.file && req.filename != ''){
				 let store =  await userServices.update(
				 {
				 	_id : req.params.id
				 },
				 {
				 	name : req.body.name,
				 	email : req.body.email,
				 	image : req.file.filename
				 });
			}else{
				let store =  await userServices.update(
				 {
				 	_id : req.params.id
				 },
				 {
				 	name : req.body.name,
				 	email : req.body.email,
				 });
			}

			 res.redirect('/userList');
		 }catch(error){
		 	console.log("user controller editPost error -:" ,error)
		 }
	},

	delete : async function (req,res) {
		 try{
		 await userServices.delete(ObjectId(req.params.id));
		 res.redirect('/userList');
		 }catch(error){
		 	console.log("user controller delete error -:" ,error)
		 }
	},
	
}


    
