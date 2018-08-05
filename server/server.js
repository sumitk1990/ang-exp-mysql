/*********************
 * Module dependencies
 *********************/

var express = require('express'),
	routes = require('./routes'),
	http = require('http'),
	path = require('path');
var Utils = require('./common/Utils.js');

var serverConfig = Utils.getServerConfig

//var index = require('./routes');
//var app = module.exports = express();
var app = express();
//Express Configuration
require('./config/express')(app);
var rootPath = path.normalize(__dirname + '/..');

/***************
 * Configuration
 ***************/

// all environments
app.set('port', process.env.PORT || 9000);

// development only
if (app.get('env') === 'development') {
	console.log("------------------------dev mode ----------------------------");
}

/********
 * Routes
 ********/

/*************************************************************
 * CONTENT SERVE - it will serve the static content APIs. 
 * content api name should be same as json file name.
**************************************************************/
app.use('/content', express.static(path.join(rootPath, '/content'))); 


//redirect all others to the index (HTML5 history)
app.use('/API', routes.state);

//app.use('/src/**/*', routes.state);
//app.get('/src/*', routes.index);





// serve index and view partials
app.get('/', routes.index);
/*var rootPath = path.normalize(__dirname + '/..');
app.get('/', function(req, res){
    res.sendFile(rootPath + '/app/index.html');
});
*/

/***********************
 * SRC Modules 
 ***********************/
require('./src/login/loginServer.js')(app);
require('./src/home/homeServer.js')(app);
require('./src/user/userServer.js')(app);
require('./src/admin/adminServer.js')(app);

/**************
 * Start Server
 **************/
var port = serverConfig.appPort || 3005;
var server = app.listen(port);
console.log('Express server listening on port %d in %s mode', port, app.get('env'));

process.on('uncaughtException', function(err) {
	console.error('uncaughtException:', err.message);
	console.error(err.stack, err);
	process.exit(1)
})