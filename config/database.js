var mysql = require('mysql');
// module.exports = {

    //'url' : '"mongodb://localhost:27017/myapp' // looks like mongodb://<user>:<pass>@mongo.onmodulus.net:27017/Mikha4ot
     
     //Please replace your host file Here : 127.1.1.0 , Express is Collection Name (Database Name)

    // mysql connection

    var con = mysql.createConnection({
	  "host": "localhost",
	  "user": "root",
	  "password": "",
	  "database" : 'node_project'
	});

// };

module.exports = con;