/*
  Warnings:

  - Added the required column `userId` to the `planet` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `planet` ADD COLUMN `userId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `planet` ADD CONSTRAINT `planet_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
