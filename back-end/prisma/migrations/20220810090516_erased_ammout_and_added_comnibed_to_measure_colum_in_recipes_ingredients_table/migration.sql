/*
  Warnings:

  - You are about to drop the column `ammount` on the `recipesIgredient` table. All the data in the column will be lost.
  - You are about to drop the column `measurement` on the `recipesIgredient` table. All the data in the column will be lost.
  - Added the required column `measure` to the `recipesIgredient` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "recipesIgredient" DROP COLUMN "ammount",
DROP COLUMN "measurement",
ADD COLUMN     "measure" TEXT NOT NULL;
