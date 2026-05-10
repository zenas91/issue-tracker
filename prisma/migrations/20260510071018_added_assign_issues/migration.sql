-- AlterTable
ALTER TABLE `issue` ADD COLUMN `assignedToUserId` VARCHAR(255) NULL;

-- AddForeignKey
ALTER TABLE `Issue` ADD CONSTRAINT `Issue_assignedToUserId_fkey` FOREIGN KEY (`assignedToUserId`) REFERENCES `user`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
