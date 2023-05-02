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
-- Table structure for table `emopick`
--

DROP TABLE IF EXISTS `emopick`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `emopick` (
  `emopick_no` bigint NOT NULL AUTO_INCREMENT,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `content` text COLLATE utf8mb4_unicode_ci,
  `user_no` bigint DEFAULT NULL,
  `created_dt` datetime(6) NOT NULL,
  `modified_dt` datetime(6) NOT NULL,
  PRIMARY KEY (`emopick_no`),
  KEY `FKno2iv6tmtosvn4fm8fwiyr54n` (`user_no`),
  CONSTRAINT `FKno2iv6tmtosvn4fm8fwiyr54n` FOREIGN KEY (`user_no`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `emopick`
--

LOCK TABLES `emopick` WRITE;
/*!40000 ALTER TABLE `emopick` DISABLE KEYS */;
INSERT INTO `emopick` VALUES (2,'로맨스가 필요한 이모들에게','로맨스 웹툰 웹소설 추천해드립니다!',16,'2023-04-06 10:13:39.393590','2023-04-06 10:13:39.393590'),(4,'인생작 추천합니다!!','다들 많관부~\n다들 많관부~\n다들 많관부~\n다들 많관부~',3,'2023-04-06 10:38:35.936039','2023-04-06 16:44:27.888895'),(5,'나의 인생작','저의 로맨스 인생작들을 소개합니다.',55,'2023-04-06 16:20:56.400039','2023-04-06 16:20:56.400039'),(6,'나의 인생작!!! 꼭 보세요~~','이거 꼭 봐줘요~~ 제발!!!',6,'2023-04-06 17:05:59.475240','2023-04-06 17:05:59.475240'),(9,'진짜 재밌는 웹툰들','진짜 재밌는 웹툰 보고싶은 분들께 추천드립니다',16,'2023-04-07 03:39:59.795414','2023-04-07 03:39:59.795414');
/*!40000 ALTER TABLE `emopick` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-04-07  9:03:28
