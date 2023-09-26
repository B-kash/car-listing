/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Car` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Car` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Car" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
