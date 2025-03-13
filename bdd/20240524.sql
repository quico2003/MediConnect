-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Versión del servidor:         10.4.32-MariaDB - mariadb.org binary distribution
-- SO del servidor:              Win64
-- HeidiSQL Versión:             12.6.0.6765
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Volcando estructura de base de datos para banco_libros
CREATE DATABASE IF NOT EXISTS `banco_libros` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;
USE `banco_libros`;

-- Volcando estructura para tabla banco_libros.book
CREATE TABLE IF NOT EXISTS `book` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `guid` char(36) NOT NULL,
  `name` varchar(255) NOT NULL,
  `isbn` varchar(50) NOT NULL,
  `subject_id` int(11) unsigned NOT NULL,
  `stock` int(10) unsigned NOT NULL DEFAULT 0,
  `created` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updated` timestamp NULL DEFAULT NULL,
  `deleted` timestamp NULL DEFAULT NULL,
  `searchdata` text NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_asignatura_id_libro` (`subject_id`) USING BTREE,
  CONSTRAINT `FK_asignatura_id_libro` FOREIGN KEY (`subject_id`) REFERENCES `subject` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=114 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


-- Volcando estructura para tabla banco_libros.copy
CREATE TABLE IF NOT EXISTS `copy` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `guid` char(36) NOT NULL,
  `uniqid` varchar(50) NOT NULL,
  `state` tinyint(1) NOT NULL DEFAULT 0,
  `book_id` int(11) unsigned NOT NULL,
  `searchdata` text NOT NULL,
  `updated` timestamp NULL DEFAULT NULL,
  `created` timestamp NULL DEFAULT current_timestamp(),
  `deleted` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uniqid` (`uniqid`),
  KEY `FK_libro_id_ejemplar` (`book_id`) USING BTREE,
  CONSTRAINT `FK_libro_id_ejemplar` FOREIGN KEY (`book_id`) REFERENCES `book` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2096 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


-- Volcando estructura para tabla banco_libros.course
CREATE TABLE IF NOT EXISTS `course` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `guid` char(36) NOT NULL,
  `name` varchar(255) NOT NULL,
  `abbr` varchar(10) NOT NULL,
  `season` varchar(50) NOT NULL,
  `searchdata` text NOT NULL,
  `created` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated` timestamp NULL DEFAULT NULL,
  `deleted` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=53 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


-- Volcando estructura para tabla banco_libros.history
CREATE TABLE IF NOT EXISTS `history` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `guid` char(36) NOT NULL DEFAULT '',
  `copy_id` int(11) unsigned NOT NULL,
  `subject_id` int(11) unsigned NOT NULL,
  `student_id` int(11) unsigned NOT NULL,
  `initialstate` tinyint(1) NOT NULL DEFAULT 5,
  `finalstate` tinyint(1) DEFAULT NULL,
  `initialdate` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `finaldate` timestamp NULL DEFAULT NULL,
  `observations` varchar(255) DEFAULT NULL,
  `updated` timestamp NULL DEFAULT NULL,
  `searchdata` text NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_ejemplar_id_historial` (`copy_id`) USING BTREE,
  KEY `FK_student_id_historial` (`student_id`),
  KEY `FK_curso_id_historial` (`subject_id`) USING BTREE,
  CONSTRAINT `FK_ejemplar_id_historial` FOREIGN KEY (`copy_id`) REFERENCES `copy` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_student_id_historial` FOREIGN KEY (`student_id`) REFERENCES `student` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_subject_id_historial` FOREIGN KEY (`subject_id`) REFERENCES `subject` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=94 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


-- Volcando estructura para tabla banco_libros.student
CREATE TABLE IF NOT EXISTS `student` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `guid` char(36) NOT NULL,
  `nia` int(8) unsigned NOT NULL,
  `created` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated` timestamp NULL DEFAULT NULL,
  `deleted` timestamp NULL DEFAULT NULL,
  `createdby` int(11) unsigned NOT NULL,
  `searchdata` text NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  KEY `FK_createdby_alumno` (`createdby`),
  CONSTRAINT `FK_createdby_alumno` FOREIGN KEY (`createdby`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=69 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


-- Volcando estructura para tabla banco_libros.studentprofile
CREATE TABLE IF NOT EXISTS `studentprofile` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `student_id` int(11) unsigned NOT NULL DEFAULT 0,
  `name` varchar(255) NOT NULL,
  `surnames` varchar(255) NOT NULL,
  `phone` varchar(250) NOT NULL,
  `email` varchar(255) NOT NULL,
  `updated` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_alumno_id_alumnoperfil` (`student_id`) USING BTREE,
  CONSTRAINT `FK_alumno_id_alumnoperfil` FOREIGN KEY (`student_id`) REFERENCES `student` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


-- Volcando estructura para tabla banco_libros.subject
CREATE TABLE IF NOT EXISTS `subject` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `guid` char(36) NOT NULL,
  `name` varchar(255) NOT NULL,
  `abbr` varchar(10) NOT NULL,
  `course_id` int(11) unsigned NOT NULL,
  `created` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated` timestamp NULL DEFAULT NULL,
  `deleted` timestamp NULL DEFAULT NULL,
  `searchdata` text NOT NULL DEFAULT '',
  PRIMARY KEY (`id`),
  KEY `FK_curso_id_asignatura` (`course_id`) USING BTREE,
  CONSTRAINT `FK_curso_id_asignatura` FOREIGN KEY (`course_id`) REFERENCES `course` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=133 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla banco_libros.subject: ~4 rows (aproximadamente)
INSERT INTO `subject` (`id`, `guid`, `name`, `abbr`, `course_id`, `created`, `updated`, `deleted`, `searchdata`) VALUES
	(129, '73CF6F8C-561D-4338-9439-4042E23C3667', 'Matematicas', 'MAT', 50, '2024-05-23 15:13:32', '2024-05-24 08:04:24', '2024-05-24 08:04:24', 'Matematicas MAT 1 Educación Secundaria Obligatoria 1 ESO '),
	(130, '6FF64761-A371-4C6F-BB35-58ADD3B30BF2', 'Base de Datos', 'BDD', 50, '2024-05-23 15:54:17', '2024-05-24 08:04:01', '2024-05-24 08:04:01', 'Base de Datos BDD 1 Educación Secundaria Obligatoria 1 ESO '),
	(131, '00592915-B5DF-422D-993E-A592E9EF970D', 'Matemáticas', 'DAS', 51, '2024-05-24 08:14:15', '2024-05-24 08:45:11', NULL, 'Matemáticas DAS 1 Educación Secundaria Obligatoria 1 ESO '),
	(132, '5EA5C91D-46BE-4C2C-BE2B-D139E8454E9C', 'Hugos', 'MSD', 51, '2024-05-24 08:19:11', '2024-05-24 08:19:16', '2024-05-24 08:19:16', 'Hugos MSD 1 Educación Secundaria Obligatoria 1 ESO ');

-- Volcando estructura para tabla banco_libros.user
CREATE TABLE IF NOT EXISTS `user` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `guid` char(36) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `recoverycode` varchar(50) DEFAULT NULL,
  `created` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated` timestamp NULL DEFAULT NULL,
  `deleted` timestamp NULL DEFAULT NULL,
  `token` varchar(500) DEFAULT NULL,
  `expiredate` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;



-- Volcando estructura para tabla banco_libros.userprofile
CREATE TABLE IF NOT EXISTS `userprofile` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) unsigned NOT NULL,
  `name` varchar(255) NOT NULL,
  `surnames` varchar(255) NOT NULL,
  `phone` varchar(250) DEFAULT NULL,
  `updated` timestamp NULL DEFAULT NULL,
  `avatar` varchar(1000) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_usuario_id_usuarioperfil` (`user_id`) USING BTREE,
  CONSTRAINT `FK_usuario_id_usuarioperfil` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
