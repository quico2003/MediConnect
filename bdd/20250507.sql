-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Versión del servidor:         10.4.32-MariaDB - mariadb.org binary distribution
-- SO del servidor:              Win64
-- HeidiSQL Versión:             12.10.0.7000
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Volcando estructura de base de datos para mediconnect_db
CREATE DATABASE IF NOT EXISTS `mediconnect_db` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;
USE `mediconnect_db`;

-- Volcando estructura para tabla mediconnect_db.admin
CREATE TABLE IF NOT EXISTS `admin` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `guid` char(36) NOT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `name` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `token` varchar(500) DEFAULT NULL,
  `expiredate` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla mediconnect_db.admin: ~4 rows (aproximadamente)
INSERT INTO `admin` (`id`, `guid`, `avatar`, `name`, `email`, `password`, `created_at`, `token`, `expiredate`) VALUES
	(7, 'D37E5E3B-6D32-420A-B384-FB5C2C7F6FF0', 'http://testfb.vidavia.net/MediConnect/api/endpoints/my-admin/media/getMedia.php?file=D37E5E3B-6D32-420A-B384-FB5C2C7F6FF0.png', 'Quico', 'francesc@vidavia.com', '$2y$10$tOG8jFqJ30KM1DxRAvH1HubAg6mpMMaNZC1KqoIrQvkhavOYQB9Hu', '2025-03-14 16:54:12', NULL, NULL),
	(8, '80B05279-45A1-43CC-914D-19E5574A9D35', 'http://testfb.vidavia.net/MediConnect/api/endpoints/my-admin/media/getMedia.php?file=80B05279-45A1-43CC-914D-19E5574A9D35.png', 'Jose Sanchis Francis', 'hugosanchis@vidavia.com', '$2y$10$rMEpanDiwlKnLqKQwjbF.uZ6/wl9Lkd8zsI5MhUDftCjfIAMLi60O', '2025-03-21 09:26:21', '4497079ee8c51aed662a267d1f5e803d6070b4270d64ffa513d0a496fe0b461c', '2025-04-09 08:06:15'),
	(9, '0166D193-A08B-4ABA-A495-961650AE14A9', '', 'Hugo Sanchis Belda', 'hugo@vidavia.com', '$2y$10$rzu7wbSx1X18qFv2HywF1.KFt6oW4d1NExlQaR9pIgGMSElWDm6WO', '2025-05-07 13:43:10', '7e40ea58cba114815c73f2a01287ca38e3860515b22f7bdf61ae2975d1d98dd1', '2025-05-08 13:44:26'),
	(10, '2EAB17F6-2862-44FC-B784-B5EDA7FEDF34', '', 'hugo', 'hugosanchis@gmail.com', '$2y$10$TgPJ6sg6y1l86BuECvqBm.hjnSO61m35XcW95DzFx9KqtLXdpJe7a', '2025-05-07 13:50:13', '8aac25085e95599c352f6ba37a6cd9793c1495a704a481cf0202158e4fa854a5', '2025-05-08 13:51:23');

-- Volcando estructura para tabla mediconnect_db.appointments
CREATE TABLE IF NOT EXISTS `appointments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `created_by` int(11) NOT NULL,
  `created_for` int(11) NOT NULL,
  `date` varchar(50) NOT NULL DEFAULT '',
  `reason` varchar(250) NOT NULL,
  `final_description` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_appoinments_user` (`created_by`),
  KEY `FK_appoinments_clients` (`created_for`),
  CONSTRAINT `FK_appoinments_clients` FOREIGN KEY (`created_for`) REFERENCES `clients` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `FK_appoinments_user` FOREIGN KEY (`created_by`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=104 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla mediconnect_db.appointments: ~0 rows (aproximadamente)

-- Volcando estructura para tabla mediconnect_db.category
CREATE TABLE IF NOT EXISTS `category` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `guid` char(36) NOT NULL,
  `name` varchar(50) NOT NULL,
  `description` text NOT NULL,
  `searchdata` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=94 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla mediconnect_db.category: ~1 rows (aproximadamente)
INSERT INTO `category` (`id`, `guid`, `name`, `description`, `searchdata`, `created_at`, `updated_at`, `deleted_at`) VALUES
	(93, '2C80E8C7-7659-45B0-8EAB-9F8BD874B82E', 'Holas', '23', 'Holas ', '2025-05-07 14:09:23', '2025-05-07 14:09:46', '2025-05-07 14:09:46');

-- Volcando estructura para tabla mediconnect_db.clients
CREATE TABLE IF NOT EXISTS `clients` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `guid` char(36) NOT NULL,
  `email` varchar(255) NOT NULL,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `phone` varchar(9) NOT NULL DEFAULT '',
  `anotations` varchar(300) NOT NULL,
  `searchData` text NOT NULL,
  `created_by` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_clients_user` (`created_by`),
  CONSTRAINT `FK_clients_user` FOREIGN KEY (`created_by`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla mediconnect_db.clients: ~0 rows (aproximadamente)

-- Volcando estructura para tabla mediconnect_db.client_products
CREATE TABLE IF NOT EXISTS `client_products` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `client_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `appointment_id` int(11) NOT NULL,
  `searchData` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK__clients` (`client_id`),
  KEY `FK__products` (`product_id`),
  KEY `FK_client_products_appointments` (`appointment_id`),
  CONSTRAINT `FK__clients` FOREIGN KEY (`client_id`) REFERENCES `clients` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `FK__products` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `FK_client_products_appointments` FOREIGN KEY (`appointment_id`) REFERENCES `appointments` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=599 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla mediconnect_db.client_products: ~0 rows (aproximadamente)

-- Volcando estructura para tabla mediconnect_db.products
CREATE TABLE IF NOT EXISTS `products` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `guid` char(36) NOT NULL,
  `name` varchar(50) NOT NULL,
  `price` float NOT NULL,
  `brand` varchar(30) NOT NULL,
  `description` varchar(300) NOT NULL,
  `searchData` text NOT NULL,
  `created_by` int(11) NOT NULL,
  `category_id` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deleted_at` timestamp NULL DEFAULT NULL,
  `images` text DEFAULT NULL,
  `uniqid` text DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_products_admin` (`created_by`),
  KEY `FK_products_category` (`category_id`),
  CONSTRAINT `FK_products_admin` FOREIGN KEY (`created_by`) REFERENCES `admin` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_products_category` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`) ON DELETE SET NULL ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=80 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla mediconnect_db.products: ~0 rows (aproximadamente)

-- Volcando estructura para tabla mediconnect_db.user
CREATE TABLE IF NOT EXISTS `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `guid` char(36) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `searchData` text NOT NULL,
  `created_by` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deleted_at` timestamp NULL DEFAULT NULL,
  `token` varchar(500) DEFAULT NULL,
  `expiredate` timestamp NULL DEFAULT NULL,
  `first_login` tinyint(1) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_user_admin` (`created_by`),
  CONSTRAINT `FK_user_admin` FOREIGN KEY (`created_by`) REFERENCES `admin` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla mediconnect_db.user: ~1 rows (aproximadamente)
INSERT INTO `user` (`id`, `guid`, `email`, `password`, `searchData`, `created_by`, `created_at`, `updated_at`, `deleted_at`, `token`, `expiredate`, `first_login`) VALUES
	(44, 'C49FB632-D45F-40C3-8498-2A34406317A9', 'hugo@gmail.xom', '$2y$10$s/iXi5PihkEK6j8OIDZdl.gHaoDnthsMrkzo15tttLKuagjyPjndy', 'hugo@gmail.xom ', 10, '2025-05-07 15:33:56', '2025-05-07 15:33:56', NULL, NULL, NULL, 1);

-- Volcando estructura para tabla mediconnect_db.userprofile
CREATE TABLE IF NOT EXISTS `userprofile` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `specialty` varchar(50) NOT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK__user` (`user_id`),
  CONSTRAINT `FK__user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=46 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla mediconnect_db.userprofile: ~1 rows (aproximadamente)
INSERT INTO `userprofile` (`id`, `user_id`, `first_name`, `last_name`, `specialty`, `avatar`) VALUES
	(45, 44, 'sakjdJSHKAVGJKHSsakjdJSHKAVGJKHSsakjdJSHKAVGJKHS', 'sakjdJSHKAVGJKHSsakjdJSHKAVGJKHSsakjdJSHKAVGJKHS', 'sakjdJSHKAVGJKHSsakjdJSHKAVGJKHSsakjdJSHKAVGJKHS', 'https://www.gravatar.com/avatar/hugo@gmail.xom?d=identicon');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
