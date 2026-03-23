-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2026. Már 06. 08:08
-- Kiszolgáló verziója: 10.4.32-MariaDB
-- PHP verzió: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `car_rental`
--

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `advertisement`
--

CREATE TABLE `advertisement` (
  `id` int(11) NOT NULL,
  `car_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `location` varchar(150) DEFAULT NULL,
  `status` varchar(30) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `smoking` tinyint(1) DEFAULT NULL,
  `animal` tinyint(1) DEFAULT NULL,
  `max_km_per_day` int(11) DEFAULT NULL,
  `deleted` tinyint(1) NOT NULL DEFAULT 0,
  `deletedAt` datetime(3) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `cars`
--

CREATE TABLE `cars` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `make` varchar(50) NOT NULL,
  `model` varchar(50) NOT NULL,
  `prod_year` int(11) DEFAULT NULL,
  `available` tinyint(1) DEFAULT 1,
  `driveing_licence` varchar(20) DEFAULT NULL,
  `pictures` text DEFAULT NULL,
  `trunk_space` int(11) DEFAULT NULL,
  `daily_rate` decimal(10,2) NOT NULL,
  `deposit` decimal(10,2) DEFAULT NULL,
  `licence_plate` varchar(20) NOT NULL,
  `fuel_type` varchar(30) DEFAULT NULL,
  `doors_number` int(11) DEFAULT NULL,
  `air_con` tinyint(1) DEFAULT NULL,
  `seats_number` int(11) DEFAULT NULL,
  `gearbox_type` varchar(30) DEFAULT NULL,
  `deleted` tinyint(1) NOT NULL DEFAULT 0,
  `deletedAt` datetime(3) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- A tábla adatainak kiíratása `cars`
--

INSERT INTO `cars` (`id`, `user_id`, `make`, `model`, `prod_year`, `available`, `driveing_licence`, `pictures`, `trunk_space`, `daily_rate`, `deposit`, `licence_plate`, `fuel_type`, `doors_number`, `air_con`, `seats_number`, `gearbox_type`, `deleted`, `deletedAt`) VALUES
(6, 1, 'Toyota', 'Corolla', 2020, 1, 'B', 'car1.jpg,car2.jpg,car3.jpg', 350, 45.00, 200.00, 'TBC-863', 'Benzin', 5, 1, 5, 'Manuális', 1, '2026-03-06 06:51:10.617'),
(7, 1, 'Ford', 'Fiesta', 2020, 1, 'B', 'car1.jpg,car2.jpg,car3.jpg', 350, 45.00, 200.00, 'RAK-007', 'Benzin', 5, 1, 5, 'Manuális', 0, NULL);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `rental`
--

CREATE TABLE `rental` (
  `id` int(11) NOT NULL,
  `car_id` int(11) NOT NULL,
  `from` date NOT NULL,
  `until` date NOT NULL,
  `lessor_id` int(11) NOT NULL,
  `customer_id` int(11) NOT NULL,
  `rental_price` decimal(10,2) NOT NULL,
  `pickup_location` varchar(150) DEFAULT NULL,
  `dropoff_location` varchar(150) DEFAULT NULL,
  `deleted` tinyint(1) NOT NULL DEFAULT 0,
  `deletedAt` datetime(3) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `age` int(11) DEFAULT NULL,
  `contact_email` varchar(150) NOT NULL,
  `contact_phoneNumber` varchar(30) DEFAULT NULL,
  `deleted` tinyint(1) NOT NULL DEFAULT 0,
  `deletedAt` datetime(3) DEFAULT NULL,
  `password` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- A tábla adatainak kiíratása `users`
--

INSERT INTO `users` (`id`, `name`, `age`, `contact_email`, `contact_phoneNumber`, `deleted`, `deletedAt`, `password`) VALUES
(1, 'adsa', 58, 'asdasdasdasdasd', NULL, 0, NULL, 'rakosmakos'),
(2, 'nem tudom', 25, 'nemtudom@example.com', NULL, 0, NULL, 'nemtudom');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `_prisma_migrations`
--

CREATE TABLE `_prisma_migrations` (
  `id` varchar(36) NOT NULL,
  `checksum` varchar(64) NOT NULL,
  `finished_at` datetime(3) DEFAULT NULL,
  `migration_name` varchar(255) NOT NULL,
  `logs` text DEFAULT NULL,
  `rolled_back_at` datetime(3) DEFAULT NULL,
  `started_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `applied_steps_count` int(10) UNSIGNED NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- A tábla adatainak kiíratása `_prisma_migrations`
--

INSERT INTO `_prisma_migrations` (`id`, `checksum`, `finished_at`, `migration_name`, `logs`, `rolled_back_at`, `started_at`, `applied_steps_count`) VALUES
('3c095329-a669-4a11-ba23-964313e3546d', '3a2054047c201b983375eb0a6990ecf776f82a2c944b0c7c07cdd538f33a85a6', '2026-03-06 06:46:42.171', '20260306064642_soft_delete_mindennek', NULL, NULL, '2026-03-06 06:46:42.110', 1),
('b887d671-8335-4271-a949-8a579ad59ce7', 'ef5b53dfe5deff224ffa7e30759f20426ea34b397e1198888601dff7caebd4fb', '2026-03-02 10:54:44.557', '20260302105444_deleted_at_password', NULL, NULL, '2026-03-02 10:54:44.271', 1),
('c41a63b8-d1d5-42b9-ba0d-7e8c407df6c5', '7774e00d302f7f3be2f76c99eba98190cbf30b274f09852b992b00da3b162f03', '2026-03-03 07:02:33.604', '20260303070233_delete_update', NULL, NULL, '2026-03-03 07:02:33.563', 1);

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `advertisement`
--
ALTER TABLE `advertisement`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_advertisement_car` (`car_id`),
  ADD KEY `fk_advertisement_user` (`user_id`);

--
-- A tábla indexei `cars`
--
ALTER TABLE `cars`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `licence_plate` (`licence_plate`),
  ADD KEY `fk_cars_user` (`user_id`);

--
-- A tábla indexei `rental`
--
ALTER TABLE `rental`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_rental_car` (`car_id`),
  ADD KEY `fk_rental_customer` (`customer_id`),
  ADD KEY `fk_rental_lessor` (`lessor_id`);

--
-- A tábla indexei `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `contact_email` (`contact_email`);

--
-- A tábla indexei `_prisma_migrations`
--
ALTER TABLE `_prisma_migrations`
  ADD PRIMARY KEY (`id`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `advertisement`
--
ALTER TABLE `advertisement`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `cars`
--
ALTER TABLE `cars`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT a táblához `rental`
--
ALTER TABLE `rental`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Megkötések a kiírt táblákhoz
--

--
-- Megkötések a táblához `advertisement`
--
ALTER TABLE `advertisement`
  ADD CONSTRAINT `fk_advertisement_car` FOREIGN KEY (`car_id`) REFERENCES `cars` (`id`),
  ADD CONSTRAINT `fk_advertisement_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Megkötések a táblához `cars`
--
ALTER TABLE `cars`
  ADD CONSTRAINT `fk_cars_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Megkötések a táblához `rental`
--
ALTER TABLE `rental`
  ADD CONSTRAINT `fk_rental_car` FOREIGN KEY (`car_id`) REFERENCES `cars` (`id`),
  ADD CONSTRAINT `fk_rental_customer` FOREIGN KEY (`customer_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `fk_rental_lessor` FOREIGN KEY (`lessor_id`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
