-- MySQL dump 10.13  Distrib 8.0.18, for macos10.14 (x86_64)
--
-- Host: localhost    Database: writingg_bbdd
-- ------------------------------------------------------
-- Server version	8.0.18

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `categorias`
--

DROP TABLE IF EXISTS `categorias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categorias` (
  `idcategoria` int(11) NOT NULL AUTO_INCREMENT,
  `categoria` varchar(45) NOT NULL,
  PRIMARY KEY (`idcategoria`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categorias`
--

LOCK TABLES `categorias` WRITE;
/*!40000 ALTER TABLE `categorias` DISABLE KEYS */;
/*!40000 ALTER TABLE `categorias` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `concursos`
--

DROP TABLE IF EXISTS `concursos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `concursos` (
  `idconcursos` char(36) NOT NULL,
  `users_idusers` char(36) NOT NULL,
  `created_at` datetime NOT NULL,
  `nombreConcurso` varchar(255) NOT NULL,
  `bases` varchar(10000) NOT NULL,
  `fechaVencimiento` date DEFAULT NULL,
  `primerPremio` varchar(255) NOT NULL,
  `segundoPremio` varchar(255) DEFAULT NULL,
  `tercerPremio` varchar(255) DEFAULT NULL,
  `fechaPremiados` date DEFAULT NULL,
  `ganador` varchar(45) DEFAULT NULL,
  `segundo` varchar(45) DEFAULT NULL,
  `tercero` varchar(45) DEFAULT NULL,
  `cartel` varchar(255) DEFAULT NULL,
  `bases_pdf` varchar(255) DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL,
  `categoria` varchar(45) NOT NULL,
  `slugNombreConcurso` varchar(255) NOT NULL,
  PRIMARY KEY (`idconcursos`),
  UNIQUE KEY `nombreConcurso_UNIQUE` (`nombreConcurso`),
  KEY `fk_concursos_users1_idx` (`users_idusers`),
  CONSTRAINT `fk_concursos_users1` FOREIGN KEY (`users_idusers`) REFERENCES `users` (`idusers`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `concursos`
--

LOCK TABLES `concursos` WRITE;
/*!40000 ALTER TABLE `concursos` DISABLE KEYS */;
INSERT INTO `concursos` VALUES ('03d4467d-680d-4e61-94ea-56ab4876602b','a4cbaa24-8019-4518-a7bd-653364164070','2020-07-02 17:17:55','XII certamen literario Ciudad de Roma','<h1>Mi novela</h1>\n<h3><br>Lorem ipsum dolor sit amet consectetur adipiscing elit, sapien fusce cubilia etiam aliquet mauris<br>nam proin, inceptos iaculis metus odio donec feugiat. Himenaeos fames commodo laoreet<br>vivamus sociosqu suspendisse magna porta mi sollicitudin luctus praesent mus sem, interdum<br>hac vel suscipit augue tempus ante penatibus lobortis senectus nulla elementum. Malesuada ante<br>rhoncus dictum porttitor nunc consequat, lacinia turpis arcu sociis felis ligula, mollis scelerisque<br>ridiculus facilisis odio.</h3>\n<h5><br>Id dignissim sed proin vel vestibulum facilisi metus eros vitae pharetra, diam porta per imperdiet<br>justo curabitur vulputate orci vehicula, quis odio sem mus enim gravida mollis ultrices class.<br>Congue aenean condimentum dui maecenas libero et quis, venenatis odio urna elementum etiam<br>at sagittis, penatibus molestie magna convallis accumsan integer. Torquent felis commodo<br>habitant est faucibus tempus vivamus potenti aliquet, porttitor donec fames inceptos pharetra in<br>montes volutpat libero senectus, sed nam dis litora mattis fusce curae vehicula.</h5>\n<p></p>\n<div style=\"text-align:left;\"><img src=\"https://www.worten.es/i/a08825ca306eb2ccbf17a9cedb9a9c0d11b15952.jpg\" alt=\"undefined\" style=\"height: auto;width: auto\"/></div>\n<p></p>\n<blockquote><br>Lorem ipsum dolor sit amet consectetur adipiscing elit, sapien fusce cubilia etiam aliquet mauris<br>nam proin, inceptos iaculis metus odio donec feugiat. Himenaeos fames commodo laoreet<br>vivamus sociosqu suspendisse magna porta mi sollicitudin luctus praesent mus sem, interdum<br>hac vel suscipit augue tempus ante penatibus lobortis senectus nulla elementum. Malesuada ante<br>rhoncus dictum porttitor nunc consequat, lacinia turpis arcu sociis felis ligula, mollis scelerisque<br>ridiculus facilisis odio.</blockquote>\n<p></p>\n<p><span style=\"color: rgb(33,36,41);font-size: 16px;font-family: Nunito, Arial, Helvetica, sans-serif;\">Id dignissim sed proin vel vestibulum facilisi metus eros vitae pharetra, diam porta per imperdiet<br>justo curabitur vulputate orci vehicula</span></p>\n<p></p>\n<p><span style=\"color: rgb(33,36,41);font-size: 16px;font-family: Nunito, Arial, Helvetica, sans-serif;\">FIN</span></p>\n','2020-12-01','3200 €','1200 €','600 €','2021-01-01',NULL,NULL,NULL,'http://res.cloudinary.com/writingg/image/upload/v1593710277/133038ed-4872-48f5-bac4-9b41dc84ac12.jpg','http://res.cloudinary.com/writingg/image/upload/v1593710276/5b0c0c28-d1fe-453a-9e11-be6da29c539d.pdf',NULL,NULL,'Poesia','xii-certamen-literario-ciudad-de-roma'),('109b59a8-8b70-4934-a1c3-5768d33736b7','4e03e14d-149f-4dff-9029-d6e6a0c6d034','2020-06-21 08:52:28','I concurso literario San Pedro de Nós','<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>\n','2019-10-01','15000 €','','','2019-11-01','Óscar Fernández','Alberto Pérez','Juan Antonio López',NULL,NULL,NULL,NULL,'Cuentos','i-concurso-literario-san-pedro-de-nos'),('87a4cce5-8a0e-4206-81b3-c7027401e3c5','b9f3f6f3-9767-4074-9397-02d52470fd80','2020-07-12 19:15:02','XXIV Premio Alfaguara de novela 2021','<p>Enlace a las bases</p>\n<p>https://premioalfaguara.com/bases/</p>\n','2020-10-31','175000 $','','','2020-12-31',NULL,NULL,NULL,'http://res.cloudinary.com/writingg/image/upload/v1594581304/9dea893e-bbe8-4c8c-9dee-a8fa85073664.png','http://res.cloudinary.com/writingg/image/upload/v1594581303/69d8b23e-02c1-4208-a86b-141bdfd9a4d9.pdf',NULL,NULL,'Novela','xxiv-premio-alfaguara-de-novela-2021'),('8ee47e94-6e51-4c0c-9cbc-5f043342d2c5','a4cbaa24-8019-4518-a7bd-653364164070','2020-07-02 17:04:20','III concurso ciudad de Teruel 2020','<p><strong>Hola</strong></p>\n','2020-07-02','1000 €','600 €','400 €','2020-07-03','Santiago A.','Pedro S.','Pablo I.','http://res.cloudinary.com/writingg/image/upload/v1593709462/07a1adc7-7d5d-4311-ab57-db0a37e1b419.jpg','http://res.cloudinary.com/writingg/image/upload/v1593709460/cd028ce4-22e2-47ac-9356-549d1e7f5676.pdf',NULL,NULL,'Cuentos','iii-concurso-ciudad-de-teruel-2020'),('95978322-97ec-4389-bb1e-1b445da654f1','a4cbaa24-8019-4518-a7bd-653364164070','2020-06-14 17:58:56','V concurso jóvenes escritores Estrella Galicia','<p><span style=\"font-size: 18px;\"><strong>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</strong></span></p>\n','2020-07-06','18000','','','2020-09-01',NULL,NULL,NULL,'http://res.cloudinary.com/writingg/image/upload/v1593853155/b959031d-5353-4361-91e5-6930ddfbf5eb.jpg',NULL,NULL,NULL,'Poesia','v-concurso-jvenes-escritores-estrella-galicia'),('97558d16-c000-4680-9689-be10892238cd','b619efa4-0210-49ad-b4ed-05eed9c1de9f','2020-07-12 18:32:56','XX Premio Anual Transgenerico FCU 2020','<p>Enlace a las bases</p>\n<p>http://www.culturaurbana.online/convocatoria-2020/xix-premio-anual-transgenerico-fcu</p>\n','2020-09-25','1800 €','','','2020-11-25',NULL,NULL,NULL,'http://res.cloudinary.com/writingg/image/upload/v1594578777/6845e7ce-b690-46a8-9f76-de04d96cd3a1.jpg','http://res.cloudinary.com/writingg/image/upload/v1594578776/0e78845c-3878-4948-9980-23a4fac1d016.pdf',NULL,NULL,'Novela','xx-premio-anual-transgenerico-fcu-2020'),('a1a72a38-c0f1-41bb-9203-dbd8bcee12f3','a150b0f4-4051-43d7-89d6-fdc702009f0f','2020-07-12 19:08:50','Premio internacional de narrativa Marta de Mont Marçal 2021','<p>La empresa Mont Marçal, en colaboración con Roca Editorial e IMC Agencia Literaria, convoca, en su Octava Edición, el Premio Internacional de Narrativa Marta de Mont Marçal 2021, escrito por mujeres, con el objeto de dar voz y oportunidad a todas aquellas que deseen mostrar su creatividad y estimular a las que tienen algo que decir y desean compartirlo.</p>\n<p></p>\n<p>Enlace a las bases</p>\n<p>http://fundaciosierraifabra.org/pdf/BasesCAST-PremioMMM-2021.pdf</p>\n','2020-10-31','3000 €','','','2020-12-31',NULL,NULL,NULL,'http://res.cloudinary.com/writingg/image/upload/v1594580931/28a92634-0184-411d-86bf-533c1c6dae8d.png','http://res.cloudinary.com/writingg/image/upload/v1594580930/b6956009-71c1-4b94-8659-eb02cab6c8e9.pdf',NULL,NULL,'Novela','premio-internacional-de-narrativa-marta-de-mont-maral-2021'),('a239a691-a66d-4aa2-a521-befdb5d55d2f','4e03e14d-149f-4dff-9029-d6e6a0c6d034','2020-06-21 09:18:49','III premio de jóvenes escritores ciudad de Santander','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.','2020-11-01','11000 €',NULL,NULL,'2020-12-01',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'Microrrelatos','iii-premio-de-jvenes-escritores-ciudad-de-santander'),('d63821c5-7f17-4f60-9a63-67ab50278da0','a4cbaa24-8019-4518-a7bd-653364164070','2020-06-29 20:08:28','XIX premio COVID-19','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.','2019-05-01','1200 €',NULL,NULL,'2019-06-01',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'Cuentos','xix-premio-covid-19'),('dce54be1-3adf-45cc-913b-c34a3165b3a7','4e03e14d-149f-4dff-9029-d6e6a0c6d034','2020-06-21 09:05:39','X concurso literario nacional de Chile','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.','2020-12-31','5000 €',NULL,NULL,'2021-02-01',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'Ensayos','x-concurso-literario-nacional-de-chile'),('e65945b3-ea79-4970-a426-40ec926780f1','a4cbaa24-8019-4518-a7bd-653364164070','2020-07-02 18:13:08','4 concurso ciudad de Teruel 2020','<p><strong>asdasd</strong></p>\n','2020-07-02','1000 €','800 €','500 €','2020-07-02','Carlos R.','Manuel J.','Santiago R.','http://res.cloudinary.com/writingg/image/upload/v1593713590/5e1d7027-5977-4e13-bb13-afe9ed4e59f2.jpg','http://res.cloudinary.com/writingg/image/upload/v1593713589/94037d80-441a-41b1-81d7-b97b37e8e386.pdf',NULL,NULL,'Ensayos','4-concurso-ciudad-de-teruel-2020'),('f2d2469b-d8f3-4efa-9dc7-0cd4bb7ad3b1','dbc482c4-71e1-4381-94c0-b4ba2455e691','2020-07-12 18:07:34','Sexta edicion del premio Rrose Selavy de novela historica 2020','<p>Enlace a las bases</p>\n<p>https://www.apeironediciones.com/premio-rrose-selavy</p>\n','2020-08-18','18000 €','1200 €','800 €','2020-10-18',NULL,NULL,NULL,'http://res.cloudinary.com/writingg/image/upload/v1594577257/6bd2f80d-4224-4ac1-bac7-6243a3966a7e.jpg','http://res.cloudinary.com/writingg/image/upload/v1594577255/4e110c68-7974-4198-84e0-ddbf49a44883.pdf',NULL,NULL,'Novela','sexta-edicion-del-premio-rrose-selavy-de-novela-historica-2020');
/*!40000 ALTER TABLE `concursos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `idusers` char(36) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `dni` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `rol` varchar(45) NOT NULL,
  `created_at` datetime NOT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`idusers`),
  UNIQUE KEY `idusers_UNIQUE` (`idusers`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('17242c0b-a135-4f1d-8ae7-42521634260d','Usuario 4','12345678a','$2b$10$f8ayrcyQ.w.j7Px7nTH3RueGALYL2VWQgwe8UoO/I69okhk9HXvk2','yousercoru4@yopmail.com','escritor','2020-06-15 20:15:28',NULL),('45076114-9d8c-4159-9313-42f17d144d09','Usuario 2','12345678a','$2b$10$DH9XEPzB9J7M4QLUI5dBU.Y3JB.oI4mazqvxBs727mEQKRUi/22vO','yousercoru2@yopmail.com','escritor','2020-06-15 20:07:53',NULL),('4e03e14d-149f-4dff-9029-d6e6a0c6d034','Fundación Nós','12345678a','$2b$10$pTMQNoveIrg8sglW2wwoZeTfFfSmiXOvuJn1JekvKEBf8H/m6XE6W','yousercoruAyto2@yopmail.com','organizador','2020-06-15 20:15:54',NULL),('78210e38-c203-4ed4-ad15-b65064cb20c8','Usuario 1','12345678a','$2b$10$v/S6jDObSge.wLpTsACPROcGJBTAhBnfwl/VjnBnvj4V.m2oQglx.','yousercoru1@yopmail.com','escritor','2020-06-14 17:57:12',NULL),('a150b0f4-4051-43d7-89d6-fdc702009f0f','IMC Agencia Literaria','12345678a','$2b$10$958A6a.1yAKWCzBFQfU.6.Gazmvz2WUFQs2AC5eNfNZKwGZgz/WLq','yousercoruAyto23@yopmail.com','organizador','2020-07-12 19:00:05',NULL),('a4cbaa24-8019-4518-a7bd-653364164070','Ediciones HaB','12345678a','$2b$10$NwdWKWDqmOGtwPi3di0rWO3CLvu815n0spsP.0nIwdrXbWsowWqFS','yousercoruAyto1@yopmail.com','organizador','2020-06-14 17:56:53',NULL),('b04b8f34-d9e8-42a5-8a75-ff7faf7a150b','Usuario 3','12345673a','$2b$10$it0OSu2sax8rdA4sD8SVKOHKg/bRr4GUBknGTxkkzesrOyI1.YuHS','yousercoru3@yopmail.com','escritor','2020-06-15 20:11:03',NULL),('b619efa4-0210-49ad-b4ed-05eed9c1de9f','Fundación para la Cultura Urbana','12345678a','$2b$10$UCviKXxmIUq4DCsbYsfUBuyYUBjZRUWJNwCRecOQO5mvy3jR3xHdi','yousercoruAyto22@yopmail.com','organizador','2020-07-12 18:24:16',NULL),('b9f3f6f3-9767-4074-9397-02d52470fd80','Alfaguara','12345678a','$2b$10$FzM1kqEYW.oZ59qsqr.CdONVc7XtMF15JjMsG3YLU8zNpMwMtxZ5a','yousercoruAyto24@yopmail.com','organizador','2020-07-12 19:10:47',NULL),('dbc482c4-71e1-4381-94c0-b4ba2455e691','Apeirón Ediciones','12345678a','$2b$10$HzJmXjYGSc1x6Jq5Fb6r6uRTkDfM7zi4KlinlCxnxikgLIxUymMr2','yousercoruAyto21@yopmail.com','organizador','2020-07-12 17:45:54',NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users_has_concursos`
--

DROP TABLE IF EXISTS `users_has_concursos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users_has_concursos` (
  `users_idusers` char(36) NOT NULL,
  `concursos_idconcursos` char(36) NOT NULL,
  `obra` varchar(255) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `ratingParticipante` varchar(255) DEFAULT NULL,
  `ratingOrganizador` varchar(255) DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL,
  KEY `fk_users_has_concursos_concursos1_idx` (`concursos_idconcursos`),
  KEY `fk_users_has_concursos_users1_idx` (`users_idusers`),
  CONSTRAINT `fk_users_has_concursos_concursos1` FOREIGN KEY (`concursos_idconcursos`) REFERENCES `concursos` (`idconcursos`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `fk_users_has_concursos_users1` FOREIGN KEY (`users_idusers`) REFERENCES `users` (`idusers`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users_has_concursos`
--

LOCK TABLES `users_has_concursos` WRITE;
/*!40000 ALTER TABLE `users_has_concursos` DISABLE KEYS */;
INSERT INTO `users_has_concursos` VALUES ('78210e38-c203-4ed4-ad15-b65064cb20c8','95978322-97ec-4389-bb1e-1b445da654f1','https://res.cloudinary.com/writingg/image/upload/v1593333193/e80cf39c-3eb3-4ff5-af2d-64488b9dbc94.pdf','2020-06-15 20:22:24','3',NULL,'2020-06-28 08:26:33'),('45076114-9d8c-4159-9313-42f17d144d09','a239a691-a66d-4aa2-a521-befdb5d55d2f','https://res.cloudinary.com/writingg/image/upload/v1593243255/57ffae7c-f25f-433f-b052-c10a348e75a4.pdf','2020-06-27 07:34:14',NULL,NULL,NULL),('b04b8f34-d9e8-42a5-8a75-ff7faf7a150b','109b59a8-8b70-4934-a1c3-5768d33736b7','https://res.cloudinary.com/writingg/image/upload/v1593243468/1bb27e78-f713-46f0-80b8-3e07ef316b7e.pdf','2020-06-27 07:37:48','3','4',NULL),('b04b8f34-d9e8-42a5-8a75-ff7faf7a150b','dce54be1-3adf-45cc-913b-c34a3165b3a7','https://res.cloudinary.com/writingg/image/upload/v1593244667/5fcf6cfb-2ec0-4738-af4d-83b765452ac1.pdf','2020-06-27 07:57:46',NULL,NULL,NULL),('78210e38-c203-4ed4-ad15-b65064cb20c8','109b59a8-8b70-4934-a1c3-5768d33736b7','https://res.cloudinary.com/writingg/image/upload/v1593333351/20fecf5c-15f4-41b9-b287-34d260cc30c9.pdf','2020-06-28 07:32:48','4','2','2020-06-28 08:10:47'),('78210e38-c203-4ed4-ad15-b65064cb20c8','95978322-97ec-4389-bb1e-1b445da654f1','https://res.cloudinary.com/writingg/image/upload/v1593333193/e80cf39c-3eb3-4ff5-af2d-64488b9dbc94.pdf','2020-06-28 08:33:12','3',NULL,NULL),('78210e38-c203-4ed4-ad15-b65064cb20c8','109b59a8-8b70-4934-a1c3-5768d33736b7','https://res.cloudinary.com/writingg/image/upload/v1593333351/20fecf5c-15f4-41b9-b287-34d260cc30c9.pdf','2020-06-28 08:34:46','4','2','2020-06-28 08:35:08'),('78210e38-c203-4ed4-ad15-b65064cb20c8','109b59a8-8b70-4934-a1c3-5768d33736b7','https://res.cloudinary.com/writingg/image/upload/v1593333351/20fecf5c-15f4-41b9-b287-34d260cc30c9.pdf','2020-06-28 08:35:51','4','2',NULL),('78210e38-c203-4ed4-ad15-b65064cb20c8','d63821c5-7f17-4f60-9a63-67ab50278da0','https://res.cloudinary.com/writingg/image/upload/v1594054199/64e5420d-ed0a-4c72-9a6e-b00dc2668ab9.pdf','2020-07-06 16:49:59','5','4',NULL),('78210e38-c203-4ed4-ad15-b65064cb20c8','dce54be1-3adf-45cc-913b-c34a3165b3a7','https://res.cloudinary.com/writingg/image/upload/v1594155056/0ef0e93d-0ba6-4651-b5ae-890d39f796b4.pdf','2020-07-07 20:25:27',NULL,NULL,'2020-07-07 20:27:00'),('78210e38-c203-4ed4-ad15-b65064cb20c8','8ee47e94-6e51-4c0c-9cbc-5f043342d2c5','https://res.cloudinary.com/writingg/image/upload/v1594154616/be98b53f-f3e2-4cc1-958a-db8deffb123e.pdf','2020-07-07 20:43:36',NULL,NULL,NULL),('78210e38-c203-4ed4-ad15-b65064cb20c8','dce54be1-3adf-45cc-913b-c34a3165b3a7','https://res.cloudinary.com/writingg/image/upload/v1594155056/0ef0e93d-0ba6-4651-b5ae-890d39f796b4.pdf','2020-07-07 20:44:22',NULL,NULL,'2020-07-07 20:44:35'),('78210e38-c203-4ed4-ad15-b65064cb20c8','dce54be1-3adf-45cc-913b-c34a3165b3a7','https://res.cloudinary.com/writingg/image/upload/v1594155056/0ef0e93d-0ba6-4651-b5ae-890d39f796b4.pdf','2020-07-07 20:45:48',NULL,NULL,'2020-07-07 20:45:54'),('78210e38-c203-4ed4-ad15-b65064cb20c8','dce54be1-3adf-45cc-913b-c34a3165b3a7','https://res.cloudinary.com/writingg/image/upload/v1594155056/0ef0e93d-0ba6-4651-b5ae-890d39f796b4.pdf','2020-07-07 20:50:55',NULL,NULL,NULL);
/*!40000 ALTER TABLE `users_has_concursos` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-07-12 22:03:04
