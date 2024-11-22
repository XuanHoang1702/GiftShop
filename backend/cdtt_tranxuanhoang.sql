-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Nov 05, 2024 at 08:21 AM
-- Server version: 8.0.30
-- PHP Version: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `cdtt_tranxuanhoang`
--

-- --------------------------------------------------------

--
-- Table structure for table `db_banners`
--

CREATE TABLE `db_banners` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `link` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `image` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `sort_order` bigint UNSIGNED NOT NULL DEFAULT '0',
  `position` enum('slideshow','ads') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'slideshow',
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_by` bigint UNSIGNED NOT NULL,
  `updated_by` bigint UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `status` bigint UNSIGNED DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `db_banners`
--

INSERT INTO `db_banners` (`id`, `name`, `link`, `image`, `sort_order`, `position`, `description`, `created_by`, `updated_by`, `created_at`, `updated_at`, `status`) VALUES
(2, 'Chirstmas', 'chirst', 'Screenshot 2024-10-29 153342.png', 0, 'slideshow', 'No des', 1, 1, '2024-10-29 01:34:23', '2024-10-29 01:34:23', 1),
(3, 'Anniversary', 'anni', 'Premium Vector _ Golden anniversay premium emblem set.jpg', 0, 'slideshow', 'No des', 1, 1, '2024-10-29 01:37:56', '2024-10-29 01:37:56', 1),
(4, 'Birthday', 'birthday', 'Premium Vector _ Happy Birthday white background lettering calligraphy vector card text.jpg', 0, 'slideshow', 'No des', 1, 1, '2024-10-29 01:40:47', '2024-10-29 01:40:47', 1),
(5, 'Valentine', 'valen', 'Screenshot 2024-10-29 154133.png', 0, 'slideshow', 'No des', 1, 1, '2024-10-29 01:42:00', '2024-10-29 01:42:00', 1),
(7, 'Easter', 'easter', 'Screenshot 2024-10-29 154544.png', 0, 'slideshow', 'No des', 1, 1, '2024-10-29 01:46:05', '2024-10-29 01:46:05', 1),
(9, 'Thanks Giving', 'thanksgiving', 'Screenshot 2024-10-29 155520.png', 0, 'slideshow', 'No des', 1, 1, '2024-10-29 01:56:15', '2024-10-29 01:56:15', 1),
(14, 'aaaaa', 'aaaaa', 'qww.jpg', 0, 'ads', 'No des', 1, 1, '2024-11-03 07:25:24', '2024-11-04 00:24:36', 2);

-- --------------------------------------------------------

--
-- Table structure for table `db_brands`
--

CREATE TABLE `db_brands` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `thumbnail` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `sort_order` int DEFAULT '0',
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT 'No des',
  `created_by` bigint UNSIGNED NOT NULL,
  `updated_by` bigint UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `status` bigint UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `db_brands`
--

INSERT INTO `db_brands` (`id`, `name`, `slug`, `thumbnail`, `sort_order`, `description`, `created_by`, `updated_by`, `created_at`, `updated_at`, `status`) VALUES
(1, 'UNQUE', '1', 'uniqlo.jpg', 0, 'No des', 1, 1, '2024-10-11 20:31:41', '2024-10-11 20:31:41', 1),
(4, 'Chanel', 'chanel', 'chanel.jpg', 0, 'No des', 1, 1, '2024-10-28 10:08:27', '2024-10-28 10:08:27', 1),
(5, 'Pandora', 'pandora', 'Se você fosse uma Kardashian #Wattys2021.jpg', 0, 'No des', 1, 1, '2024-10-29 02:05:16', '2024-10-29 02:05:16', 1),
(6, 'Tiffany & Co', 'Tiffany&Co', 'Tiffany & Co_ Charm Bracelet - Summer.jpg', 0, 'No des', 1, 1, '2024-10-29 02:06:16', '2024-10-29 02:06:16', 1),
(7, 'Godiva', 'godiva', 'Godiva Chocolate - Social Media Design Campaign.jpg', 0, 'No des', 1, 1, '2024-10-29 02:07:06', '2024-10-29 02:07:06', 1),
(9, 'Test Update', 'ten-hihii', 'Feliz año nuevo banner de letras _ Vector Premium.jpg', 1, 'No des', 1, 1, '2024-11-03 05:57:48', '2024-11-03 06:56:25', 1),
(10, 'Add Brand', 'brand', 'qqaaa.jpg', 1, NULL, 1, 1, '2024-11-04 00:32:27', '2024-11-04 00:38:16', 1);

-- --------------------------------------------------------

--
-- Table structure for table `db_carts`
--

CREATE TABLE `db_carts` (
  `id` bigint UNSIGNED NOT NULL,
  `user_id` bigint UNSIGNED NOT NULL,
  `product_id` bigint UNSIGNED NOT NULL,
  `quantity` bigint UNSIGNED NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `db_categories`
--

CREATE TABLE `db_categories` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `thumbnail` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `parent_id` bigint UNSIGNED NOT NULL DEFAULT '0',
  `sort_order` bigint UNSIGNED DEFAULT '0',
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT 'No des',
  `created_by` bigint UNSIGNED DEFAULT '0',
  `updated_by` bigint UNSIGNED DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `status` bigint UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `db_categories`
--

INSERT INTO `db_categories` (`id`, `name`, `slug`, `thumbnail`, `parent_id`, `sort_order`, `description`, `created_by`, `updated_by`, `created_at`, `updated_at`, `status`) VALUES
(1, 'Birthday', 'birthday', 'aaaaa.jpg', 0, 0, 'No des', 1, 1, '2024-10-11 21:14:42', '2024-10-11 21:14:42', 1),
(3, 'Christmas', 'christmas', 'Dreamy Christmas Scenes to Get You in the Christmas Spirit!.jpg', 0, 0, 'No des', 1, 1, '2024-10-13 18:10:30', '2024-10-13 18:10:30', 1),
(4, 'Anniversary', 'anniversary', 'Cute Dinner Ideas Surprise Gift Ideas Romantic Rose Petals.jpg', 0, 0, 'No des', 1, 1, '2024-10-13 18:26:24', '2024-10-13 18:26:24', 1),
(5, 'Valentine day\'s', 'valentine', 'Modèles de carte de voeux Saint Valentin_ _ Vecteur Premium.jpg', 0, 0, 'No des', 1, 1, '2024-10-29 01:54:30', '2024-10-29 01:54:30', 1),
(6, 'Thanks giving', 'thanksgiving', 'Easy Thanksgiving Decoration Ideas.jpg', 0, 0, 'No des', 1, 1, '2024-10-29 01:57:37', '2024-10-29 01:57:37', 1),
(7, 'Easter', 'easter', 'Premium Vector _ Happy easter day egg background in paper style.jpg', 0, 0, 'No des', 1, 1, '2024-10-29 01:58:40', '2024-10-29 01:58:40', 1),
(8, 'New year', 'new year', 'Feliz año nuevo banner de letras _ Vector Premium.jpg', 0, 0, 'No des', 1, 1, '2024-10-29 01:59:49', '2024-11-04 01:16:54', 1),
(14, 'Joe', 'ten-hihii', '50+ Super Easy DIY Easter Centerpiece Ideas.jpg', 1, 0, 'No des', 0, 0, '2024-11-04 01:19:42', '2024-11-04 01:32:10', 2);

-- --------------------------------------------------------

--
-- Table structure for table `db_config`
--

CREATE TABLE `db_config` (
  `id` bigint UNSIGNED NOT NULL,
  `site_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `address` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `hotline` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `author` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` int UNSIGNED DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `db_config`
--

INSERT INTO `db_config` (`id`, `site_name`, `email`, `address`, `hotline`, `phone`, `author`, `status`, `created_at`, `updated_at`) VALUES
(1, 'Admin', 'hoang@gmail.com', '9 District', '1234567890', '2122110124', 'admin', 1, '2024-10-28 10:12:18', '2024-11-04 01:32:54');

-- --------------------------------------------------------

--
-- Table structure for table `db_contact`
--

CREATE TABLE `db_contact` (
  `id` bigint UNSIGNED NOT NULL,
  `user_id` bigint UNSIGNED NOT NULL,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `content` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `reply_id` bigint UNSIGNED NOT NULL DEFAULT '0',
  `created_by` bigint UNSIGNED DEFAULT '1',
  `updated_by` bigint UNSIGNED DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `status` bigint UNSIGNED DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `db_contact`
--

INSERT INTO `db_contact` (`id`, `user_id`, `title`, `content`, `reply_id`, `created_by`, `updated_by`, `created_at`, `updated_at`, `status`) VALUES
(1, 2, 'Delay day', 'Delay day order 30', 1, 2, 2, '2024-10-30 06:53:13', '2024-10-30 06:53:13', 1),
(3, 4, 'Success', 'Success', 2, 4, 4, '2024-10-30 07:05:03', '2024-11-04 02:29:30', 1),
(28, 4, 'BBBBB', 'BBBB', 3, 1, 1, '2024-11-04 02:35:28', '2024-11-04 02:40:23', 1);

-- --------------------------------------------------------

--
-- Table structure for table `db_menu`
--

CREATE TABLE `db_menu` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `link` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `table_id` bigint UNSIGNED NOT NULL,
  `type` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `position` enum('footermenu','headermenu') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'footermenu',
  `parent_id` bigint UNSIGNED DEFAULT '0',
  `sort_order` bigint UNSIGNED NOT NULL DEFAULT '0',
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT 'No des',
  `created_by` int DEFAULT '0',
  `updated_by` int DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `status` bigint UNSIGNED NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `db_menu`
--

INSERT INTO `db_menu` (`id`, `name`, `link`, `table_id`, `type`, `position`, `parent_id`, `sort_order`, `description`, `created_by`, `updated_by`, `created_at`, `updated_at`, `status`) VALUES
(1, 'HOME', '/', 1, 'carousel', 'headermenu', 1, 1, 'No des', 0, 0, '2024-10-28 10:34:45', '2024-10-28 10:34:45', 1),
(2, 'SHOP', '/shop', 1, 'carousel', 'headermenu', 1, 1, 'No des', 0, 0, '2024-10-29 02:28:20', '2024-10-29 02:28:20', 1),
(3, 'WHY US', '/why_us', 1, 'carousel', 'headermenu', 1, 1, 'No des', 0, 0, '2024-10-29 02:28:38', '2024-10-29 02:28:38', 1),
(4, 'TESTIMIONAL', '/testimional', 1, 'carousel', 'headermenu', 1, 1, 'No des', 0, 0, '2024-10-29 02:29:09', '2024-10-29 02:29:09', 1),
(5, 'CONTACT US', '/contact_us', 1, 'carousel', 'headermenu', 1, 1, 'No des', 0, 0, '2024-10-29 02:29:28', '2024-10-29 02:29:28', 1),
(17, 'ADD', '/menu', 1, 'text', 'footermenu', 1, 1, 'No des', 0, 1, '2024-11-04 01:47:56', '2024-11-04 02:01:06', 2);

-- --------------------------------------------------------

--
-- Table structure for table `db_orders`
--

CREATE TABLE `db_orders` (
  `id` bigint UNSIGNED NOT NULL,
  `user_id` bigint UNSIGNED NOT NULL,
  `total_quantity` bigint UNSIGNED NOT NULL,
  `total_price` decimal(10,2) NOT NULL,
  `status` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'Pending',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `db_orders`
--

INSERT INTO `db_orders` (`id`, `user_id`, `total_quantity`, `total_price`, `status`, `created_at`, `updated_at`) VALUES
(43, 2, 1, '65.00', 'Pending', '2024-10-22 08:50:34', '2024-10-22 08:50:34'),
(44, 2, 1, '80.00', 'Delivered', '2024-10-26 08:05:05', '2024-10-26 08:05:05'),
(45, 2, 2, '180.00', 'pending', '2024-10-28 15:45:55', '2024-10-28 15:45:55'),
(46, 2, 1, '150.00', 'pending', '2024-10-29 10:35:20', '2024-10-29 10:35:20'),
(47, 2, 1, '150.00', 'pending', '2024-10-29 10:35:51', '2024-10-29 10:35:51'),
(48, 2, 1, '150.00', 'pending', '2024-10-29 10:36:34', '2024-10-29 10:36:34'),
(49, 2, 1, '150.00', 'pending', '2024-10-29 10:39:10', '2024-10-29 10:39:10'),
(50, 2, 1, '177.00', 'pending', '2024-10-31 07:35:14', '2024-10-31 07:35:14'),
(51, 5, 1, '450.00', 'pending', '2024-11-02 10:39:47', '2024-11-02 10:39:47');

-- --------------------------------------------------------

--
-- Table structure for table `db_order_details`
--

CREATE TABLE `db_order_details` (
  `id` bigint UNSIGNED NOT NULL,
  `order_id` bigint UNSIGNED NOT NULL,
  `product_id` bigint UNSIGNED NOT NULL,
  `quantity` int NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `db_order_details`
--

INSERT INTO `db_order_details` (`id`, `order_id`, `product_id`, `quantity`, `price`, `created_at`, `updated_at`) VALUES
(20, 44, 3, 1, '80.00', '2024-10-26 08:05:06', '2024-10-26 08:05:06'),
(21, 45, 3, 1, '80.00', '2024-10-28 15:45:55', '2024-10-28 15:45:55'),
(22, 45, 10, 1, '100.00', '2024-10-28 15:45:55', '2024-10-28 15:45:55'),
(23, 49, 8, 1, '150.00', '2024-10-29 10:39:11', '2024-10-29 10:39:11'),
(24, 50, 21, 1, '177.00', '2024-10-31 07:35:15', '2024-10-31 07:35:15'),
(25, 51, 13, 1, '450.00', '2024-11-02 10:39:48', '2024-11-02 10:39:48');

-- --------------------------------------------------------

--
-- Table structure for table `db_post`
--

CREATE TABLE `db_post` (
  `id` bigint UNSIGNED NOT NULL,
  `topic_id` bigint UNSIGNED NOT NULL,
  `slug` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `content` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `thumbnail` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT 'No thumbnail',
  `type` enum('post','page') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'post',
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT 'No des',
  `created_by` bigint UNSIGNED NOT NULL DEFAULT '0',
  `updated_by` bigint UNSIGNED NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `status` bigint UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `db_post`
--

INSERT INTO `db_post` (`id`, `topic_id`, `slug`, `content`, `thumbnail`, `type`, `description`, `created_by`, `updated_by`, `created_at`, `updated_at`, `status`) VALUES
(1, 1, 'sale', 'how to', 'no thumbnail', 'post', 'No des', 0, 0, '2024-10-28 10:47:46', '2024-10-28 10:47:46', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `db_products`
--

CREATE TABLE `db_products` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `category_id` bigint UNSIGNED NOT NULL,
  `brand_id` bigint UNSIGNED NOT NULL,
  `content` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `pricebuy` double(8,2) UNSIGNED NOT NULL,
  `status` bigint UNSIGNED DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `db_products`
--

INSERT INTO `db_products` (`id`, `name`, `slug`, `category_id`, `brand_id`, `content`, `description`, `pricebuy`, `status`, `created_at`, `updated_at`) VALUES
(3, 'Cake', 'cake', 1, 1, 'This sproduct so ...', 'Best....', 80.00, 1, '2024-10-12 01:33:41', '2024-10-12 01:33:41'),
(4, 'Glass bottle', 'glass_bottle', 1, 1, 'This bottle so ...', 'Best....', 90.00, 1, '2024-10-12 07:21:37', '2024-10-12 07:21:37'),
(7, 'Combo box', 'combo_box', 3, 1, 'Seen box for ...', 'Best....', 190.00, 1, '2024-10-13 18:13:10', '2024-10-13 18:13:10'),
(8, 'Hiden gift', 'hiden_gift', 3, 1, 'Seen gift for ...', 'Best....', 150.00, 1, '2024-10-13 18:15:24', '2024-10-13 18:15:24'),
(9, 'Jeiger combo', 'jeiger', 3, 1, 'Seen gift for ...', 'Best....', 230.00, 1, '2024-10-13 18:16:51', '2024-10-13 18:16:51'),
(10, 'Cup and honey', 'cup_honey', 3, 1, 'Seen gift for ...', 'Best....', 100.00, 1, '2024-10-13 18:25:06', '2024-10-13 18:25:06'),
(11, 'Moonstone Ring', 'ring', 4, 1, 'Seen gift for ...', 'Best....', 179.00, 1, '2024-10-13 18:29:33', '2024-10-13 18:29:33'),
(13, 'Damenring', 'damenring', 5, 5, 'Seen gift for ...', 'Best....', 450.00, 1, '2024-10-29 04:27:49', '2024-10-29 04:27:49'),
(14, 'Bracelet', 'bracelet', 5, 5, 'Seen gift for ...', 'Best....', 450.00, 1, '2024-10-29 04:29:20', '2024-10-29 04:29:20'),
(15, 'Rhinestone & Flower', 'r_f', 5, 5, 'Seen gift for ...', 'Best....', 450.00, 1, '2024-10-29 04:30:40', '2024-10-29 04:30:40'),
(16, 'Maravilhosa Adorei', 'Maravilhosa Adorei', 5, 5, 'Seen gift for ...', 'Best....', 486.00, 1, '2024-10-29 04:32:42', '2024-10-29 04:32:42'),
(17, 'Heart Tag Sterling', 'Heart Tag Sterling', 7, 7, 'Seen gift for ...', 'Best....', 500.00, 1, '2024-10-29 04:36:41', '2024-10-29 04:36:41'),
(18, 'Easter egg', 'Easter egg', 7, 7, 'Seen gift for ...', 'Best....', 320.00, 1, '2024-10-29 04:38:14', '2024-10-29 04:38:14'),
(19, 'Easter egg chocolate', 'Easter egg chocolate', 7, 7, 'Seen gift for ...', 'Best....', 189.00, 1, '2024-10-29 04:39:14', '2024-10-29 04:39:14'),
(20, 'Easter cup', 'Easter cup', 7, 7, 'Seen gift for ...', 'Best....', 201.00, 1, '2024-10-29 04:40:33', '2024-10-29 04:40:33'),
(21, 'Moon crystal ball', 'Moon crystal ball', 8, 6, 'Seen gift for ...', 'Best....', 177.00, 1, '2024-10-29 04:43:00', '2024-10-29 04:43:00'),
(22, 'Galaxy crystal ball', 'Galaxy crystal ball', 8, 6, 'Seen gift for ...', 'Best....', 241.00, 1, '2024-10-29 04:44:20', '2024-10-29 04:44:20'),
(23, 'Honey tea', 'Honey tea', 8, 6, 'Seen gift for ...', 'Best....', 230.00, 1, '2024-10-29 04:45:52', '2024-10-29 04:45:52'),
(24, 'Herb Box', 'Herb Box', 8, 6, 'Seen gift for ...', 'Best....', 150.00, 1, '2024-10-29 04:47:21', '2024-10-29 04:47:21'),
(25, 'Thanksgiving basket', 'Thanksgiving basket', 6, 6, 'Seen gift for ...', 'Best....', 357.00, 1, '2024-10-29 04:49:54', '2024-10-29 04:49:54'),
(26, 'Dried Seeds', 'Dried Seeds', 6, 6, 'Seen gift for ...', 'Best....', 400.00, 1, '2024-10-29 04:50:59', '2024-10-29 04:50:59'),
(27, 'Perfume N5', 'perfumeN5', 4, 4, 'Seen gift for ...', 'Best....', 654.00, 1, '2024-10-29 05:12:37', '2024-10-29 05:12:37'),
(28, 'Chanel Vanity', 'Chanel Vanity', 4, 4, 'Seen gift for ...', 'Best....', 800.00, 1, '2024-10-29 05:13:55', '2024-10-29 05:13:55'),
(30, 'Esta Navidad tonos', 'Esta Navidad', 4, 4, 'Seen gift for ...', 'Best....', 748.00, 1, '2024-10-29 05:17:09', '2024-10-29 05:17:09'),
(31, 'Angroos Boutique', 'Angroos Gifts Boutique', 1, 4, 'Seen gift for ...', 'Best....', 123.00, 1, '2024-10-29 05:19:00', '2024-10-29 05:19:00'),
(32, 'Teddy Bear', 'Teddy Bear', 1, 4, 'Seen gift for ...', 'Best....', 100.00, 1, '2024-10-29 05:20:09', '2024-10-29 05:20:09'),
(37, 'aaaa', 'aaaaa', 1, 4, 'Seen gift for ...', 'Best....', 100.00, 1, '2024-11-04 23:28:02', '2024-11-04 23:28:02');

-- --------------------------------------------------------

--
-- Table structure for table `db_product_image`
--

CREATE TABLE `db_product_image` (
  `id` bigint UNSIGNED NOT NULL,
  `product_id` bigint UNSIGNED NOT NULL,
  `thumbnail` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `db_product_image`
--

INSERT INTO `db_product_image` (`id`, `product_id`, `thumbnail`) VALUES
(1, 3, '34+ Birthday Cakes That Will Bake Your Day Unbelievably Special - TheFab20s.jpg'),
(2, 4, 'Personalized Film Strip Decorative Bottle Lamp for  Birthday, Anniversary, Couple _ Gift for Her.jpg'),
(5, 7, '75+ Gorgeous DIY Christmas Gift Basket Ideas for Women.jpg'),
(6, 8, 'pppp.png'),
(7, 9, 'A Comprehensive List Of Beautiful Christmas Gift Baskets For Everyone On Your List.jpg'),
(8, 10, '572fd0b7-e12d-4e8b-957b-88efa8676f0f.jpg'),
(9, 11, 'Moonstone Cats Eye Gold Plated Ring.jpg'),
(11, 13, 'Pandora Damenring Timeless.jpg'),
(12, 14, 'pandora bracelet 🤍.jpg'),
(13, 15, 'Rhinestone Heart & Flower Charm Bracelet.jpg'),
(14, 16, 'pppp.jpg'),
(15, 17, 'Elsa Peretti For Tiffany & Co_ - Tiffany Co Return To Heart Tag Sterling 925 Chain Bracelet American.jpg'),
(16, 18, 'qww.jpg'),
(17, 19, 'DIY_ Studded Eggs.jpg'),
(18, 20, 'qqaaa.jpg'),
(19, 21, 'Moon Crystal Ball Night Lamp - Solar System.jpg'),
(20, 22, 'glx.jpg'),
(21, 23, 'Quà tặng tết 2022, quà tết dương lịch, quà tặng mật ong trà thảo mộc.jpg'),
(22, 24, 'Подарок на день рождения.jpg'),
(23, 25, 'Thanksgiving Hostess Basket.jpg'),
(24, 26, 'fffs.jpg'),
(25, 27, 'cn.jpg'),
(26, 28, 'Chanel Vanity Case Review.jpg'),
(28, 30, '10 tonos de esmalte súper originales para estas fiestas.jpg'),
(29, 31, 'Ultimate Birthday Surprise for Your Best Friend Boy with Jaguar Perfume, Snickers, Tommy Hilfiger Wallet, and More.jpg'),
(30, 32, '25cm ‘I Love You’ Teddy Bear.jpg'),
(44, 3, 'Chanel Vanity Case Review.jpg'),
(46, 37, 'Uniqlo.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `db_product_sale`
--

CREATE TABLE `db_product_sale` (
  `id` bigint UNSIGNED NOT NULL,
  `product_id` bigint UNSIGNED NOT NULL,
  `pricesale` double(8,2) UNSIGNED NOT NULL,
  `datebegin` date NOT NULL,
  `dateend` date NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `status` bigint UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `db_product_sale`
--

INSERT INTO `db_product_sale` (`id`, `product_id`, `pricesale`, `datebegin`, `dateend`, `created_at`, `updated_at`, `status`) VALUES
(3, 32, 95.00, '2024-10-29', '2024-11-10', '2024-10-29 05:38:12', '2024-10-29 05:38:12', 1),
(4, 11, 160.00, '2024-10-29', '2024-11-05', '2024-10-29 05:39:02', '2024-10-29 05:39:02', 1),
(5, 16, 470.00, '2024-10-29', '2024-11-03', '2024-10-29 05:39:31', '2024-10-29 05:39:31', 1),
(6, 19, 175.00, '2024-10-29', '2024-11-27', '2024-10-29 05:40:02', '2024-11-04 23:05:07', 2);

-- --------------------------------------------------------

--
-- Table structure for table `db_product_store`
--

CREATE TABLE `db_product_store` (
  `id` bigint UNSIGNED NOT NULL,
  `product_id` bigint UNSIGNED NOT NULL,
  `priceroot` double(8,2) UNSIGNED NOT NULL,
  `qty` bigint UNSIGNED NOT NULL,
  `dateimport` date NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `status` bigint UNSIGNED DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `db_product_store`
--

INSERT INTO `db_product_store` (`id`, `product_id`, `priceroot`, `qty`, `dateimport`, `created_at`, `updated_at`, `status`) VALUES
(2, 3, 80.00, 100, '2024-10-12', NULL, NULL, 1),
(3, 4, 90.00, 100, '2024-10-12', NULL, NULL, 1),
(6, 7, 170.00, 100, '2024-10-14', NULL, NULL, 1),
(7, 8, 140.00, 100, '2024-10-14', NULL, NULL, 1),
(8, 9, 200.00, 100, '2024-10-14', NULL, NULL, 1),
(9, 10, 87.00, 100, '2024-10-14', NULL, NULL, 1),
(10, 11, 167.00, 100, '2024-10-14', NULL, NULL, 1),
(12, 13, 400.00, 100, '2024-10-29', NULL, NULL, 1),
(13, 14, 400.00, 100, '2024-10-29', NULL, NULL, 1),
(14, 15, 400.00, 100, '2024-10-29', NULL, NULL, 1),
(15, 16, 440.00, 100, '2024-10-29', NULL, NULL, 1),
(16, 17, 470.00, 100, '2024-10-29', NULL, NULL, 1),
(17, 18, 300.00, 100, '2024-10-29', NULL, NULL, 1),
(18, 19, 167.00, 100, '2024-10-29', NULL, NULL, 1),
(19, 20, 179.00, 100, '2024-10-29', NULL, NULL, 1),
(20, 21, 147.00, 100, '2024-10-29', NULL, NULL, 1),
(21, 22, 201.00, 100, '2024-10-29', NULL, NULL, 1),
(22, 23, 201.00, 100, '2024-10-29', NULL, NULL, 1),
(23, 24, 130.00, 100, '2024-10-29', NULL, NULL, 1),
(24, 25, 321.00, 100, '2024-10-29', NULL, NULL, 1),
(25, 26, 350.00, 100, '2024-10-29', NULL, NULL, 1),
(26, 27, 600.00, 100, '2024-10-29', NULL, NULL, 1),
(27, 28, 780.00, 100, '2024-10-29', NULL, NULL, 1),
(29, 30, 721.00, 100, '2024-10-29', NULL, NULL, 1),
(30, 31, 100.00, 100, '2024-10-29', NULL, NULL, 1),
(31, 32, 95.00, 100, '2024-10-29', NULL, NULL, 1),
(35, 37, 95.00, 100, '2024-10-29', NULL, NULL, 1),
(36, 37, 123.00, 100, '2024-11-05', NULL, NULL, 1),
(37, 37, 100.00, 100, '2024-11-05', NULL, NULL, 1);

-- --------------------------------------------------------

--
-- Table structure for table `db_topic`
--

CREATE TABLE `db_topic` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `sort_order` int DEFAULT NULL,
  `created_by` bigint UNSIGNED NOT NULL DEFAULT '0',
  `updated_by` bigint UNSIGNED NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `status` bigint UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `db_topic`
--

INSERT INTO `db_topic` (`id`, `name`, `slug`, `sort_order`, `created_by`, `updated_by`, `created_at`, `updated_at`, `status`) VALUES
(1, 'Topic', 'Slug topic', 0, 0, 0, '2024-10-28 10:43:55', '2024-10-28 10:43:55', 1);

-- --------------------------------------------------------

--
-- Table structure for table `db_users`
--

CREATE TABLE `db_users` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'a@b#123^',
  `phone` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `image` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT 'No image',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `address` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `gender` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `status` int DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `db_users`
--

INSERT INTO `db_users` (`id`, `name`, `email`, `password`, `phone`, `image`, `created_at`, `updated_at`, `address`, `gender`, `status`) VALUES
(2, 'YounJung', 'Younjung@gmail.com', '$2y$12$rUDMYy.3Bxi8klWCJxISNutsA99BhDklHhTno6BIiMTcn8z4v9lES', '1122334455', 'download.jpg', '2024-10-11 03:09:25', '2024-10-11 03:09:25', 'Korea', 'Female', 1),
(4, 'User', 'user@gmail.com', '$2y$12$EvgYhTAP3JqTyxKxMlR6zuEMNFykm5gtc2.Gu0r9APlybXjKNeBT2', '980980314', 'No image', '2024-10-30 06:45:29', '2024-11-05 01:12:11', 'VietNam', 'Male', 1),
(5, 'BBBBBBBB', 'hoang@gmail.com', '$2y$12$Cxym/2HZ6B52tkrXbMvaZOTEImnNsuieMJu6bMu7vjGiT/KlbPsvq', '1111111111', 'No image', '2024-11-02 03:36:24', '2024-11-04 10:08:23', 'VietNam', 'Male', 1);

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint UNSIGNED NOT NULL,
  `uuid` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int UNSIGNED NOT NULL,
  `migration` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2014_10_12_000000_create_users_table', 1),
(6, '2014_10_12_100000_create_password_reset_tokens_table', 2),
(7, '2019_08_19_000000_create_failed_jobs_table', 2),
(8, '2019_12_14_000001_create_personal_access_tokens_table', 2),
(9, '2024_10_11_094840_create_user_table', 2),
(10, '2024_10_12_031829_create_banners_table', 3),
(11, '2024_10_12_032809_create_brands_table', 4),
(18, '2024_10_12_033219_create_categories_table', 5),
(19, '2024_10_12_075211_create_config_table', 6),
(20, '2024_10_12_080033_create_menu_table', 7),
(21, '2024_10_12_080348_create_topic_table', 8),
(22, '2024_10_12_080614_create_contact_table', 9),
(23, '2024_10_12_080925_create_post_table', 10),
(24, '2024_10_12_081219_create_products_table', 11),
(28, '2024_10_12_081434_create_product_store_table', 12),
(29, '2024_10_12_081548_create_product_image_table', 12),
(30, '2024_10_12_081626_create_product_sale_table', 12),
(31, '2024_10_12_085257_create_orders_table', 13),
(32, '2024_10_12_085404_create_order_details_table', 14),
(33, '2024_10_12_090338_create_carts_table', 15),
(34, '2024_10_22_084749_add_timestamp_to_order_detail_table', 16);

-- --------------------------------------------------------

--
-- Table structure for table `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `db_banners`
--
ALTER TABLE `db_banners`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `db_brands`
--
ALTER TABLE `db_brands`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `db_carts`
--
ALTER TABLE `db_carts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `carts_user_id_foreign` (`user_id`),
  ADD KEY `carts_product_id_foreign` (`product_id`);

--
-- Indexes for table `db_categories`
--
ALTER TABLE `db_categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `db_config`
--
ALTER TABLE `db_config`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `config_email_unique` (`email`);

--
-- Indexes for table `db_contact`
--
ALTER TABLE `db_contact`
  ADD PRIMARY KEY (`id`),
  ADD KEY `contact_user_id_foreign` (`user_id`);

--
-- Indexes for table `db_menu`
--
ALTER TABLE `db_menu`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `db_orders`
--
ALTER TABLE `db_orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `orders_user_id_foreign` (`user_id`);

--
-- Indexes for table `db_order_details`
--
ALTER TABLE `db_order_details`
  ADD PRIMARY KEY (`id`),
  ADD KEY `order_details_order_id_foreign` (`order_id`),
  ADD KEY `order_details_product_id_foreign` (`product_id`);

--
-- Indexes for table `db_post`
--
ALTER TABLE `db_post`
  ADD PRIMARY KEY (`id`),
  ADD KEY `post_topic_id_foreign` (`topic_id`);

--
-- Indexes for table `db_products`
--
ALTER TABLE `db_products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `products_category_id_foreign` (`category_id`),
  ADD KEY `products_brand_id_foreign` (`brand_id`);

--
-- Indexes for table `db_product_image`
--
ALTER TABLE `db_product_image`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_image_product_id_foreign` (`product_id`);

--
-- Indexes for table `db_product_sale`
--
ALTER TABLE `db_product_sale`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_sale_product_id_foreign` (`product_id`);

--
-- Indexes for table `db_product_store`
--
ALTER TABLE `db_product_store`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_store_product_id_foreign` (`product_id`);

--
-- Indexes for table `db_topic`
--
ALTER TABLE `db_topic`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `db_users`
--
ALTER TABLE `db_users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `user_email_unique` (`email`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Indexes for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `db_banners`
--
ALTER TABLE `db_banners`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `db_brands`
--
ALTER TABLE `db_brands`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `db_carts`
--
ALTER TABLE `db_carts`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT for table `db_categories`
--
ALTER TABLE `db_categories`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `db_config`
--
ALTER TABLE `db_config`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `db_contact`
--
ALTER TABLE `db_contact`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT for table `db_menu`
--
ALTER TABLE `db_menu`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `db_orders`
--
ALTER TABLE `db_orders`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=52;

--
-- AUTO_INCREMENT for table `db_order_details`
--
ALTER TABLE `db_order_details`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `db_post`
--
ALTER TABLE `db_post`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `db_products`
--
ALTER TABLE `db_products`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- AUTO_INCREMENT for table `db_product_image`
--
ALTER TABLE `db_product_image`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;

--
-- AUTO_INCREMENT for table `db_product_sale`
--
ALTER TABLE `db_product_sale`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `db_product_store`
--
ALTER TABLE `db_product_store`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;

--
-- AUTO_INCREMENT for table `db_topic`
--
ALTER TABLE `db_topic`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `db_users`
--
ALTER TABLE `db_users`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `db_carts`
--
ALTER TABLE `db_carts`
  ADD CONSTRAINT `carts_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `db_products` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `carts_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `db_users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `db_contact`
--
ALTER TABLE `db_contact`
  ADD CONSTRAINT `contact_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `db_users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `db_orders`
--
ALTER TABLE `db_orders`
  ADD CONSTRAINT `orders_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `db_users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `db_order_details`
--
ALTER TABLE `db_order_details`
  ADD CONSTRAINT `order_details_order_id_foreign` FOREIGN KEY (`order_id`) REFERENCES `db_orders` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `order_details_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `db_products` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `db_post`
--
ALTER TABLE `db_post`
  ADD CONSTRAINT `post_topic_id_foreign` FOREIGN KEY (`topic_id`) REFERENCES `db_topic` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `db_products`
--
ALTER TABLE `db_products`
  ADD CONSTRAINT `products_brand_id_foreign` FOREIGN KEY (`brand_id`) REFERENCES `db_brands` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `products_category_id_foreign` FOREIGN KEY (`category_id`) REFERENCES `db_categories` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `db_product_image`
--
ALTER TABLE `db_product_image`
  ADD CONSTRAINT `product_image_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `db_products` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `db_product_sale`
--
ALTER TABLE `db_product_sale`
  ADD CONSTRAINT `product_sale_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `db_products` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `db_product_store`
--
ALTER TABLE `db_product_store`
  ADD CONSTRAINT `product_store_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `db_products` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
