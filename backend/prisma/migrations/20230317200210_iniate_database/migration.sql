-- CreateTable
CREATE TABLE `shopkeeper` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NULL,
    `email` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NULL,
    `password` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `shopkeeper_id_key`(`id`),
    UNIQUE INDEX `shopkeeper_email_key`(`email`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `store` (
    `id` VARCHAR(191) NOT NULL,
    `cnpj` VARCHAR(191) NOT NULL,
    `fantasy_name` VARCHAR(191) NOT NULL,
    `corporate_reason` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,
    `shopkeeper_id_fk` VARCHAR(191) NULL,

    UNIQUE INDEX `store_id_key`(`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `store` ADD CONSTRAINT `store_shopkeeper_id_fk_fkey` FOREIGN KEY (`shopkeeper_id_fk`) REFERENCES `shopkeeper`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
