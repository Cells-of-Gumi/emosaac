-- MySQL dump 10.13  Distrib 8.0.31, for Win64 (x86_64)
--
-- Host: j8d203.p.ssafy.io    Database: emosaac
-- ------------------------------------------------------
-- Server version	8.0.29

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
-- Table structure for table `like_emo`
--

DROP TABLE IF EXISTS `like_emo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `like_emo` (
  `like_no` bigint NOT NULL AUTO_INCREMENT,
  `created_dt` datetime(6) NOT NULL,
  `modified_dt` datetime(6) NOT NULL,
  `emopick_no` bigint DEFAULT NULL,
  `user_no` bigint DEFAULT NULL,
  PRIMARY KEY (`like_no`),
  KEY `FK9jskig5arjx0hhfgeig6qmdxm` (`emopick_no`),
  KEY `FKfur218i5iu3ujvo3hraps1a54` (`user_no`),
  CONSTRAINT `FK9jskig5arjx0hhfgeig6qmdxm` FOREIGN KEY (`emopick_no`) REFERENCES `emopick` (`emopick_no`),
  CONSTRAINT `FKfur218i5iu3ujvo3hraps1a54` FOREIGN KEY (`user_no`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `like_emo`
--

LOCK TABLES `like_emo` WRITE;
/*!40000 ALTER TABLE `like_emo` DISABLE KEYS */;
INSERT INTO `like_emo` VALUES (12,'2023-04-07 03:32:55.017057','2023-04-07 03:32:55.017057',2,16),(13,'2023-04-07 03:41:03.178670','2023-04-07 03:41:03.178670',6,16),(14,'2023-04-07 03:41:27.789187','2023-04-07 03:41:27.789187',9,16),(15,'2023-04-07 08:36:23.695336','2023-04-07 08:36:23.695336',5,16),(16,'2023-04-07 08:36:30.266224','2023-04-07 08:36:30.266224',4,16);
/*!40000 ALTER TABLE `like_emo` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-04-07  9:03:20
