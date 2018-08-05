'use strict';

var db=require('./../../config/dbConfig.js'); 
var Utils = require('../../common/Utils.js');

module.exports = function(app) {

	app.post('/API/admin/userSecurityProfile', function(req, res) {

		console.log("payload data  :  ",req.body);
		var responseObj=new Utils.Response();
		var userName = req.body.username;
		
		req.getConnection(function(err, connection) {
//			var userProfileQry = "SELECT * FROM USERS, USER_PROFILE WHERE EMAIL = USER_NAME AND EMAIL = ?";
			var userProfileQry = "SELECT * FROM SECURITY_PROFILE SP, APP_AUTH AA, APP_STATE APS " +
					"WHERE SP.APP_AUTH_ID = AA.APP_AUTH_ID " +
					"AND AA.APP_STATE_NAME = APS.APP_STATE_NAME " +
					"AND SP.SEC_PROFILE_ID = " +
					"(SELECT UP.ACCESS_LIST " +
					"FROM USERS U , USER_PROFILE UP " +
					"WHERE U.EMAIL = UP.USER_NAME AND U.EMAIL = ?)";
			connection.query(userProfileQry, [userName], function(err, rows) {
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
			});
		});
	});

}