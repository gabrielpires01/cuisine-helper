/*
  Warnings:

  - You are about to drop the column `measurementId` on the `recipesIgredient` table. All the data in the column will be lost.
  - You are about to drop the `measurements` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `measurement` to the `recipesIgredient` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "recipesIgredient" DROP CONSTRAINT "recipesIgredient_measurementId_fkey";

-- AlterTable
ALTER TABLE "recipesIgredient" DROP COLUMN "measurementId",
ADD COLUMN     "measurement" TEXT NOT NULL;

-- DropTable
DROP TABLE "measurements";
