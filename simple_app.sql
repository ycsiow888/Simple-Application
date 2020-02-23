-- phpMyAdmin SQL Dump
-- version 4.7.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 23, 2020 at 01:17 PM
-- Server version: 10.1.26-MariaDB
-- PHP Version: 7.1.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `simple_app`
--

-- --------------------------------------------------------

--
-- Table structure for table `assignments`
--

CREATE TABLE `assignments` (
  `id` int(11) NOT NULL,
  `teacher_id` int(11) NOT NULL,
  `student_id` int(11) NOT NULL,
  `status` varchar(255) DEFAULT 'active',
  `created_by` int(11) DEFAULT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `assignments`
--

INSERT INTO `assignments` (`id`, `teacher_id`, `student_id`, `status`, `created_by`, `updated_by`, `createdAt`, `updatedAt`) VALUES
(1, 1, 1, 'active', NULL, NULL, '2020-02-22 11:58:28', '2020-02-22 11:58:28'),
(2, 1, 2, 'active', NULL, NULL, '2020-02-22 11:58:50', '2020-02-22 11:58:50'),
(3, 2, 1, 'active', NULL, NULL, '2020-02-22 11:59:45', '2020-02-22 11:59:45'),
(4, 2, 3, 'active', NULL, NULL, '2020-02-22 11:59:50', '2020-02-22 11:59:50'),
(5, 1, 4, 'active', NULL, NULL, '2020-02-23 03:40:04', '2020-02-23 03:40:04'),
(6, 3, 4, 'active', NULL, NULL, '2020-02-23 06:21:27', '2020-02-23 06:21:27'),
(7, 4, 5, 'active', NULL, NULL, '2020-02-23 11:55:28', '2020-02-23 11:55:28');

-- --------------------------------------------------------

--
-- Table structure for table `students`
--

CREATE TABLE `students` (
  `id` int(11) NOT NULL,
  `class` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT 'active',
  `created_by` int(11) DEFAULT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `userId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `students`
--

INSERT INTO `students` (`id`, `class`, `status`, `created_by`, `updated_by`, `createdAt`, `updatedAt`, `userId`) VALUES
(1, 'primary', 'active', NULL, NULL, '2020-02-22 11:58:28', '2020-02-22 11:58:28', 2),
(2, 'primary', 'active', NULL, NULL, '2020-02-22 11:58:50', '2020-02-22 11:58:50', 3),
(3, 'primary', 'active', NULL, NULL, '2020-02-22 11:59:50', '2020-02-22 11:59:50', 5),
(4, 'primary', 'active', NULL, NULL, '2020-02-23 03:40:04', '2020-02-23 03:40:04', 6),
(5, 'primary', 'active', NULL, NULL, '2020-02-23 11:55:28', '2020-02-23 11:55:28', 9);

-- --------------------------------------------------------

--
-- Table structure for table `teachers`
--

CREATE TABLE `teachers` (
  `id` int(11) NOT NULL,
  `graduated_at` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT 'active',
  `created_by` int(11) DEFAULT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `userId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `teachers`
--

INSERT INTO `teachers` (`id`, `graduated_at`, `status`, `created_by`, `updated_by`, `createdAt`, `updatedAt`, `userId`) VALUES
(1, 'University', 'active', NULL, NULL, '2020-02-22 11:58:28', '2020-02-22 11:58:28', 1),
(2, 'University', 'active', NULL, NULL, '2020-02-22 11:59:45', '2020-02-22 11:59:45', 4),
(3, 'University', 'active', NULL, NULL, '2020-02-23 06:21:27', '2020-02-23 06:21:27', 7),
(4, 'University', 'active', NULL, NULL, '2020-02-23 11:55:28', '2020-02-23 11:55:28', 8);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `role` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `password`, `role`, `status`, `created_by`, `updated_by`, `createdAt`, `updatedAt`) VALUES
(1, 'teacher01@hotmail.com', NULL, 'teacher', 'active', NULL, NULL, '2020-02-22 11:58:28', '2020-02-22 11:58:28'),
(2, 'student01@hotmail.com', NULL, 'student', 'inactive', NULL, NULL, '2020-02-22 11:58:28', '2020-02-23 12:05:01'),
(3, 'student02@hotmail.com', NULL, 'student', 'active', NULL, NULL, '2020-02-22 11:58:50', '2020-02-23 12:02:28'),
(4, 'teachers01@hotmail.com', NULL, 'teacher', 'active', NULL, NULL, '2020-02-22 11:59:45', '2020-02-22 11:59:45'),
(5, 'students01@hotmail.com', NULL, 'student', 'active', NULL, NULL, '2020-02-22 11:59:50', '2020-02-22 11:59:50'),
(6, 'student03@hotmail.com', NULL, 'student', 'active', NULL, NULL, '2020-02-23 03:40:04', '2020-02-23 03:40:04'),
(7, 'teacher02@hotmail.com', NULL, 'teacher', 'active', NULL, NULL, '2020-02-23 06:21:27', '2020-02-23 06:21:27'),
(8, 'teacher04@hotmail.com', NULL, 'teacher', 'active', NULL, NULL, '2020-02-23 11:55:28', '2020-02-23 11:55:28'),
(9, 'student04@hotmail.com', NULL, 'student', 'active', NULL, NULL, '2020-02-23 11:55:28', '2020-02-23 11:55:28');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `assignments`
--
ALTER TABLE `assignments`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `assignments_teacher_id_student_id_unique` (`teacher_id`,`student_id`),
  ADD KEY `student_id` (`student_id`);

--
-- Indexes for table `students`
--
ALTER TABLE `students`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`);

--
-- Indexes for table `teachers`
--
ALTER TABLE `teachers`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `assignments`
--
ALTER TABLE `assignments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
--
-- AUTO_INCREMENT for table `students`
--
ALTER TABLE `students`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT for table `teachers`
--
ALTER TABLE `teachers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `assignments`
--
ALTER TABLE `assignments`
  ADD CONSTRAINT `assignments_ibfk_25` FOREIGN KEY (`teacher_id`) REFERENCES `teachers` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `assignments_ibfk_26` FOREIGN KEY (`student_id`) REFERENCES `students` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `students`
--
ALTER TABLE `students`
  ADD CONSTRAINT `students_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `teachers`
--
ALTER TABLE `teachers`
  ADD CONSTRAINT `teachers_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
