//https://scotch.io/tutorials/easy-node-authentication-setup-and-local
var userData = require('../../mock/usersData.json');
var db=require('./../../config/dbConfig.js'); 
var Utils = require('../../common/Utils.js');

module.exports = function(app) {

	app.get('/API/home/initialize', function(req, res) {
		//		console.log("SESSION  -------- \n",req.session,"\n sessionID : ",req.sessionID);
		var responseObj=new Utils.Response();

		req.getConnection(function(err, connection) {

			connection.query('SELECT * FROM SESSIONS', function(err, rows) {
				//            	console.log("sessions data  :  ",rows);
				if (err) {
					console.log("Error Selecting : %s ", err);
					res.send(err);
				} else {
					responseObj.error=false;
   					responseObj.successMsg="SUCCESS : session data available.";
					responseObj.responseData=rows;
					res.send(responseObj);
				}
			//                   res.render('customers',{page_title:"Customers - Node.js",data:rows});                                  
			});
		});
	});

	
	//ANOTHER WAY
	/*app.get('/API/home/initialize', function(req, res) {
		//		console.log("SESSION  -------- \n",req.session,"\n sessionID : ",req.sessionID);
		var STATUS = 'ERROR';
		//    	console.log("@@@@@ ::::: homeServer : /initialize : ENTER.");
		var responsData = ''

//			 req.getConnection(function(err,conn){

//			        if (err) return next("Cannot Connect");
					
			        var query = db.query('SELECT * FROM sessions',function(err,rows){

			            if(err){
			                console.log(err);
			                return next("Mysql error, check your query");
			            }

//			            res.render('user',{title:"RESTful Crud Example",data:rows});
			            res.send(rows);

			         });

//			    });

	});*/
}