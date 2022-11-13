/*
  Warnings:

  - You are about to drop the column `image` on the `products` table. All the data in the column will be lost.
  - Added the required column `productImage` to the `products` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `products` DROP COLUMN `image`,
    ADD COLUMN `productImage` VARCHAR(191) NOT NULL;
