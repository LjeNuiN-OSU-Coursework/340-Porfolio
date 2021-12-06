-- MySQL dump 10.16  Distrib 10.1.37-MariaDB, for Linux (x86_64)
--
-- Host: localhost    Database: Elementary School
-- ------------------------------------------------------
-- Server version	10.1.37-MariaDB

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
-- Table structure for table `tasks`
--

DROP TABLE IF EXISTS `Tasks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;

CREATE TABLE `Tasks` (
  `taskID` int(11) NOT NULL AUTO_INCREMENT,
  `taskDescription` varchar(255) NOT NULL,
  `taskClass` int(11) ,
  PRIMARY KEY (`taskID`),
  FOREIGN KEY (`taskClass`) REFERENCES `Classes` (`classID`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;


/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Tasks`
--

LOCK TABLES `Tasks` WRITE;
/*!40000 ALTER TABLE `Tasks` DISABLE KEYS */;

INSERT INTO `Tasks` (taskDescription, taskClass)VALUES 
('Photosynthesis Qestions', 1),
("One's times tables", 1),
("One's times tables", 1),
("Double trouble Q1- Q5", 2),
("Two's times tables", 3),
("Little red riding hood chapter 1 summary", 3);


/*!40000 ALTER TABLE `Tasks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Students`
--

DROP TABLE IF EXISTS `Students`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;

CREATE TABLE `Students` (
  `studentID` int(11) NOT NULL AUTO_INCREMENT,
  `studentFName` varchar(255) NOT NULL,
  `studentLName` varchar(255) NOT NULL,
  `studentAge` int(11) NOT NULL,
  `studentClass` int(11) DEFAULT NULL,
  PRIMARY KEY (`studentID`),
  FOREIGN KEY (`studentClass`) REFERENCES `Classes` (`classID`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Students`
--

LOCK TABLES `Students` WRITE;
/*!40000 ALTER TABLE `Students` DISABLE KEYS */;

INSERT INTO `Students` (`studentFName`, `studentLName`, `studentAge`,`studentClass`)
VALUES 
("Mike", "Henry",6 , 1),
("Davi", "Smith", 6, 2),
("John", "Deck", 7, 3),
("Khan", "Lee", 6, 4),
("Dereck", "Torres", 6, 5),
("Juan", "Pablo", 6, 1),
("Dave", "Jared", 6, 2);

/*!40000 ALTER TABLE `Students` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `studentTasks`
--

DROP TABLE IF EXISTS `studentTasks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `studentTasks` (
  `studentTasksSid` int(11) NOT NULL,
  `studentTasksTid` int(11) NOT NULL,
  `studentTasksCompletion` BOOLEAN NOT NULL DEFAULT 0,
  FOREIGN KEY (`studentTasksSid`) REFERENCES `Students` (`studentID`) ON DELETE CASCADE,
  FOREIGN KEY (`studentTasksTid`) REFERENCES `Tasks` (`taskID`) ON DELETE CASCADE
  
  
  
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bsg_people`
--

LOCK TABLES `studentTasks` WRITE;
/*!40000 ALTER TABLE `studentTasks` DISABLE KEYS */;


INSERT INTO `studentTasks` (`studentTasksSid`, `studentTasksTid`)
VALUES 
(1, 1),
(2, 1),
(3, 1),
(4, 1),
(5, 1),
(6, 1),
(7, 2)
;

/*!40000 ALTER TABLE `studentTasks` ENABLE KEYS */;
UNLOCK TABLES;




--
-- Table structure for table `Teachers`
--

DROP TABLE IF EXISTS `Teachers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Teachers` (
  `teacherID` int(11) NOT NULL AUTO_INCREMENT,
  `teacherFName` varchar(255) NOT NULL,
  `teacherLName` varchar(255) NOT NULL,
  PRIMARY KEY (`teacherID`)
  
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Teachers`
--

LOCK TABLES `Teachers` WRITE;
/*!40000 ALTER TABLE `Teachers` DISABLE KEYS */;


INSERT INTO `Teachers` (`teacherFName`, `teacherLName`) VALUES 
("Sarah", "Lee"),
("Jane", "Pysher"),
("Michael", "Nole"),
("Sarah", "Baker"),
("Katie", "Cruz")
;


/*!40000 ALTER TABLE `Teachers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Classes`
--

DROP TABLE IF EXISTS `Classes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Classes` (
  `classID` int(11) NOT NULL AUTO_INCREMENT UNIQUE,
  `classGrade` INT(11) NOT NULL,
  `classTeacher` INT(11) DEFAULT NULL,
  PRIMARY KEY (`classID`),
  FOREIGN KEY (`classTeacher`) REFERENCES `Teachers` (`teacherID`) ON DELETE SET NULL
  
) ENGINE=InnoDB AUTO_INCREMENT= 1 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Classes`
--

LOCK TABLES `Classes` WRITE;
/*!40000 ALTER TABLE `Classes` DISABLE KEYS */;


INSERT INTO `Classes` (`classGrade`, `classTeacher`) VALUES 
(1, 1),
(1, 2),
(1, 3),
(1, 4),
(1, 5);


/*!40000 ALTER TABLE `Classes` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed manually inputer by user

