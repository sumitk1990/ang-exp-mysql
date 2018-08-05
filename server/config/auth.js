'use strict'

var path = require('path');
//var securityProfile = require('./../mock/securityProfile.js');
var db = require('./dbConfig.js');

var unAuthTemplate = '<div class="jumbotron">'
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
	+ '</div>';

var get_cookies = function(request) {
	  var cookies = {};
	  if(typeof request.headers != 'undefined' && typeof request.headers.cookie != 'undefined'){
		  request.headers && request.headers.cookie.split(';').forEach(function(cookie) {
			    var parts = cookie.match(/(.*?)=(.*)$/)
			    cookies[ parts[1].trim() ] = (parts[2] || '').trim();
			  });  
	  }
	  return cookies;
	};

module.exports.checkAuthentication = function(req, res, next) {

	var stripped = req.url.split('/')[1];
	var requestedExtn = req.url.split('.')[1];
	var requestedView = path.join('./', stripped);
	
	var isAdmin = false;
	var isSuperUser = false;
	var USER_PROFILE = "";
	var USER_ACCESS = "";
	var validSessionId = req.sessionID;
	var requestCookies = get_cookies(req);	
	
	if(typeof req.session.authenticated != "undefined" && req.session.authenticated){
		USER_PROFILE = req.session.user_profile;
		USER_ACCESS = req.session.user.ACCESS_LIST;
		isAdmin = req.session.isAdmin;
		isSuperUser = req.session.isSuperUser;
		console.log("------------------------------------------------------------");
		console.log(" USER_PROFILE := ",USER_PROFILE,"\n USER_ACCESS := ",USER_ACCESS);
		console.log(" isSuperUser := ",req.session.isSuperUser,"\n isAdmin := ",req.session.isAdmin);
		console.log("------------------------------------------------------------");
	}
	
	if(typeof req.session.authenticated == "undefined" && requestCookies.sessionID){
		console.log(" sessionID ",requestCookies.sessionID );
		if(requestCookies.sessionID != validSessionId){
//			console.log(" SESSION is not Valid -\n validSessionId := ",validSessionId,"\n cookies.sessionID  := ",cookies.sessionID);
			res.clearCookie('sessionID');
		}
	}
		
	
//	TODO - if URL has been launched and user is not logged in then check if header session id is invalid 
//	(not matching with current session id) then remove all session header, cookie data.
	
//	console.log("Need to validate is current UI session is valid or not ",JSON.stringify(req.headers));
	
	
//	console.log(req.url.split('.')[1])
//	console.log("-----------------------------------------------------------------------");
//	console.log("checkAuthentication \n ------------------------------------------------------ \n req.originalUrl  = ", req.originalUrl);
//	console.log("checkAuthentication \n ------------------------------------------------------ \n  req.session  = ", req.session);
//	console.log("checkAuthentication \n ------------------------------------------------------ \n sessionID = ", req.sessionID);	
//	console.log("\n -----------------------------------------------------------------------");
//	console.log('\n ------ REQUESTED URL ------', req.url);
//	console.log('\n ------ stripped URL ------',stripped, "\n requestedExtn ",requestedExtn);
				 
				 /*
				  * if(auth_level == 0){
				  * 	next();
				  * 	}
				  * else{
				  * 	if(session authenticated true){
				  * 		//get profile url
				  * 			if(match url with profile){
				  * 					next()
				  * 				}
				  * 				else{
				  * 					unauth
				  * 				}
				  * 		}else{
				  * 		unauth
				  * 		}
				  * 
				  */
	
	var ADMINUSER_MASK = '*';
	var SUPERUSER_MARK = '99';
	
		if (stripped === 'src' && requestedExtn == 'html') {
			
//			if (typeof req.session.authenticated === "undefined") {
				
				req.getConnection(function(err, connection) {
					
					var authQry = " SELECT * FROM APP_STATE WHERE TEMPLATE_URL = ?";
					connection.query(authQry, [req.url],function(err, rows) {
//						            	console.log("authQry for TEMPLATE_URL data  :  ",rows);
						if (err) {
							console.log("Error Selecting : %s ", err);
						} else {
							var string = JSON.stringify(rows);
							var json =JSON.parse(string);
//							console.log("RESULT --------------",json);
							if (json.length==1){

								if(json[0].APP_AUTH_LEVEL ===0  && req.url === json[0].TEMPLATE_URL) {
									console.log("UNAUTH Page Check -----------------------", req.originalUrl);
									next();
								}
								else if(!isAdmin && USER_PROFILE 
										&& json[0].APP_AUTH_LEVEL ===1
										&& req.url === json[0].TEMPLATE_URL) {
									
									var status = false;
									for (var i = 0; i < USER_PROFILE.length; i++) {
//									    console.log("req.session.user_profile ",req.session.user_profile);
										var profile_url = USER_PROFILE[i].TEMPLATE_URL;
									    console.log("profile_url --------------- ",profile_url , "\n req.url ",req.url);
									    
									    if(profile_url == req.url){
									    	console.log("AUTH Page Check -----------------------", req.originalUrl);
									    	status=true;
									    	break;
//											next();
//											return;
									    }
									}
									if(status){
										next();
									}else{
										res.send(unAuthTemplate);
										return;
									}
								}else if(isAdmin){
									next();
								}
								else{
									res.send(unAuthTemplate);
									return;
								}
							}
							else{
								res.send(unAuthTemplate);
								return;
							}				
						}
					});
				});
//			}

		} else {
			next();
		}
		
/*
 
SELECT * FROM SECURITY_PROFILE SP, APP_AUTH AA, APP_STATE APS 
WHERE SP.APP_AUTH_ID = AA.APP_AUTH_ID 
AND AA.APP_STATE_NAME = APS.APP_STATE_NAME 
AND SP.SEC_PROFILE_ID = 
(SELECT UP.ACCESS_LIST 
FROM USERS U , USER_PROFILE UP 
WHERE U.EMAIL = UP.USER_NAME AND U.EMAIL = "abc@mail.com");
USER_PROFILE :=  [ { SEC_PROFILE_ID: 'GST001',
   SEC_PROFILE_NAME: 'GUESTUSER',
   SEC_PROFILE_DESC: 'Guest User Only',
   APP_AUTH_ID: 'HOME001',
   APP_AUTH_NAME: 'HOMESMY',
   APP_AUTH_DESCRIPTION: 'HOME SUMMARY SCREEN',
   APP_STATE_ID: 1,
   APP_STATE_NAME: 'home',
   APP_MODULE_NAME: 'home',
   APP_STATE_DESC: 'Home Summary Screen',
   PARENT: 'Y',
   URL: '/home',
   TEMPLATE_URL: '/src/home/home.html',
   CONTROLLER_URL: '/src/home/HomeCtrl.js',
   BREADCRUMB: 'Home',
   APP_AUTH_LEVEL: 0 },
 { SEC_PROFILE_ID: 'GST001',
   SEC_PROFILE_NAME: 'GUESTUSER',
   SEC_PROFILE_DESC: 'Guest User Only',
   APP_AUTH_ID: 'CONTACT001',
   APP_AUTH_NAME: 'CONTACTSMY',
   APP_AUTH_DESCRIPTION: 'CONTACT SUMMARY SCREEN',
   APP_STATE_ID: 3,
   APP_STATE_NAME: 'contact',
   APP_MODULE_NAME: 'contact',
   APP_STATE_DESC: 'Contact Summary Screen',
   PARENT: 'Y',
   URL: '/contact',
   TEMPLATE_URL: '/src/contact/contact.html',
   CONTROLLER_URL: '/src/contact/contactCtrl.js',
   BREADCRUMB: 'Contact',
   APP_AUTH_LEVEL: 1 } ]
USER_ACCESS :=  undefined
isSuperUser :=  false
isAdmin :=  false

 */


/*if (req.url.indexOf('/src/about/About.html') === 0) {
	console.log("About Page Check -----------------------", req.originalUrl);

	console.log(' securityProfile -------- ', securityProfile);

	// res.send('You are not authorized for this action.');
	res.send(unAuthTemplate);
	return;
}*/
}

