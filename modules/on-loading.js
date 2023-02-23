import populateListOfRecepes from "./populate-list.js";
import showRecipe from "./show-recipe.js";
import { listOfRecepes } from "./variables.js";

function onLoading() {
  const recipeStore = JSON.parse(localStorage.getItem("recipeStore")) || [];
  populateListOfRecepes(recipeStore, listOfRecepes);
  const recipeName = recipeStore.length > 0 ? recipeStore[0].name : "";
  showRecipe(recipeName, recipeStore);
}

export default onLoading;
