/*
  Warnings:

  - Added the required column `userId` to the `characters` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `spaceShips` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `characters` ADD COLUMN `userId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `spaceships` ADD COLUMN `userId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `characters` ADD CONSTRAINT `characters_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `spaceShips` ADD CONSTRAINT `spaceShips_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
