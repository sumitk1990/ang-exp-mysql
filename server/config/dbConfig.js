var mysql = require('mysql');
var Utils = require('./../common/Utils.js');

var serverConfig = Utils.getServerConfig

var connection = mysql.createPool({
	host : serverConfig.mysql.host, 		//'localhost',
	port : serverConfig.mysql.port, 		//3306, // Port number for database connection. 
	user : serverConfig.mysql.username,		//'root',
	password : serverConfig.mysql.password,	//'123456',
	database : serverConfig.mysql.database,	//'angwebapp'
});
module.exports = connection;