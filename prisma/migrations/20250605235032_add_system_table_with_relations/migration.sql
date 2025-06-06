/*
  Warnings:

  - Added the required column `systemId` to the `planet` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `planet` ADD COLUMN `systemId` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `starSystem` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,
    `description` TEXT NOT NULL,
    `userId` INTEGER NOT NULL,

    UNIQUE INDEX `Star_system_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `planet` ADD CONSTRAINT `planet_systemId_fkey` FOREIGN KEY (`systemId`) REFERENCES `starSystem`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `starSystem` ADD CONSTRAINT `starSystem_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
