-- CreateTable
CREATE TABLE `advertisement` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `car_id` INTEGER NOT NULL,
    `user_id` INTEGER NOT NULL,
    `location` VARCHAR(150) NULL,
    `status` VARCHAR(30) NULL,
    `description` TEXT NULL,
    `smoking` BOOLEAN NULL,
    `animal` BOOLEAN NULL,
    `max_km_per_day` INTEGER NULL,

    INDEX `fk_advertisement_car`(`car_id`),
    INDEX `fk_advertisement_user`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `cars` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `make` VARCHAR(50) NOT NULL,
    `model` VARCHAR(50) NOT NULL,
    `prod_year` INTEGER NULL,
    `available` BOOLEAN NULL DEFAULT true,
    `driveing_licence` VARCHAR(20) NULL,
    `pictures` TEXT NULL,
    `trunk_space` INTEGER NULL,
    `daily_rate` DECIMAL(10, 2) NOT NULL,
    `deposit` DECIMAL(10, 2) NULL,
    `licence_plate` VARCHAR(20) NOT NULL,
    `fuel_type` VARCHAR(30) NULL,
    `doors_number` INTEGER NULL,
    `air_con` BOOLEAN NULL,
    `seats_number` INTEGER NULL,
    `gearbox_type` VARCHAR(30) NULL,

    UNIQUE INDEX `licence_plate`(`licence_plate`),
    INDEX `fk_cars_user`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `rental` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `car_id` INTEGER NOT NULL,
    `from` DATE NOT NULL,
    `until` DATE NOT NULL,
    `lessor_id` INTEGER NOT NULL,
    `customer_id` INTEGER NOT NULL,
    `rental_price` DECIMAL(10, 2) NOT NULL,
    `pickup_location` VARCHAR(150) NULL,
    `dropoff_location` VARCHAR(150) NULL,

    INDEX `fk_rental_car`(`car_id`),
    INDEX `fk_rental_customer`(`customer_id`),
    INDEX `fk_rental_lessor`(`lessor_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,
    `age` INTEGER NULL,
    `contact_email` VARCHAR(150) NOT NULL,
    `contact_phoneNumber` VARCHAR(30) NULL,
    `deleted` BOOLEAN NOT NULL DEFAULT false,
    `deletedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `password` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `contact_email`(`contact_email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `advertisement` ADD CONSTRAINT `fk_advertisement_car` FOREIGN KEY (`car_id`) REFERENCES `cars`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `advertisement` ADD CONSTRAINT `fk_advertisement_user` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `cars` ADD CONSTRAINT `fk_cars_user` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `rental` ADD CONSTRAINT `fk_rental_car` FOREIGN KEY (`car_id`) REFERENCES `cars`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `rental` ADD CONSTRAINT `fk_rental_customer` FOREIGN KEY (`customer_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `rental` ADD CONSTRAINT `fk_rental_lessor` FOREIGN KEY (`lessor_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;
