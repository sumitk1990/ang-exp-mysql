CREATE DATABASE  IF NOT EXISTS `angwebapp` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `angwebapp`;
-- MySQL dump 10.13  Distrib 5.7.9, for Win64 (x86_64)
--
-- Host: localhost    Database: angwebapp
-- ------------------------------------------------------
-- Server version	5.7.15-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `APP_AUTH`
--

DROP TABLE IF EXISTS `APP_AUTH`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `APP_AUTH` (
  `APP_AUTH_ID` varchar(50) NOT NULL,
  `APP_AUTH_NAME` varchar(100) NOT NULL,
  `APP_AUTH_DESCRIPTION` varchar(300) DEFAULT NULL,
  `APP_STATE_ID` int(3) NOT NULL,
  `APP_STATE_NAME` varchar(50) NOT NULL,
  PRIMARY KEY (`APP_AUTH_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `APP_AUTH`
--

LOCK TABLES `APP_AUTH` WRITE;
/*!40000 ALTER TABLE `APP_AUTH` DISABLE KEYS */;
INSERT INTO `APP_AUTH` VALUES ('ABOUT001','ABOUTSMY','ABOUT SUMMARY SCREEN',2,'about'),('CONTACT001','CONTACTSMY','CONTACT SUMMARY SCREEN',3,'contact'),('HOME001','HOMESMY','HOME SUMMARY SCREEN',1,'home'),('LOGIN001','LOGINREGISTER','LOGIN REGISTER SCREEN',4,'login'),('USER001','USERSMY','USER SUMMARY SCREEN',5,'user');
/*!40000 ALTER TABLE `APP_AUTH` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `APP_STATE`
--

DROP TABLE IF EXISTS `APP_STATE`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `APP_STATE` (
  `APP_STATE_ID` int(3) NOT NULL AUTO_INCREMENT,
  `APP_STATE_NAME` varchar(50) NOT NULL,
  `APP_MODULE_NAME` varchar(100) NOT NULL,
  `APP_STATE_DESC` varchar(300) DEFAULT NULL,
  `PARENT` varchar(100) DEFAULT NULL,
  `URL` varchar(300) NOT NULL,
  `TEMPLATE_URL` varchar(300) NOT NULL,
  `CONTROLLER_URL` varchar(300) NOT NULL,
  `BREADCRUMB` varchar(300) NOT NULL,
  `APP_AUTH_LEVEL` int(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`APP_STATE_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `APP_STATE`
--

LOCK TABLES `APP_STATE` WRITE;
/*!40000 ALTER TABLE `APP_STATE` DISABLE KEYS */;
INSERT INTO `APP_STATE` VALUES (1,'home','home','Home Summary Screen','Y','/home','/src/home/home.html','/src/home/HomeCtrl.js','Home',0),(2,'about','about','About Summary Screen','Y','/about','/src/about/about.html','/src/about/aboutCtrl.js','About',0),(3,'contact','contact','Contact Summary Screen','Y','/contact','/src/contact/contact.html','/src/contact/contactCtrl.js','Contact',1),(4,'login','login','Login Screen','Y','/login','/src/login/login.html','/src/login/loginCtrl.js','Login',0),(5,'user','user','User Summary Screen','Y','/user','/src/user/user.html','/src/user/userCtrl.js','User',1),(6,'admin','admin','Admin Panel Screen','Y','/admin-panel','/src/admin/admin.html','/src/admin/adminCtrl.js','Admin Panel',1);
/*!40000 ALTER TABLE `APP_STATE` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `SECURITY_PROFILE`
--

DROP TABLE IF EXISTS `SECURITY_PROFILE`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `SECURITY_PROFILE` (
  `SEC_PROFILE_ID` varchar(50) NOT NULL,
  `SEC_PROFILE_NAME` varchar(100) NOT NULL,
  `SEC_PROFILE_DESC` varchar(300) DEFAULT NULL,
  `APP_AUTH_ID` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `SECURITY_PROFILE`
--

LOCK TABLES `SECURITY_PROFILE` WRITE;
/*!40000 ALTER TABLE `SECURITY_PROFILE` DISABLE KEYS */;
INSERT INTO `SECURITY_PROFILE` VALUES ('GST001','GUESTUSER','Guest User Only','USER001'),('GST001','GUESTUSER','Guest User Only','CONTACT001'),('ADMIN01','ADMINUSER','Admin User Only for app','*'),('SUPERUSER01','SUPERUSER','Guest User Only','99');
/*!40000 ALTER TABLE `SECURITY_PROFILE` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `SESSIONS`
--

DROP TABLE IF EXISTS `SESSIONS`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `SESSIONS` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int(11) unsigned NOT NULL,
  `data` text CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  PRIMARY KEY (`session_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `SESSIONS`
--

LOCK TABLES `SESSIONS` WRITE;
/*!40000 ALTER TABLE `SESSIONS` DISABLE KEYS */;
INSERT INTO `SESSIONS` VALUES ('D-uVtNKIqZYYz1ZZpuTfx0-o0OQI0nAK',1508091826,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"isAdmin\":true,\"isSuperUser\":false,\"ACCESS_LIST\":\"ADMIN01\",\"authenticated\":true,\"user\":{\"USER_ID\":7,\"FIRST_NAME\":\"Admin\",\"MIDDLE_NAME\":\"\",\"LAST_NAME\":\"User\",\"EMAIL\":\"admin@mail.com\",\"USER_NAME\":\"admin@mail.com\",\"ACCESS_LIST\":\"ADMIN01\"},\"USER_PROFILE\":[]}');
/*!40000 ALTER TABLE `SESSIONS` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `USER_PROFILE`
--

DROP TABLE IF EXISTS `USER_PROFILE`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `USER_PROFILE` (
  `USER_NAME` varchar(100) NOT NULL,
  `PASSWORD` varchar(100) NOT NULL,
  `ACCESS_LIST` varchar(100) NOT NULL,
  PRIMARY KEY (`USER_NAME`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `USER_PROFILE`
--

LOCK TABLES `USER_PROFILE` WRITE;
/*!40000 ALTER TABLE `USER_PROFILE` DISABLE KEYS */;
INSERT INTO `USER_PROFILE` VALUES ('abc@mail.com','123456','GST001'),('admin@mail.com','123456','ADMIN01');
/*!40000 ALTER TABLE `USER_PROFILE` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `USERS`
--

DROP TABLE IF EXISTS `USERS`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `USERS` (
  `USER_ID` int(11) NOT NULL AUTO_INCREMENT,
  `FIRST_NAME` varchar(100) NOT NULL,
  `MIDDLE_NAME` varchar(100) DEFAULT NULL,
  `LAST_NAME` varchar(100) DEFAULT NULL,
  `EMAIL` varchar(100) NOT NULL,
  PRIMARY KEY (`USER_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `USERS`
--

LOCK TABLES `USERS` WRITE;
/*!40000 ALTER TABLE `USERS` DISABLE KEYS */;
INSERT INTO `USERS` VALUES (1,'PUNEET','','SHEKHAR','abc@mail.com'),(2,'Admin','','User','admin@mail.com');
/*!40000 ALTER TABLE `USERS` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-10-15 23:56:42
