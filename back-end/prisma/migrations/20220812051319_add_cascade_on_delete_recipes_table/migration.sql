-- DropForeignKey
ALTER TABLE "recipesIngredient" DROP CONSTRAINT "recipesIngredient_recipeId_fkey";

-- AddForeignKey
ALTER TABLE "recipesIngredient" ADD CONSTRAINT "recipesIngredient_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "recipes"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
