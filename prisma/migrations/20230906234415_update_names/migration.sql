-- AlterTable
ALTER TABLE `Category` CHANGE COLUMN `name` `title` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Transaction` ADD COLUMN `title` VARCHAR(191) NOT NULL;
