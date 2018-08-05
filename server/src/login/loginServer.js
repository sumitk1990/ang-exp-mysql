//https://scotch.io/tutorials/easy-node-authentication-setup-and-local
// http://codereview.stackexchange.com/questions/120331/passing-node-js-sql-connection-to-multiple-routes
var userData = require('../../mock/usersData.json');
var Utils = require('../../common/Utils.js');

module.exports = function(app) {

	app.post('/API/login/loginSubmit', function(req, res) {

		var responseObj=new Utils.Response();

		var userName = req.body.username;
		var password = req.body.password;
		var STATUS = 'ERROR';
		console.log("@@@@@ ::::: loginCtrl : /loginSubmit : ENTER.");
		console.log("@@@@@ ::::: userNme : \n ", userName, " \n password : ", password);

		/*if (userName && password) {
			userData.data.forEach(function(value) {
				if (userName === value.userName && password === value.password) {
					//    				console.log("---------------",value.userName);
					req.session.authenticated = true;
					req.session.user = value;
					STATUS = 'SUCCESS';
				}
			});
		}*/
		
		 req.getConnection(function (err, conn){
		        if (err){
		        	 responseObj.error=true;
	       			 responseObj.errorMsg="ERROR : database exception.";
        			 responseObj.responseData=err;
		        	res.send(responseObj);
			        return;
		        }

//		        var query = conn.query("SELECT * users set ? ",users, function(err, rows){
		        var query = conn.query("SELECT * FROM USERS, USER_PROFILE WHERE EMAIL = USER_NAME AND EMAIL = ?",[userName],function(err,rows){
//		        	https://github.com/codetrash/rest-crud/blob/master/server.js
		           if(err){
		                console.log(err);
//		                return next("Mysql error, check your query");
						responseObj.error=true;
	       				responseObj.errorMsg="ERROR : database query error.";
        				responseObj.responseData=err;
		        		res.send(responseObj);
		        		return;
		           }
	            	// console.log("user data  :  ",rows);
	            	
	            	if(rows && rows.length == 1){
	            	 	if(password == rows[0].PASSWORD){
	            	 		
	            	 		var data = rows[0];
	            	 		if(data.ACCESS_LIST == 'ADMIN01'){
								req.session.isAdmin = true;
							} else{
								req.session.isAdmin = false;
							}
							
							if(data.ACCESS_LIST == 'SUPERUSER01'){
								req.session.isSuperUser = true;
							} else{
								req.session.isSuperUser = false;
							}
							req.session.ACCESS_LIST = data.ACCESS_LIST;
	            	 		delete data.PASSWORD;
	            	 		delete data.ACCESS_LIST;
	            	 		console.log("DATA ---- ",data);
	            			responseObj.error=false;
	       					responseObj.successMsg="SUCCESS : User data available.";
        					responseObj.responseData=data;
        					req.session.authenticated = true;
							req.session.user = data;
							
							
//		        			res.send(responseObj);        		
							var secProfileQry =  " SELECT * FROM SECURITY_PROFILE SP, APP_AUTH AA, APP_STATE APS " +
												 " WHERE SP.APP_AUTH_ID = AA.APP_AUTH_ID " +
												 " AND AA.APP_STATE_NAME = APS.APP_STATE_NAME " +
												 " AND SP.SEC_PROFILE_ID = (SELECT UP.ACCESS_LIST FROM USERS U , USER_PROFILE UP " +
												 "							WHERE U.EMAIL = UP.USER_NAME AND " +
												 "							U.EMAIL = ?)";


							 conn.query(secProfileQry ,[userName], function(error, data){
						           if(error){
				    		            console.log(error);
										/*responseObj.error=true;
				       					responseObj.errorMsg="FAILED : database query error.";
			        					responseObj.responseData=error;
					        			res.send(responseObj);*/
					        			return;
					           		}
						           else{
						        	   	responseObj.error=false;
				       					responseObj.successMsg="SUCCESS : user profile checked successfully.";
			        					req.session.user_profile = data;
			        					 /*res.json({
			                                 type: true,
			                                 data: responseObj,
			                                 token: req.sessionID
			                             });*/
//			        					res.setHeader("Access-Control-Allow-Headers", req.sessionID);
//			        					 res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
//			        					res.cookie('sessionID',req.sessionID, { maxAge: 60000, httpOnly: true });
			        					res.cookie('sessionID',req.sessionID);
//			        					console.log("res ---------- ",res)
			        					res.header('cache-control', 'private, max-age=0');
			        					res.header('expires', new Date(Date.now()).toUTCString());
			        					res.header('session',req.sessionID);
			        					console.log("loginCtrl ----- ",responseObj);
			        					res.send(responseObj);
					        			return;
						           }
							 	});
							}
							else{
	            			responseObj.error=true;
	       					responseObj.errorMsg="FAILED : Incorrect username/password.";
        					responseObj.responseData="";
		        			res.send(responseObj);        		
							
							}
	            	}else{
	            		responseObj.error=true;
	       				responseObj.successMsg="ERROR : User not available.";
        				responseObj.responseData="";
		        		res.send(responseObj);        		
	            	}
		        });

		     });
		 
		//    	console.log("SESSION  -------- \n",req.session,"\n sessionID : ",req.sessionID);
	});

	app.post('/API/login/registerUser', function(req, res) {
		var requestObj = req.body;
		var responseObj=new Utils.Response();
		console.log("@@@@@ ::::: registerUser : \n ", req.body);

	    //validation
	    req.assert('firstName','First Name is required').notEmpty();
	    req.assert('email','A valid email is required').isEmail();
	    req.assert('password','Enter a password 6 - 20').len(6,20);

	    var errors = req.validationErrors();
	    console.log("@@@@@ ::::: registerUser : errors  ", errors);
	    if(errors){
	    	res.send(errors);
	        return;
	    }

	    //get USERS entity data
	    //it should be complete entity or users
	    var users = {
	        first_name: requestObj.firstName,
	        middle_name:"",
	        last_name: requestObj.lastName,
	        email: requestObj.email	        
	     };
	    
	    var user_profile = {
	    		user_name: requestObj.email,
	    		password: requestObj.password,
	    		access_list: "GST001"
	    }

	    //inserting into mysql
	   req.getConnection(function (err, conn){

	        if (err){
	        	res.send(err);
		        return;
	        }

	        var query = conn.query("SELECT * FROM USERS WHERE EMAIL = ?",[requestObj.email],function(err,rows){
	           if(err){
	                console.log(err);
  //		                return next("Mysql error, check your query");
						responseObj.error=true;
	       				responseObj.errorMsg="ERROR : database query error.";
        				responseObj.responseData=err;
		        		res.send(responseObj);
		        		return;
		           }

		           if(rows && rows.length == 1){
						responseObj.error=true;
	       				responseObj.errorMsg="FAILED : user already exist.";
        				responseObj.responseData=rows;
		        		res.send(responseObj);
		        		return;
		           }
		           else{
		        	   
		        	   var qry =  conn.query("INSERT INTO USERS SET ? ",users, function(error, data){
			           if(error){
	    		            console.log(error);
  //		                return next("Mysql error, check your query");
							responseObj.error=true;
	       					responseObj.errorMsg="FAILED : database query error.";
        					responseObj.responseData=error;0
		        			res.send(responseObj);
		        			return;
		           		}
			           else{
			        	   console.log("  DATA ------------------- ",data);
			        	   var userAdded =[];
//			        	   userAdded.push(data);
			        	   
						   conn.query("INSERT INTO USER_PROFILE SET ? ",user_profile, function(error, data){
					           if(error){
			    		            console.log(error);
									responseObj.error=true;
			       					responseObj.errorMsg="FAILED : database query error.";
		        					responseObj.responseData=error;
				        			res.send(responseObj);
				        			return;
				           		}
					           else{
//					        	    userAdded.push(data)
					        	   	responseObj.error=false;
			       					responseObj.errorMsg="SUCCESS : user registered successfully.";
//		        					responseObj.responseData=userAdded;
				        			res.send(responseObj);
				        			return;					        	   
					           }
				        });
			           }
		        });
		           }
	        });
	     });
	});


	app.post("/API/login/logoutSubmit", function(req, res) {
		console.log("loginserver -- /logoutSubmit")
		req.session.destroy();
//		console.log("session ",req.session);
		res.json({ logout: 'done' });
	});

}