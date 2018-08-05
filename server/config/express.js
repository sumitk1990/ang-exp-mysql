'use strict';

var express = require('express'),
	multipleViews = require('express-multiple-views'),
	path = require('path');
var mysql = require('mysql');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var compression = require('compression');
var livereload = require("connect-livereload");
var MySQLStore = require('express-mysql-session')(session);
var connection  = require('express-myconnection');
//var expressValidator = require('express-validator');
var Utils = require('./../common/Utils.js');
var uuid = require('node-uuid');
var crypto = require('crypto');

var serverConfig = Utils.getServerConfig
var auth=require('./auth.js');

var options = {
	host : serverConfig.mysql.host, 		//'localhost', // Host name for database connection. 
	port : serverConfig.mysql.port, 		//3306, // Port number for database connection. 
	user : serverConfig.mysql.username,		//'root', // Database user. 
	password : serverConfig.mysql.password,	//'123456', // Password for the above database user. 
	database : serverConfig.mysql.database,//'angwebapp', // Database name. 
	checkExpirationInterval : 900000, // How frequently expired sessions will be cleared; milliseconds. 
	expiration : 60000,//5min = 300000  //24hrs = 86400000, // The maximum age of a valid session; milliseconds. 
	createDatabaseTable : true, // Whether or not to create the sessions database table, if one does not already exist. 
	connectionLimit : 1, // Number of connections when creating a connection pool 
	schema : {
		tableName : 'SESSIONS',
		columnNames : {
			session_id : 'session_id',
			expires : 'expires',
			data : 'data'
		}
	}
};

var sessionStore = new MySQLStore(options);

var securityProfile = require('./../mock/securityProfile.js');

module.exports = function(app) {
	var rootPath = path.normalize(__dirname + '/../..');

	console.log("\t----------rootPath--------------\n\t", rootPath);
	serverConfig.env = serverConfig.env ? serverConfig.env : 'development';
	console.log("\t----------serverConfig--------------\n\t", serverConfig);
	
	/**
	 * First configure the DB setup
	 */

	app.use(
			connection(mysql, {
				host : serverConfig.mysql.host, 		//'localhost', // Host name for database connection. 
				port : serverConfig.mysql.port, 		//3306, // Port number for database connection. 
				user : serverConfig.mysql.username,		//'root', // Database user. 
				password : serverConfig.mysql.password,	//'123456', // Password for the above database user. 
				database : serverConfig.mysql.database,//'angwebapp', // Database name. 
				debug    : serverConfig.mysql.debug //set true if you wanna see debug logger
			}, 'request')
		); 
	/**
	 * Second setup the sessions DB setup 
	 * 
	 * Description - Do not use cookie part for express session, it will invalidate the auth check
	 */
	app.use(session({
		key : 'session_cookie_name',
		secret : 'session_cookie_secret',
		store : sessionStore,
		/*genid: function(req) {
		    return crypto.createHash('sha256').update(uuid.v1()).update(crypto.randomBytes(256)).digest("hex"); // use UUIDs for session IDs
		  },*/
		/*cookie: {
            path: "/",
            httpOnly: true,
            secure: true,
            maxAge:  60000
        },*/
		resave : false,
		saveUninitialized : false,
		httpOnly:false
	}));

	/**
	 * THIRD setup the URL based access levels
	 */
		app.use(function checkAuth(req, res, next) {
			auth.checkAuthentication(req, res, next);
//			console.log("Page Check -----------------------", req.originalUrl);
//			console.log("SESSION CHECK IN EXPRESS CONFIGURATION -----------------------", req.session,"\n sessionID : ",req.sessionID);
	});

	/**
	 *  FOURTH Disable caching of scripts for easier testing
	 **/
	app.use(function noCache(req, res, next) {
		if (req.url.indexOf('/scripts/') === 0) {
			res.header("Cache-Control", "no-cache, no-store, must-revalidate");
			res.header("Pragma", "no-cache");
			res.header("Expires", 0);
		}
		next();
	});

	/**
	 * Then you can config the livereload
	 */
	//	app.use(livereload());

	//	app.use(express.static(path.join(rootPath, '.tmp')));
	app.use(express.static(path.join(rootPath, '/app')));

//	app.use(expressValidator());
	app.use(compression());
	//      app.use(checkAuthentication);
	app.set('views', rootPath + '/app/src');
	multipleViews(app, rootPath + '/app/src');
	app.use(bodyParser.json());
	
	app.use(function(req, res, next) {
	    res.setHeader('Access-Control-Allow-Origin', '*');
	    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
//	    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
	    next();
	});

	app.engine('html', require('ejs').renderFile);
	app.set('view engine', 'html');

};

/*
function checkAuthentication(req, res, next) {
	var stripped = req.url.split('.')[0];
	var requestedView = path.join('./', stripped);
	
	 console.log("-----------------------------------------------------------------------");
	 console.log("checkAuthentication \n ------------------------------------------------------ \n req.originalUrl  = ", req.originalUrl);
	 console.log("checkAuthentication \n ------------------------------------------------------ \n  req.session  = ", req.session)
	 console.log("checkAuthentication \n ------------------------------------------------------ \n sessionID = ", req.sessionID);
	// console.log("-----------------------------------------------------------------------");
	// console.log('------ REQUESTED URL ------', req.url);
	
	// console.log('------ stripped URL ------',stripped);
	// console.log('------ requestedView URL ------',stripped);
	if (req.url.indexOf('/src/about/About.html') === 0) {
		res.render('404');
		return;
	}

	if (req.url.indexOf('/src/about/About.html') === 0) {
		console.log("About Page Check -----------------------", req.originalUrl);

		console.log(' securityProfile -------- ', securityProfile);

		// res.send('You are not authorized for this action.');
		res.send('<div class="jumbotron">'
			+ '<h3>"Error !!! Not found ...!"</h3>'
			+ '<p class="lead">'
			+ '<p>Sorry, but the page you were trying to view does not exist.</p>'
			+ '<p>It looks like this was the result of either:</p>'
			+ '<ul>'
			+ '<li>a mistyped address</li>'
			+ '<li>an out-of-date link</li>'
			+ '<li>You are not authorized for this action.</li>'
			+ '</ul>'
			+ '<p>'
			+ '	<a class="btn btn-lg btn-success" ui-sref="home">HOME! &nbsp;'
			+ '<span	class="glyphicon glyphicon-ok"></span></a>'
			+ '</p>'
			+ '</div>');
		return;
	}

	next();
}*/