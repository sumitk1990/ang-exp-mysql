'use strict';

var db=require('./../../config/dbConfig.js'); 
var Utils = require('../../common/Utils.js');

module.exports = function(app) {

	app.get('/API/user/userSummary', function(req, res) {
		//		console.log("SESSION  -------- \n",req.session,"\n sessionID : ",req.sessionID);
		var responseObj=new Utils.Response();

		//    	console.log("@@@@@ ::::: userServer : /initialize : ENTER.");
		
		req.getConnection(function(err, connection) {

			var userSmyQry = "SELECT * FROM USERS U, USER_PROFILE UP WHERE U.EMAIL = UP.USER_NAME";
			connection.query(userSmyQry, function(err, rows) {
				//            	console.log("users data  :  ",rows);
				if (err) {
					console.log("Error Selecting : %s ", err);
					res.send(err);
				} else {
					responseObj.error=false;
   					responseObj.successMsg="SUCCESS : User data available.";
					responseObj.responseData=rows;
					res.send(responseObj);
				}
			//                   res.render('customers',{page_title:"Customers - Node.js",data:rows});                                  
			});
		});
	});

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