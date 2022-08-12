/*
  Warnings:

  - You are about to drop the `recipesIgredient` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "recipesIgredient" DROP CONSTRAINT "recipesIgredient_ingredientId_fkey";

-- DropForeignKey
ALTER TABLE "recipesIgredient" DROP CONSTRAINT "recipesIgredient_recipeId_fkey";

-- DropTable
DROP TABLE "recipesIgredient";

-- CreateTable
CREATE TABLE "recipesIngredient" (
    "id" SERIAL NOT NULL,
    "recipeId" INTEGER NOT NULL,
    "measure" TEXT NOT NULL,
    "ingredientId" INTEGER NOT NULL,

    CONSTRAINT "recipesIngredient_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "recipesIngredient" ADD CONSTRAINT "recipesIngredient_ingredientId_fkey" FOREIGN KEY ("ingredientId") REFERENCES "ingredients"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "recipesIngredient" ADD CONSTRAINT "recipesIngredient_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "recipes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
