-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 31, 2023 at 11:27 AM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `matematikos_projektas`
--

-- --------------------------------------------------------

--
-- Table structure for table `admins`
--

CREATE TABLE `admins` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `admins`
--

INSERT INTO `admins` (`id`, `username`, `password`) VALUES
(1, 'admin', '$2y$10$bgPH0HlYmTWMKjcS77S7XOgPI4cxSduNtBT73IcS0FjDyKY4pjMUG'),
(2, 'admin1', '$2y$10$4D6fsPq1oXs2EMDOxlbU4u31pm0Fn6hekL7BgyKQp3ezy7W.Igt36'),
(3, 'admin2', '$2y$10$VWHRyZv8tY1u64uXF1my1.6Z2/DkIu5NsGo3.bhAzKI19o4dEh2xq'),
(4, 'admin3', '$2y$10$M7gRPKS5evCvVU0rRERz2ubkHrFcUOjHFCe5M2BY5kYDa9EEKNZKy'),
(5, 'admin4', '$2y$10$efCcY/wTk4WBCR0DU5TIseSK0Q4R.yWPsiohDOFXGK16TFVT96t1G'),
(6, 'admin5', '$2y$10$G5h7oQpfmFurIPzgZFI31eYOueZkhtkzQOhvMWWEBlXcFZ14hY39C'),
(7, 'admin6', '$2y$10$uGFI0nK2XGAEQZuit7EA8uMaBIgJvSr9pzLgIzZcfuY/UEuD5SWTW'),
(8, 'admin7', '$2y$10$SCvEH43gyHiGmpRHyxSLDu20BLW8mqO4cy3nSd3DwInuq4.G5am1O'),
(9, 'admin8', '$2y$10$xxsICJEXXFlE/XOno7JINu8sfgu1jexdfS/sChvlzzZw5eIf.UdVG'),
(10, 'admin9', '$2y$10$VLyI3I6jYl43nqkpNTjyge7N8jRU2uuxNQuh7ojPTMti3I.K2Y0W2'),
(11, 'admin10', '$2y$10$6yOQCNVlhu8UYVlELwvUZ.gfg/aumKkMHd6ygxfccson2TbX/Q8Qi'),
(12, 'admin11', '$2y$10$YGXFWBTX/QFLQ3eUxkI92OTEfYSNbVSj.Bo2Hfddi2zW3oBzxwKKK'),
(13, 'admin12', '$2y$10$BLSwE2GFZjoCwffF3QOtXe7LFHuu4nRomJBcDeKBg1bbHZIHhjv3u'),
(14, 'admin13', '$2y$10$BJJnvDZBlok1WZR5RJXhkOPS/GHFKJFuBBO75BTUEHM4jf3.WYolC'),
(15, 'admin14', '$2y$10$zdNyJm21JJStG.JzWlXaVOTlpUXe9pIoe/NfU/uNnMQk8AqYWBffO'),
(16, 'admin15', '$2y$10$7YBc/JWtML4uUx4ZfuVrQOwwgXxssucw0FvtmUZGtqOGb22meMuoq'),
(17, 'admin16', '$2y$10$Rni7vDvnXz5OU.GAhcZswOmyT4Aibu5ELs/LpHtEUyurieUtC4UvW'),
(18, 'admin17', '$2y$10$hbXhrMhtuV7mIHwQ03DZYuLIQEXGXInD9ALIwZDQ.GAAojM1GZ98y'),
(19, 'admin18', '$2y$10$KQ9V6OeAMOkrNSklCvjl3.uKbAB4iqSPTGPglFLOOJQ7w4jdWVk.y'),
(20, 'admin19', '$2y$10$KPfxaa/timjXT4/lPFyHteYU6c3zuEEmvsVXgGZm2VlUP7NjaIwRO');

-- --------------------------------------------------------

--
-- Table structure for table `students`
--

CREATE TABLE `students` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `addedAt` varchar(100) NOT NULL,
  `attribute` varchar(100) DEFAULT NULL,
  `firstLogin` tinyint(1) NOT NULL,
  `teacherId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `students`
--

INSERT INTO `students` (`id`, `username`, `password`, `addedAt`, `attribute`, `firstLogin`, `teacherId`) VALUES
(7, 'studentas1', '$2y$10$ZRwh2UG9Iopa4KKN7BBlCugQuuWGZg4WGulnqhFZKpkmUb36nU6km', '2023-03-16 12:13:56', '3c', 0, 2),
(8, 'studentas2', '$2y$10$uRZm8SNfaCWP6eu1jXvkFO8NOartYfZnx4JFz6X2Of590B1RVvwce', '2023-03-31 09:04:21', '', 1, 2),
(9, 'studentas6', '$2y$10$RpJpIHgUTYn/7MgO2tfXNefUZNptSbpEzfGeba7kiY5H8z6IyrMZ.', '2023-03-31 09:05:50', '8c', 0, 23),
(12, 'mokinys1', '$2y$10$FrMvULzfr.dVxp90UFEiBOlwoJ9QW.QGwOHVd3GHIQII95B2Ih546', '2023-03-31 12:18:10', '', 0, 25),
(13, 'mokinys2', '$2y$10$LiujQYHpgh34k5ZGFtPfPeX2WMoTRtbng7YZgOMoSymF8kqIm/ZM6', '2023-03-31 12:18:22', '', 1, 25);

-- --------------------------------------------------------

--
-- Table structure for table `studentsresults`
--

CREATE TABLE `studentsresults` (
  `id` int(11) NOT NULL,
  `level` int(11) DEFAULT NULL,
  `points` int(11) DEFAULT NULL,
  `luckIndicator` int(11) DEFAULT NULL,
  `studentId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `studentsresults`
--

INSERT INTO `studentsresults` (`id`, `level`, `points`, `luckIndicator`, `studentId`) VALUES
(5, 2, 0, 0, 7),
(6, 0, 0, 0, 8),
(7, 0, 0, 0, 9),
(10, 0, 0, 0, 12),
(11, 0, 0, 0, 13);

-- --------------------------------------------------------

--
-- Table structure for table `teachers`
--

CREATE TABLE `teachers` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `addedAt` varchar(100) NOT NULL,
  `isApproved` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `teachers`
--

INSERT INTO `teachers` (`id`, `username`, `password`, `addedAt`, `isApproved`) VALUES
(2, 'mokytojas1', '$2y$10$GCUi1BKP.o4Rsc7iYgbMOuXeYM1VwEZ0mn8B.ODIyMURYtl7f751e', '2023-03-16 11:48:33', 1),
(10, 'mokytojas9', '$2y$10$ld5YIcUu1R87fYtXwj.eceVfY7IMGRjNLKFqYkeJ/2GC7E7MHqVze', '2023-03-16 12:29:19', 1),
(11, 'mokytojas10', '$2y$10$rsR4XpV1tmEpiq57bjXZiuodCdent4EYs9mGKLzk.supIn4mADY9C', '2023-03-16 12:29:19', 1),
(12, 'mokytojas11', '$2y$10$VrQuDCYt8BuJgwNKx0Ax..Wda7wxM8fLk8h9qWTcFCd7EQe8bcxmK', '2023-03-16 12:29:19', 1),
(23, 'mokytojas2', '$2y$10$rYVrUtKKGAbrQwLIgYrnt.N1ozaE19FDU6IGa6fXxzNEI4uCinVqO', '2023-03-31 09:04:47', 1),
(25, 'mokytojas3', '$2y$10$4wxE2Z7KsoRq1VbNfErJTuXfFNJY9jJ63cr18l9hiz8O2FgJPzJdW', '2023-03-31 12:17:27', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admins`
--
ALTER TABLE `admins`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `students`
--
ALTER TABLE `students`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_teacherId` (`teacherId`);

--
-- Indexes for table `studentsresults`
--
ALTER TABLE `studentsresults`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_studentId` (`studentId`);

--
-- Indexes for table `teachers`
--
ALTER TABLE `teachers`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admins`
--
ALTER TABLE `admins`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `students`
--
ALTER TABLE `students`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `studentsresults`
--
ALTER TABLE `studentsresults`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `teachers`
--
ALTER TABLE `teachers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `students`
--
ALTER TABLE `students`
  ADD CONSTRAINT `students_ibfk_1` FOREIGN KEY (`teacherId`) REFERENCES `teachers` (`id`);

--
-- Constraints for table `studentsresults`
--
ALTER TABLE `studentsresults`
  ADD CONSTRAINT `fk_studentId` FOREIGN KEY (`studentId`) REFERENCES `students` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
