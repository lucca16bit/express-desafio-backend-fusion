-- CreateTable
CREATE TABLE `spaceShips` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,
    `model` VARCHAR(100) NOT NULL,
    `manufacturer` VARCHAR(50) NOT NULL,
    `passengerCapacity` INTEGER NOT NULL,

    UNIQUE INDEX `SpaceShips_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_charactersTospaceShips` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_charactersTospaceShips_AB_unique`(`A`, `B`),
    INDEX `_charactersTospaceShips_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_charactersTospaceShips` ADD CONSTRAINT `_charactersTospaceShips_A_fkey` FOREIGN KEY (`A`) REFERENCES `characters`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_charactersTospaceShips` ADD CONSTRAINT `_charactersTospaceShips_B_fkey` FOREIGN KEY (`B`) REFERENCES `spaceShips`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
