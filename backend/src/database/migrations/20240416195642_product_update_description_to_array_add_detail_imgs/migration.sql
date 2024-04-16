/*
  Warnings:

  - The `description` column on the `Product` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "detailImgs" TEXT[],
DROP COLUMN "description",
ADD COLUMN     "description" TEXT[];
