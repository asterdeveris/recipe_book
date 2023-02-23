import showRecipe from "./show-recipe.js";
import populateListOfRecepes from "./populate-list.js";
import { recipeHeader, listOfRecepes } from "./variables.js";
import createRecipe from "./create-recipe.js";
export default function addEdditedRecipe(e) {
  e.preventDefault();

  const recipeNameEdForm = document.getElementById("editing-form-recipe-name");
  const ingridientsEdForm = document.getElementById("editing-form-ingridients");
  const directionsEdForm = document.getElementById("editing-form-directions");

  const recipeStore = JSON.parse(localStorage.getItem("recipeStore")) || [];
  const ind = recipeStore.findIndex((el) => el.name === recipeHeader.innerHTML);

  const recipe = createRecipe(
    recipeNameEdForm,
    ingridientsEdForm,
    directionsEdForm
  );

  const newRecipeStore = [
    ...recipeStore.slice(0, ind),
    recipe,
    ...recipeStore.slice(ind + 1),
  ];

  localStorage.setItem("recipeStore", JSON.stringify(newRecipeStore));
  showRecipe(recipe.name, newRecipeStore);
  populateListOfRecepes(newRecipeStore, listOfRecepes);
}
