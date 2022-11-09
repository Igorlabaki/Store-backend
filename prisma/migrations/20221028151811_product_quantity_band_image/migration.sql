-- AlterTable
ALTER TABLE `products` ADD COLUMN `brandImage` VARCHAR(191) NULL,
    ADD COLUMN `quantity` INTEGER NOT NULL DEFAULT 0;
