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
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `user_id` bigint NOT NULL AUTO_INCREMENT,
  `created_dt` datetime(6) NOT NULL,
  `modified_dt` datetime(6) NOT NULL,
  `email` varchar(512) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `image_url` varchar(512) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `nick_name` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `password` varchar(128) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `provider_type` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `provider_id` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_name` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `age` int DEFAULT NULL,
  `gender` int DEFAULT NULL,
  `favorite_novel_genre` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `favorite_webtoon_genre` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `UK_d2ia11oqhsynodbsi46m80vfc` (`nick_name`)
) ENGINE=InnoDB AUTO_INCREMENT=69 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (2,'2023-03-15 13:14:24.835377','2023-04-06 14:09:59.305028','gms9424@naver.com','static/user/c28268fa-b70d-4d72-abf5-e1fd32321e72ge.jpeg','erwe11',NULL,'kakao','2704530406','이나연',20,1,'11^10^13^','10^11^12^'),(3,'2023-03-15 13:19:29.479316','2023-04-04 10:20:44.794671','shine7065@naver.com','static/user/bca423fd-bc06-4a6c-8e70-a90dc5de1b26172.jpg','Thor',NULL,'kakao','2706019207','박찬희',20,1,'11^10^13^','11^10^12^'),(5,'2023-03-15 14:01:57.925226','2023-03-31 15:29:25.551188','gms9424@naver.com','static/user/d5be5034-79c6-4ef7-861a-0f119247c9c6age.png','64699',NULL,'naver','-Ce7XI0addOOTM96nEEhZSskSASUSHSAl0R34Ehu8cg','이나연',20,1,'11^10^27^','12^10^14^'),(6,'2023-03-15 14:02:20.868549','2023-04-06 10:25:06.943990','ai06010@naver.com','static/user/307242c6-803c-4d0d-93c6-46791670ebbb920.png','현지',NULL,'kakao','2706721209','남현지',20,1,'11^14^27^','11^10^12^'),(11,'2023-03-22 17:14:14.217266','2023-04-06 23:15:03.465808','gml05211@naver.com','static/user/f9894306-6098-48d3-8f86-d82a045a20fa98c.jpg','틴탑위고롹잇드뢉잇',NULL,'naver','ub_yON0Um9MIeTfkaNJkxznSaQ3FJdTlsz7lJsIyXDs','박찬희',20,0,'13^27^11^','11^13^12^'),(13,'2023-03-22 22:49:31.625586','2023-04-06 00:59:35.438079','notify9637@naver.com','static/user/7b999879-20ea-4e24-a3c9-d20462961682tjs.png','밥먹고올게5',NULL,'kakao','2716836577','김종혁',20,0,'13^11^27^','11^10^13^'),(16,'2023-03-23 09:46:00.562343','2023-04-04 16:25:30.287617','hororolorlor@naver.com','static/user/794ae877-9702-4311-93dc-5b9c1ba33636ion.png','호롱',NULL,'kakao','2718070301','김현영',20,1,'13^10^11^','10^12^11^'),(18,'2023-03-23 17:02:01.411367','2023-03-28 00:00:02.769796','dfsd',NULL,NULL,NULL,NULL,NULL,'dsfsdf',20,0,NULL,NULL),(19,'2023-03-23 17:17:11.973715','2023-03-28 00:00:02.769796','dfsd',NULL,NULL,NULL,NULL,NULL,'dsfsdf',30,0,NULL,NULL),(20,'2023-03-27 14:45:11.500844','2023-04-06 16:53:40.995316','ai06010@naver.com','static/user/d202a65e-b56f-45f8-9377-7b1c7cc9fa3cimg.png','액션짱',NULL,'naver','nhQctZJFynGug7ADVNHkoT1vO8JbL-0o78OFKBMrqEk','남현지',30,0,'14^27^13^','13^14^11^'),(21,'2023-03-23 17:02:01.411367','2023-03-29 00:00:04.306658','fdg',NULL,NULL,NULL,NULL,NULL,NULL,40,1,NULL,'11^13^10^'),(22,'2023-03-23 17:02:01.411367','2023-03-29 00:00:04.306658','hgjgf',NULL,NULL,NULL,NULL,NULL,NULL,30,1,NULL,'11^10^12^'),(23,'2023-03-23 17:02:01.411367','2023-03-29 00:00:04.306658','kljl',NULL,NULL,NULL,NULL,NULL,NULL,40,0,NULL,'10^13^11^'),(24,'2023-03-23 17:02:01.411367','2023-03-29 00:00:04.306658','gjghj',NULL,NULL,NULL,NULL,NULL,NULL,30,0,'14^10^11^','14^10^11^'),(25,'2023-03-30 17:16:15.567839','2023-04-04 09:12:28.964433','shine7065@naver.com','static/user/d5be5034-79c6-4ef7-861a-0f119247c9c6age.png','리키',NULL,'naver','AMa-RVnRG7vDd7TZCY2gJjHQDyeSAcWhnLLXhZxpuOg','박찬희',20,1,'11^27^10^','11^10^12^'),(26,'2023-03-31 15:32:08.966729','2023-03-31 15:32:21.146501','dnjsvltm425@naver.com','static/user/d5be5034-79c6-4ef7-861a-0f119247c9c6age.png','염탐러',NULL,'kakao','2729542864','권도현',60,0,NULL,'10^11^12^'),(27,'2023-03-31 16:43:35.955620','2023-03-31 16:43:54.894591','nv_tkwjsrjatn2@naver.com','static/user/d5be5034-79c6-4ef7-861a-0f119247c9c6age.png','니크네',NULL,'naver','fXNmhKDylAvDmXqEuHyydf33SS4d4D4H9DaIMttOdrc','네아로',20,1,NULL,'10^11^12^'),(28,'2023-03-31 16:43:54.894592','2023-03-31 16:43:54.894592','10대 남','static/user/d5be5034-79c6-4ef7-861a-0f119247c9c6age.png','아이언맨',NULL,NULL,NULL,'아이언맨',10,0,'13^27^14^','13^10^11^'),(29,'2023-03-31 16:43:35.955620','2023-03-31 16:43:35.955620','40대 남',NULL,NULL,NULL,NULL,NULL,NULL,40,0,'14^10^11^','14^10^11^'),(30,'2023-03-31 16:43:35.955620','2023-03-31 16:43:35.955620','40대 여',NULL,NULL,NULL,NULL,NULL,NULL,40,1,'13^10^11^','12^10^11^'),(31,'2023-03-31 16:43:35.955620','2023-03-31 16:43:35.955620','50대 남',NULL,NULL,NULL,NULL,NULL,NULL,50,0,'14^10^11^','14^10^11^'),(32,'2023-03-31 16:43:35.955620','2023-03-31 16:43:35.955620','50대 여',NULL,NULL,NULL,NULL,NULL,NULL,50,1,'10^11^13^','10^12^11^'),(33,'2023-03-31 16:43:35.955620','2023-03-31 16:43:35.955620','60대 남',NULL,NULL,NULL,NULL,NULL,NULL,60,0,'14^10^11^','12^10^11^'),(34,'2023-03-31 16:43:35.955620','2023-03-31 16:43:35.955620','60대 여',NULL,NULL,NULL,NULL,NULL,NULL,60,1,'10^11^13^','10^11^12^'),(35,'2023-03-31 16:43:35.955620','2023-03-31 16:43:35.955620','10대 여',NULL,NULL,NULL,NULL,NULL,NULL,10,1,'11^10^13^','10^11^12^'),(36,'2023-04-03 14:37:42.008937','2023-04-03 14:37:52.690522','rlaehdwn975@yahoo.co.kr','static/user/d5be5034-79c6-4ef7-861a-0f119247c9c6age.png','아아',NULL,'naver','OhvAZO0CgmPx1ZTit0SdAkgiLdJ_joZ_WTQEGkWTHiE','김동주',20,0,'11^14^10^','11^13^12^'),(37,'2023-04-03 14:37:52.690522','2023-04-03 14:37:52.690522','30대 남1',NULL,NULL,NULL,NULL,NULL,NULL,30,0,'27^14^10^','12^14^10^'),(38,'2023-04-03 14:37:52.690522','2023-04-03 14:37:52.690522','30대 여',NULL,NULL,NULL,NULL,NULL,NULL,30,1,'10^11^13^','10^12^16^'),(39,'2023-04-03 16:52:45.543724','2023-04-03 17:52:17.194115','gn05211@naver.com','static/user/1e3b0135-9f48-437c-b488-9a8a042c06f7291.png','니엘',NULL,'naver','U94b9s-MsoK3KzaKVzY3a3NZWH5PeUXvKxF5OxBizO0','박찬희',20,1,'11^10^27^','10^11^12^'),(45,'2023-04-04 21:57:15.759173','2023-04-04 22:01:18.844966','lde9424@naver.com','static/user/d5be5034-79c6-4ef7-861a-0f119247c9c6age.png','하이이',NULL,'kakao','2735472419','이동은',20,1,'11^27^10^','10^12^11^'),(46,'2023-04-04 21:58:53.865101','2023-04-04 22:25:21.601946','daeminimini@naver.com','static/user/2bd89486-ebae-4d46-ad53-b68d55a9808e112.jpg','대미니',NULL,'kakao','2735474874','김소민',20,1,'27^10^11^','12^10^16^'),(47,'2023-04-05 12:46:58.327914','2023-04-05 12:49:03.302655','p_t9rres@naver.com','static/user/d5be5034-79c6-4ef7-861a-0f119247c9c6age.png','설렁탕뚝배기',NULL,'naver','-5jZHRSFyEM934HPmkRwblk5JxaJFNikkWEYsJ4RPoo','박주현',20,0,'28^10^11^','12^10^14^'),(51,'2023-04-05 17:53:26.415277','2023-04-05 17:53:26.415277','feffefffe@daum.net','static/user/d5be5034-79c6-4ef7-861a-0f119247c9c6age.png',NULL,NULL,'naver','quG_nG8BibO2buXxS8-nK5sbbE-3WxuwecP3FfKO0BM','김현영',NULL,NULL,NULL,NULL),(52,'2023-04-05 21:00:51.578937','2023-04-06 10:02:00.595633','dmstjs7047@kakao.com','static/user/82543014-2a8f-4847-9191-0ecfa67d4044B59.png','구름이짠나',NULL,'kakao','2736809812','강은선',20,1,'11^27^14^','11^13^12^'),(53,'2023-04-06 13:23:11.299559','2023-04-07 01:11:08.337596','voxifera@naver.com','static/user/d5be5034-79c6-4ef7-861a-0f119247c9c6age.png','앙앙',NULL,'kakao','2711132815','김동주',20,0,'10^11^27^','12^11^14^'),(54,'2023-04-06 13:48:26.223581','2023-04-06 13:48:57.598813','voxifera@naver.com','static/user/d5be5034-79c6-4ef7-861a-0f119247c9c6age.png','테스트얌',NULL,'naver','xmY7nvDd5r6CxGL4WYoK2BdNiEyV3W_veefQU7BnGeA','김동주',50,1,'10^13^27^','10^11^13^'),(55,'2023-04-06 13:52:59.729673','2023-04-06 17:03:07.733642','rkwl0901@naver.com','static/user/cd6baeab-694a-4d99-af5d-d406ce9abb82ng1.png',' 안녕하세요',NULL,'naver','4dHfANRd4k5kHdNDqMQJIOFViF8VZz2fhpHWKaQN7xw','이나연',20,0,'13^14^27^','14^13^10^'),(56,'2023-04-06 14:54:32.402913','2023-04-06 14:56:25.281727','us5524@naver.com','static/user/d5be5034-79c6-4ef7-861a-0f119247c9c6age.png','감자수염',NULL,'naver','GzKjnQJBMLKmXI3K1rrG3ldX_I0WPMHiwc2uoK0xJt4','이보배',20,1,'11^10^14^','12^10^11^'),(57,'2023-04-06 14:57:54.837028','2023-04-06 15:40:54.876947','xmdnls94@daum.net','static/user/d5be5034-79c6-4ef7-861a-0f119247c9c6age.png','해니',NULL,'kakao','2737705440','이혜은',20,1,'11^27^10^','11^10^13^'),(58,'2023-04-06 14:58:43.458831','2023-04-06 14:59:45.669313','tmfdhddl2006@naver.com','static/user/d5be5034-79c6-4ef7-861a-0f119247c9c6age.png','bingbang',NULL,'kakao','2737706512','이병수',20,0,'14^28^13^','13^14^12^'),(59,'2023-04-06 15:59:28.455169','2023-04-06 15:59:28.455169','enfdl94@naver.com','static/user/d5be5034-79c6-4ef7-861a-0f119247c9c6age.png',NULL,NULL,'kakao','2737786985','이혜진',NULL,NULL,NULL,NULL),(61,'2023-04-06 18:09:41.315308','2023-04-06 18:10:48.625061','kjh2217@hanmail.net','static/user/d5be5034-79c6-4ef7-861a-0f119247c9c6age.png','헬로',NULL,'naver','HXSboIkllYdEpEkoLCp62hxYpNLi5vQ0zokzEsIDliQ','이주희',30,1,'10^11^27^','13^10^11^'),(62,'2023-04-06 22:06:49.409221','2023-04-06 22:08:46.228994','soov2ly@naver.com','static/user/d5be5034-79c6-4ef7-861a-0f119247c9c6age.png','수현',NULL,'kakao','2738283846','조수현',20,1,'10^27^11^','10^12^16^'),(63,'2023-04-06 22:15:15.265907','2023-04-06 22:15:47.446566','notify9637@naver.com','static/user/d5be5034-79c6-4ef7-861a-0f119247c9c6age.png','밥먹2',NULL,'naver','iqYHHKPEv1zrIV46APZBAP43EgTU5lvk46acM1OkFFA','김종혁',20,0,'14^10^15^','13^12^14^'),(64,'2023-04-06 22:47:26.357999','2023-04-06 22:48:57.844491','edzzi0830@gmail.com','static/user/d5be5034-79c6-4ef7-861a-0f119247c9c6age.png','나무엣지',NULL,'kakao','2738341560','남예지',20,1,'27^10^13^','10^11^16^'),(65,'2023-04-06 23:24:14.846703','2023-04-06 23:27:21.810706','soojln321@kakao.com','static/user/d5be5034-79c6-4ef7-861a-0f119247c9c6age.png','탱구',NULL,'kakao','2738383857','박수진',20,1,'15^10^11^','12^10^11^'),(66,'2023-04-06 23:26:52.604693','2023-04-06 23:30:54.033893','alsdud8591@naver.com','static/user/d5be5034-79c6-4ef7-861a-0f119247c9c6age.png','33',NULL,'naver','uCGByqL8W3wIqm65J_6Ex6ihOMrcG1ljyY9c9XL-Lo4','김민영',20,1,'27^10^11^','10^12^16^'),(67,'2023-04-06 23:52:03.334355','2023-04-07 00:03:07.824020','lsm911@nate.com','static/user/d5be5034-79c6-4ef7-861a-0f119247c9c6age.png','민짱',NULL,'kakao','2738410848','이성민',20,1,'10^11^13^','10^12^14^'),(68,'2023-04-07 01:56:13.159294','2023-04-07 01:57:16.831949','gms08144@naver.com','static/user/d5be5034-79c6-4ef7-861a-0f119247c9c6age.png','쀼꾸쀼뀨',NULL,'kakao','2738490643','이문정',20,1,'27^10^15^','10^12^11^');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-04-07  9:03:26
