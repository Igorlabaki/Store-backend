/*
  Warnings:

  - You are about to drop the `userskills` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `userskills` DROP FOREIGN KEY `UserSkills_fk_id_cart_fkey`;

-- DropForeignKey
ALTER TABLE `userskills` DROP FOREIGN KEY `UserSkills_fk_id_product_fkey`;

-- DropTable
DROP TABLE `userskills`;

-- CreateTable
CREATE TABLE `ProductCarts` (
    `id` VARCHAR(191) NOT NULL,
    `fk_id_product` VARCHAR(191) NOT NULL,
    `fk_id_cart` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ProductCarts` ADD CONSTRAINT `ProductCarts_fk_id_product_fkey` FOREIGN KEY (`fk_id_product`) REFERENCES `products`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProductCarts` ADD CONSTRAINT `ProductCarts_fk_id_cart_fkey` FOREIGN KEY (`fk_id_cart`) REFERENCES `cart`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
