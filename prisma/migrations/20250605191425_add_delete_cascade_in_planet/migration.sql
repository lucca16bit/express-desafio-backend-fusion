-- DropForeignKey
ALTER TABLE `planet` DROP FOREIGN KEY `planet_userId_fkey`;

-- DropIndex
DROP INDEX `planet_userId_fkey` ON `planet`;

-- AddForeignKey
ALTER TABLE `planet` ADD CONSTRAINT `planet_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
