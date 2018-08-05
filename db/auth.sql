SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";
	
CREATE TABLE IF NOT EXISTS `APP_STATE` (
	`APP_STATE_ID` INT(3) NOT NULL AUTO_INCREMENT,
	`APP_STATE_NAME` VARCHAR(50) NOT NULL,
	`APP_MODULE_NAME` VARCHAR(100) NOT NULL,
	`APP_STATE_DESC` VARCHAR(300),
	`PARENT` VARCHAR(100),
	`URL` VARCHAR(300) NOT NULL,
	`TEMPLATE_URL` VARCHAR(300) NOT NULL,
	`CONTROLLER_URL` VARCHAR(300) NOT NULL,
	`BREADCRUMB` VARCHAR(300) NOT NULL,
	`APP_AUTH_LEVEL` INT(1) NOT NULL default 0,
	 PRIMARY KEY (`APP_STATE_ID`)
	) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1;

CREATE TABLE IF NOT EXISTS `APP_AUTH` (
	`APP_AUTH_ID` VARCHAR(50) NOT NULL,
	`APP_AUTH_NAME` VARCHAR(100) NOT NULL,
	`APP_AUTH_DESCRIPTION` VARCHAR(300),
	`APP_STATE_ID` INT(3) NOT NULL,
	`APP_STATE_NAME` VARCHAR(50) NOT NULL,
	PRIMARY KEY (`APP_AUTH_ID`)
);

CREATE TABLE IF NOT EXISTS `SECURITY_PROFILE` (
	`SEC_PROFILE_ID` VARCHAR(50) NOT NULL,
	`SEC_PROFILE_NAME` VARCHAR(100) NOT NULL,
	`SEC_PROFILE_DESC` VARCHAR(300),
	`APP_AUTH_ID` VARCHAR(50) NOT NULL) ;


INSERT INTO `angwebapp`.`APP_STATE`
(
	`APP_STATE_NAME`, `APP_MODULE_NAME`, `APP_STATE_DESC`, `PARENT`, `URL`, `TEMPLATE_URL`,`CONTROLLER_URL`,`BREADCRUMB`, `APP_AUTH_LEVEL`)
VALUES
	('home','home','Home Summary Screen','Y','/home','/src/home/home.html','/src/home/HomeCtrl.js','Home',0),
	('about','about','About Summary Screen','Y','/about','/src/about/about.html','/src/about/aboutCtrl.js','About', 0),
	('contact','contact','Contact Summary Screen','Y','/contact','/src/contact/contact.html','/src/contact/contactCtrl.js','Contact', 1),
	('login','login','Login Screen','Y','/login','/src/login/login.html','/src/login/loginCtrl.js','Login',0),
	('user','user','User Summary Screen','Y','/user','/src/user/user.html','/src/user/userCtrl.js','User',1),
	('admin','admin','Admin Panel Screen','Y','/admin-panel','/src/admin/admin.html','/src/admin/adminCtrl.js','Admin Panel',1);
    

	
INSERT INTO `angwebapp`.`APP_AUTH`
	(`APP_AUTH_ID`, `APP_AUTH_NAME`, `APP_AUTH_DESCRIPTION`, `APP_STATE_ID`, `APP_STATE_NAME`)
VALUES
	('HOME001','HOMESMY','HOME SUMMARY SCREEN',1,'home'),
	('ABOUT001','ABOUTSMY','ABOUT SUMMARY SCREEN',2,'about'),
	('CONTACT001','CONTACTSMY','CONTACT SUMMARY SCREEN',3,'contact'),
	('LOGIN001','LOGINREGISTER','LOGIN REGISTER SCREEN',4,'login'),
	('USER001','USERSMY','USER SUMMARY SCREEN',5,'user');


INSERT INTO `angwebapp`.`SECURITY_PROFILE`
	(`SEC_PROFILE_ID`,`SEC_PROFILE_NAME`,`SEC_PROFILE_DESC`,`APP_AUTH_ID`)
VALUES
	('GST001','GUESTUSER','Guest User Only','USER001'),
	('GST001','GUESTUSER','Guest User Only','CONTACT001'),
	('ADMIN01','ADMINUSER','Admin User Only for app','*'),
	('SUPERUSER01','SUPERUSER','All acces','99');


COMMIT;