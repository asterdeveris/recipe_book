import populateListOfRecepes from "./populate-list.js";
import showRecipe from "./show-recipe.js";
import { recipeHeader, listOfRecepes } from "./variables.js";

function confirmDelete() {
  if (
    confirm(
      "Are your sure you want to delete this recipe from Recipe book?"
    ) === true
  ) {
    deleteRecipe();
  }
}

function deleteRecipe() {
  const recipeStore = JSON.parse(localStorage.getItem("recipeStore"));
  const ind = recipeStore.findIndex((el) => el.name === recipeHeader.innerHTML);

  const newRecipeStore = [
    ...recipeStore.slice(0, ind),
    ...recipeStore.slice(ind + 1),
  ];

  localStorage.setItem("recipeStore", JSON.stringify(newRecipeStore));
  populateListOfRecepes(newRecipeStore, listOfRecepes);
  const recipeName = newRecipeStore.length > 0 ? newRecipeStore[0].name : "";
  console.log(recipeName);
  showRecipe(recipeName, recipeStore);
}

export default confirmDelete;
