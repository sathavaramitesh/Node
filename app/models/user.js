
// app/models/user.js
// load the things we need
var mysql = require('mysql');
var bcrypt   = require('bcrypt-nodejs');

//define the schema for our user model
var userSchema = mysql.Schema({	
	// _id:{ type: Number, default: 1 },
	name: {
		type : String
	},
	email: {
		type : String
	},
	password: {
		type : String
	},
	status: {
		type : String
	},
	image: {
		type : String
	},
	createdAt: {
		type : Date,
		default : Date.now()
	},
	updatedAt: {
		type : Date,
		default : Date.now()
	},
	active_hash: {
		type : String
	},
	role_id: { type: Number, default: 2 }
});


//methods ======================
//generating a hash
userSchema.methods.generateHash = function(password) {
 return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

//checking if password is valid
userSchema.methods.validPassword = function(password) {
 return bcrypt.compareSync(password, this.password);
};
 
//create the model for users and expose it to our app
module.exports = new  mysql.model('user', userSchema);
userSchema.set('toJSON', {
     transform: function (doc, ret, options) {
         ret.id = ret._id;
         delete ret._id;
         delete ret.__v;
     }
});

