-- MySQL dump 10.13  Distrib 8.0.46, for Win64 (x86_64)
--
-- Host: localhost    Database: dealershop_db
-- ------------------------------------------------------
-- Server version	8.0.46

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
-- Table structure for table `business_config`
--

DROP TABLE IF EXISTS `business_config`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `business_config` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `business_name` varchar(100) NOT NULL,
  `tagline` varchar(150) DEFAULT NULL,
  `contact_phone` varchar(20) NOT NULL,
  `whatsapp_number` varchar(20) NOT NULL,
  `email` varchar(100) DEFAULT NULL,
  `address` varchar(200) DEFAULT NULL,
  `currency_code` varchar(10) DEFAULT 'LKR',
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `business_config`
--

LOCK TABLES `business_config` WRITE;
/*!40000 ALTER TABLE `business_config` DISABLE KEYS */;
INSERT INTO `business_config` VALUES (1,'Thenula Enterprises','Premium & Verified Automotive Hub','94 76 820 2700','94 76 820 2700','thenula2002@gmail.com','Mawathagama, Sri Lanka','LKR','2026-09-24 04:09:18');
/*!40000 ALTER TABLE `business_config` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customers`
--

DROP TABLE IF EXISTS `customers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customers` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_rfbvkrffamfql7cjmen8v976v` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customers`
--

LOCK TABLES `customers` WRITE;
/*!40000 ALTER TABLE `customers` DISABLE KEYS */;
INSERT INTO `customers` VALUES (1,'2026-09-24 04:00:54.356514','thenula2002@gmail.com','thenu','1234');
/*!40000 ALTER TABLE `customers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `inquiries`
--

DROP TABLE IF EXISTS `inquiries`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `inquiries` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `vehicle_id` bigint DEFAULT NULL,
  `customer_name` varchar(100) NOT NULL,
  `phone_number` varchar(20) NOT NULL,
  `message` text,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `appointment_date` varchar(255) DEFAULT NULL,
  `inquiry_type` varchar(255) DEFAULT NULL,
  `customer_id` bigint DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `vehicle_id` (`vehicle_id`),
  CONSTRAINT `inquiries_ibfk_1` FOREIGN KEY (`vehicle_id`) REFERENCES `vehicles` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `inquiries`
--

LOCK TABLES `inquiries` WRITE;
/*!40000 ALTER TABLE `inquiries` DISABLE KEYS */;
INSERT INTO `inquiries` VALUES (1,2,'thenuu','0768202700','Interested in Honda Vezel Z Grade 2015','2026-09-16 12:45:35','2026-09-17 at 09:00','INSPECTION',NULL,NULL),(2,2,'thenuu','0768202700','Interested in Honda Vezel Z Grade 2015','2026-09-16 12:46:15','2026-09-17 at 09:00','TEST_DRIVE',NULL,NULL),(3,2,'ghjkhjk','0768202700','hjjmj','2026-09-21 10:56:56','2026-09-03 at 11:00','INSPECTION',NULL,NULL),(4,1,'dilhara','0768202700','hrrrrrr','2026-09-21 11:05:27','2026-09-23 at 12:07','INSPECTION',NULL,NULL),(5,1,'yyyy','0123456789','dsfhgfb','2026-09-21 11:11:27','2026-09-30 at 10:12','INSPECTION',NULL,NULL),(6,1,'Thenula Dilhara Rathnayaka','0768202700','tr','2026-09-21 11:12:39','2026-09-09 at 11:59','INSPECTION',NULL,NULL),(7,1,'Thenula Rathnayake','0768202700','hello','2026-09-21 11:17:28','2026-09-23 at 13:20','INSPECTION',NULL,NULL),(8,1,'Thenula Rathnayake','0768202700','hello','2026-09-21 11:17:38','2026-09-23 at 13:20','INSPECTION',NULL,NULL),(9,1,'Thenula Rathnayake','0768202700','hello','2026-09-21 11:17:48','2026-09-23 at 13:20','INSPECTION',NULL,NULL),(10,1,'Thenula Rathnayake','0768202700','hello','2026-09-21 11:17:48','2026-09-23 at 13:20','INSPECTION',NULL,NULL),(11,1,'Thenula Rathnayake','0768202700','hello','2026-09-21 11:17:48','2026-09-23 at 13:20','INSPECTION',NULL,NULL),(12,1,'Thenula Rathnayake','0768202700','hello','2026-09-21 11:17:49','2026-09-23 at 13:20','INSPECTION',NULL,NULL),(13,1,'Thenula Rathnayake','0768202700','hello','2026-09-21 11:17:53','2026-09-23 at 13:20','INSPECTION',NULL,NULL),(14,1,'Thenula Rathnayake','0768202700','hello','2026-09-21 11:18:03','2026-09-23 at 13:20','INSPECTION',NULL,NULL),(15,1,'Thenula Rathnayake','0768202700','hello','2026-09-21 11:18:12','2026-09-23 at 13:20','INSPECTION',NULL,NULL),(16,1,'Thenula Rathnayake','0768202700','hello','2026-09-21 11:18:12','2026-09-23 at 13:20','INSPECTION',NULL,NULL),(17,1,'Thenula Rathnayake','0768202700','hello','2026-09-21 11:18:13','2026-09-23 at 13:20','INSPECTION',NULL,NULL),(18,1,'Thenula Rathnayake','0768202700','hello','2026-09-21 11:18:14','2026-09-23 at 13:20','INSPECTION',NULL,NULL),(19,1,'Thenula Rathnayake','0768202700','hello','2026-09-21 11:18:17','2026-09-23 at 13:20','INSPECTION',NULL,NULL),(20,1,'Thenula Rathnayake','0768202700','ooooo','2026-09-21 11:22:39','2026-09-22 at 10:23','INSPECTION',NULL,NULL),(21,1,'Thenula Rathnayake','0768202700','ooooo','2026-09-21 11:22:52','2026-09-22 at 10:23','INSPECTION',NULL,NULL),(22,1,'Thenula Rathnayake','0768202700','ooooo','2026-09-21 11:22:53','2026-09-22 at 10:23','INSPECTION',NULL,NULL),(23,1,'Thenula Rathnayake','0768202700','ooooo','2026-09-21 11:22:55','2026-09-22 at 10:23','INSPECTION',NULL,NULL),(24,2,'Thenula Rathnayake','0768202700','ooooo','2026-09-21 11:25:27','2026-09-22 at 10:23','INSPECTION',NULL,NULL),(25,NULL,'Dilhara','0716649632','[Email: thenula2002@gmail.com] hello, mt car ekk buy krnn onee','2026-09-24 00:17:42',NULL,'GENERAL_CONTACT',NULL,'PENDING'),(26,NULL,'Dilhara','0716649632','[Email: thenula2002@gmail.com] hello, mt car ekk buy krnn onee','2026-09-24 00:17:46',NULL,'GENERAL_CONTACT',NULL,'PENDING'),(27,NULL,'Dilhara','0716649632','[Email: thenula2002@gmail.com] hello, mt car ekk buy krnn onee','2026-09-24 00:17:49',NULL,'GENERAL_CONTACT',NULL,'PENDING'),(28,NULL,'Dilhara','0716649632','[Email: thenula2002@gmail.com] hello, mt car ekk buy krnn onee','2026-09-24 00:17:50',NULL,'GENERAL_CONTACT',NULL,'PENDING'),(29,NULL,'Dilhara','0716649632','[Email: thenula2002@gmail.com] hello, mt car ekk buy krnn onee','2026-09-24 00:17:50',NULL,'GENERAL_CONTACT',NULL,'PENDING');
/*!40000 ALTER TABLE `inquiries` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `invoices`
--

DROP TABLE IF EXISTS `invoices`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `invoices` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) DEFAULT NULL,
  `customer_address` varchar(255) DEFAULT NULL,
  `customer_name` varchar(255) NOT NULL,
  `discount` double DEFAULT NULL,
  `invoice_number` varchar(255) NOT NULL,
  `item_description` varchar(255) DEFAULT NULL,
  `item_type` varchar(255) DEFAULT NULL,
  `payment_method` varchar(255) DEFAULT NULL,
  `payment_status` varchar(255) DEFAULT NULL,
  `phone_number` varchar(255) NOT NULL,
  `sub_total` double NOT NULL,
  `tax_amount` double DEFAULT NULL,
  `total_amount` double NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_l1x55mfsay7co0r3m9ynvipd5` (`invoice_number`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `invoices`
--

LOCK TABLES `invoices` WRITE;
/*!40000 ALTER TABLE `invoices` DISABLE KEYS */;
INSERT INTO `invoices` VALUES (1,'2026-09-26 16:36:42.056986','Samagi Uyana 2, welikumbura road','Thenula Dilhara Rathnayaka',500,'INV-2026-0001','hukhjmcd','VEHICLE_SALE','CASH','PAID','0768202700',13213242,0,13212742);
/*!40000 ALTER TABLE `invoices` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `job_vacancies`
--

DROP TABLE IF EXISTS `job_vacancies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `job_vacancies` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) DEFAULT NULL,
  `department` varchar(255) NOT NULL,
  `description` varchar(1000) DEFAULT NULL,
  `job_type` varchar(255) DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `requirements` varchar(1000) DEFAULT NULL,
  `salary` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `title` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `job_vacancies`
--

LOCK TABLES `job_vacancies` WRITE;
/*!40000 ALTER TABLE `job_vacancies` DISABLE KEYS */;
/*!40000 ALTER TABLE `job_vacancies` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reviews`
--

DROP TABLE IF EXISTS `reviews`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reviews` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `comment` varchar(1000) NOT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `rating` int NOT NULL,
  `vehicle` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reviews`
--

LOCK TABLES `reviews` WRITE;
/*!40000 ALTER TABLE `reviews` DISABLE KEYS */;
/*!40000 ALTER TABLE `reviews` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `service_bookings`
--

DROP TABLE IF EXISTS `service_bookings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `service_bookings` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) DEFAULT NULL,
  `customer_id` bigint DEFAULT NULL,
  `customer_name` varchar(255) NOT NULL,
  `estimated_cost` double DEFAULT NULL,
  `notes` varchar(1000) DEFAULT NULL,
  `phone_number` varchar(255) NOT NULL,
  `preferred_date` varchar(255) DEFAULT NULL,
  `preferred_time` varchar(255) DEFAULT NULL,
  `service_type` varchar(255) NOT NULL,
  `status` varchar(255) DEFAULT NULL,
  `vehicle_model` varchar(255) NOT NULL,
  `vehicle_number` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `service_bookings`
--

LOCK TABLES `service_bookings` WRITE;
/*!40000 ALTER TABLE `service_bookings` DISABLE KEYS */;
INSERT INTO `service_bookings` VALUES (1,'2026-09-24 05:36:10.002642',NULL,'Thenula Rathnayake',35000,'full service','0768202700','2026-09-24','08:30 AM - 10:30 AM','FULL_SERVICE','COMPLETED','Toyota Vitz 2018','NW CBD-4928'),(2,'2026-09-24 05:45:48.671568',NULL,'kasun',10000,'','0716649632','2026-09-24','10:30 AM - 12:30 PM','GENERAL_REPAIR','WORK_IN_PROGRESS','Prius','CAA-1234');
/*!40000 ALTER TABLE `service_bookings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `spare_parts`
--

DROP TABLE IF EXISTS `spare_parts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `spare_parts` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `category` varchar(255) DEFAULT NULL,
  `compatible_vehicles` varchar(255) DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `description` varchar(1000) DEFAULT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `is_available` bit(1) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `part_number` varchar(255) NOT NULL,
  `price` double NOT NULL,
  `stock_quantity` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `spare_parts`
--

LOCK TABLES `spare_parts` WRITE;
/*!40000 ALTER TABLE `spare_parts` DISABLE KEYS */;
INSERT INTO `spare_parts` VALUES (1,'LUBRICANTS',NULL,'2026-09-24 05:33:08.148623','','',_binary '','Engine Oil','EO589',25000,10);
/*!40000 ALTER TABLE `spare_parts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `staff_members`
--

DROP TABLE IF EXISTS `staff_members`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `staff_members` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `active` bit(1) DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `full_name` varchar(255) NOT NULL,
  `monthly_salary` double DEFAULT NULL,
  `phone_number` varchar(255) NOT NULL,
  `role` varchar(255) NOT NULL,
  `specialization` varchar(255) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_n0rxf263af3eth14fusxobb1p` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `staff_members`
--

LOCK TABLES `staff_members` WRITE;
/*!40000 ALTER TABLE `staff_members` DISABLE KEYS */;
INSERT INTO `staff_members` VALUES (1,_binary '','2026-09-26 17:01:36.665622','admin@thenula.lk','Thenula Rathnayaka',250000,'0768202700','SUPER_ADMIN','Dealership Management','admin123'),(2,_binary '','2026-09-26 17:01:36.804255','service@thenula.lk','Nimal Perera',140000,'0771234567','WORKSHOP_MANAGER','Lead Automobile Engineer','service123'),(3,_binary '','2026-09-26 17:01:36.926376','sales@thenula.lk','Ruwan Silva',110000,'0719876543','SALES_EXECUTIVE','Fleet & Lease Consultant','sales123');
/*!40000 ALTER TABLE `staff_members` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `trade_in_requests`
--

DROP TABLE IF EXISTS `trade_in_requests`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `trade_in_requests` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) DEFAULT NULL,
  `customer_id` bigint DEFAULT NULL,
  `customer_name` varchar(255) NOT NULL,
  `expected_price` double DEFAULT NULL,
  `manufacture_year` int NOT NULL,
  `mileage_km` int DEFAULT NULL,
  `phone_number` varchar(255) NOT NULL,
  `showroom_valuation_offer` double DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `target_exchange_vehicle` varchar(255) DEFAULT NULL,
  `vehicle_brand` varchar(255) NOT NULL,
  `vehicle_condition_notes` varchar(1000) DEFAULT NULL,
  `vehicle_image_url` varchar(255) DEFAULT NULL,
  `vehicle_model` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `trade_in_requests`
--

LOCK TABLES `trade_in_requests` WRITE;
/*!40000 ALTER TABLE `trade_in_requests` DISABLE KEYS */;
/*!40000 ALTER TABLE `trade_in_requests` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vehicle_reservations`
--

DROP TABLE IF EXISTS `vehicle_reservations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vehicle_reservations` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `advance_amount_paid` double DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `customer_email` varchar(255) DEFAULT NULL,
  `customer_name` varchar(255) NOT NULL,
  `customer_phone` varchar(255) NOT NULL,
  `payment_method` varchar(255) DEFAULT NULL,
  `payment_reference` varchar(255) DEFAULT NULL,
  `reservation_code` varchar(255) NOT NULL,
  `status` varchar(255) DEFAULT NULL,
  `vehicle_id` bigint NOT NULL,
  `vehicle_title` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_gpw0dljlvefxhfdl5g97ic79i` (`reservation_code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vehicle_reservations`
--

LOCK TABLES `vehicle_reservations` WRITE;
/*!40000 ALTER TABLE `vehicle_reservations` DISABLE KEYS */;
/*!40000 ALTER TABLE `vehicle_reservations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vehicles`
--

DROP TABLE IF EXISTS `vehicles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vehicles` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `title` varchar(150) NOT NULL,
  `brand` varchar(50) NOT NULL,
  `model` varchar(50) NOT NULL,
  `manufacture_year` int NOT NULL,
  `condition_type` varchar(20) NOT NULL,
  `transmission` varchar(20) NOT NULL,
  `fuel_type` varchar(20) NOT NULL,
  `engine_capacity` int NOT NULL,
  `mileage_km` int DEFAULT '0',
  `price` double NOT NULL,
  `image_url` varchar(500) NOT NULL,
  `status` varchar(20) DEFAULT 'AVAILABLE',
  `is_featured` tinyint(1) DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `vehicle_type` varchar(255) DEFAULT NULL,
  `gallery_urls` varchar(3000) DEFAULT NULL,
  `battery_score` int DEFAULT NULL,
  `body_paint_score` int DEFAULT NULL,
  `engine_score` int DEFAULT NULL,
  `inspector_notes` varchar(255) DEFAULT NULL,
  `purchase_cost` double DEFAULT NULL,
  `repair_cost` double DEFAULT NULL,
  `suspension_score` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vehicles`
--

LOCK TABLES `vehicles` WRITE;
/*!40000 ALTER TABLE `vehicles` DISABLE KEYS */;
INSERT INTO `vehicles` VALUES (1,'Toyota Vitz Safety Edition ii','Toyota','Vitz',2018,'USED','AUTOMATIC','PETROL',1000,35000,7850000,'http://localhost:8080/uploads/2d1b4075-7b48-4ebc-8496-157ebd68c42a.jfif','AVAILABLE',1,'2026-09-14 15:39:52',NULL,'http://localhost:8080/uploads/2d1b4075-7b48-4ebc-8496-157ebd68c42a.jfif',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(2,'Honda Vezel Z Grade','Honda','Vezel',2015,'USED','AUTOMATIC','HYBRID',1500,72000,11500000,'http://localhost:8080/uploads/d3329503-ec8d-4f4b-8dbe-6be9959a51c3.jfif','AVAILABLE',0,'2026-09-14 15:39:52',NULL,'http://localhost:8080/uploads/d3329503-ec8d-4f4b-8dbe-6be9959a51c3.jfif',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(4,'Honda Civic RS Turbo Sedan','Honda','Civic RS',2019,'USED','AUTOMATIC','PETROL',1500,48000,12500000,'http://localhost:8080/uploads/fc70def0-de2c-4398-af43-6a741bb436d2.jpg','AVAILABLE',0,'2026-09-21 16:59:50','CAR','http://localhost:8080/uploads/fc70def0-de2c-4398-af43-6a741bb436d2.jpg',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(5,'Tesla Model 3 Long Range Dual Motor','Tesla','Model 3',2022,'UNREGISTERED','AUTOMATIC','ELECTRIC',0,18000,21500000,'https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=1200&q=80','AVAILABLE',0,'2026-09-21 16:59:50','EV_CAR',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(6,'Nissan Leaf G Grade 40kWh','Nissan','Leaf',2018,'USED','AUTOMATIC','ELECTRIC',1000,52000,6900000,'http://localhost:8080/uploads/cd29fa73-89c2-474e-8270-3e8c18ac9c97.jfif','AVAILABLE',0,'2026-09-21 16:59:50','EV_CAR','http://localhost:8080/uploads/cd29fa73-89c2-474e-8270-3e8c18ac9c97.jfif',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(7,'Bajaj Pulsar 150','Bajaj','Pulsar 150',2017,'USED','MANUAL','PETROL',150,84000,620000,'http://localhost:8080/uploads/81472916-4385-42f7-a25b-c55d2ca23c02.jfif','AVAILABLE',0,'2026-09-21 16:59:50','BIKE','http://localhost:8080/uploads/81472916-4385-42f7-a25b-c55d2ca23c02.jfif',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(8,'Yamaha FZ-S V3 ABS FI','Yamaha','FZ-S V3',2022,'USED','MANUAL','PETROL',149,16000,890000,'http://localhost:8080/uploads/48f294a1-d3c4-4cdc-bd78-68ec3b2eb74e.jfif','AVAILABLE',0,'2026-09-21 16:59:50','BIKE','http://localhost:8080/uploads/48f294a1-d3c4-4cdc-bd78-68ec3b2eb74e.jfif',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(9,'Honda Dio DLX 110 Sports Edition','Honda','Dio',2020,'USED','AUTOMATIC','PETROL',110,28000,535000,'http://localhost:8080/uploads/60dce049-8624-4013-b96a-b46fd998a875.webp','AVAILABLE',0,'2026-09-21 16:59:50','SCOOTER','http://localhost:8080/uploads/60dce049-8624-4013-b96a-b46fd998a875.webp',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(10,'TVS Ntorq 125 Race Edition','TVS','Ntorq',2021,'USED','AUTOMATIC','PETROL',125,19500,645000,'http://localhost:8080/uploads/56349167-da89-4430-ae49-8e3e2dcdeed4.jfif','AVAILABLE',0,'2026-09-21 16:59:50','SCOOTER','http://localhost:8080/uploads/56349167-da89-4430-ae49-8e3e2dcdeed4.jfif',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(11,'Bajaj RE 205 4-Stroke','Bajaj','RE 4S',2017,'USED','MANUAL','PETROL',205,68000,1280000,'http://localhost:8080/uploads/dbdf7626-29aa-46c7-a65a-0736c54d9195.jfif','AVAILABLE',0,'2026-09-21 16:59:50','THREE_WHEEL','http://localhost:8080/uploads/dbdf7626-29aa-46c7-a65a-0736c54d9195.jfif',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(12,'Piaggio Ape City Dlx','Piaggio','Ape City',2019,'USED','MANUAL','PETROL',197,43000,1150000,'http://localhost:8080/uploads/0be005a1-d765-4961-899a-67a3f50ced96.jfif','AVAILABLE',0,'2026-09-21 16:59:50','THREE_WHEEL','http://localhost:8080/uploads/0be005a1-d765-4961-899a-67a3f50ced96.jfif',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(13,'Toyota KDH 201 Super GL Dark Prime','Toyota','HiAce KDH',2012,'USED','AUTOMATIC','DIESEL',3000,115000,14800000,'http://localhost:8080/uploads/aa50bb25-b633-4f37-b526-99546d20cb65.jpg','AVAILABLE',0,'2026-09-21 16:59:50','VAN','http://localhost:8080/uploads/aa50bb25-b633-4f37-b526-99546d20cb65.jpg',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(14,'Nissan Caravan NV350 Premium GX','Nissan','Caravan NV350',2018,'USED','AUTOMATIC','DIESEL',2500,130000,11200000,'http://localhost:8080/uploads/581111c4-d364-40c8-95cb-bcb986cf296f.jfif','AVAILABLE',0,'2026-09-21 16:59:50','VAN','http://localhost:8080/uploads/581111c4-d364-40c8-95cb-bcb986cf296f.jfif',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(15,'Toyota Coaster Deluxe 29 Seater','Toyota','Coaster',2024,'USED','MANUAL','DIESEL',4100,5000,28500000,'http://localhost:8080/uploads/5406ecec-f518-488d-b62f-e87b17668a45.jfif','AVAILABLE',0,'2026-09-21 16:59:50','BUS','http://localhost:8080/uploads/5406ecec-f518-488d-b62f-e87b17668a45.jfif',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(16,'Mitsubishi Fuso Rosa Mini Bus','Mitsubishi','Rosa',2025,'USED','MANUAL','DIESEL',3900,2000,31000000,'http://localhost:8080/uploads/c8e1699d-806c-4227-bc7b-1ba7ab57b1e8.jpg','AVAILABLE',0,'2026-09-21 16:59:50','BUS','http://localhost:8080/uploads/c8e1699d-806c-4227-bc7b-1ba7ab57b1e8.jpg',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(17,'Isuzu Elf Freezer 14.5ft','Isuzu','Elf NPR',2015,'USED','MANUAL','DIESEL',4300,220000,8250000,'http://localhost:8080/uploads/6f511a7b-773d-4568-a523-0115f13f6e6c.jfif','AVAILABLE',0,'2026-09-21 16:59:50','TRUCK','http://localhost:8080/uploads/6f511a7b-773d-4568-a523-0115f13f6e6c.jfif',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(18,'Mitsubishi Canter 10.5ft Lorry','Mitsubishi','Canter',2012,'USED','MANUAL','DIESEL',3000,345000,6800000,'http://localhost:8080/uploads/87cc0ece-b3d3-4839-af40-4d591802ab95.jfif','AVAILABLE',0,'2026-09-21 16:59:50','TRUCK','http://localhost:8080/uploads/87cc0ece-b3d3-4839-af40-4d591802ab95.jfif',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(19,'Renault 440','Renault','440',2014,'USED','AUTOMATIC','DIESEL',12800,240000,23500000,'http://localhost:8080/uploads/b9d1bc9e-1f11-4bd3-aad5-dfcd9dd6d4af.jfif','AVAILABLE',0,'2026-09-21 16:59:50','TRUCK','http://localhost:8080/uploads/b9d1bc9e-1f11-4bd3-aad5-dfcd9dd6d4af.jfif',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(20,'DAF XF 480','DAF','XF 480',2024,'USED','AUTOMATIC','DIESEL',13000,10000,26800000,'http://localhost:8080/uploads/4c087b03-a8f1-48eb-a04c-cbfd40c0edc8.jfif','AVAILABLE',0,'2026-09-21 16:59:50','TRUCK','http://localhost:8080/uploads/4c087b03-a8f1-48eb-a04c-cbfd40c0edc8.jfif',NULL,NULL,NULL,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `vehicles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wishlists`
--

DROP TABLE IF EXISTS `wishlists`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `wishlists` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `added_at` datetime(6) DEFAULT NULL,
  `customer_id` bigint NOT NULL,
  `vehicle_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UKgsga2u6llly2w896lq9lqrvo4` (`customer_id`,`vehicle_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wishlists`
--

LOCK TABLES `wishlists` WRITE;
/*!40000 ALTER TABLE `wishlists` DISABLE KEYS */;
/*!40000 ALTER TABLE `wishlists` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-09-28 21:38:01
