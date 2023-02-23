import populateListOfRecepes from "./populate-list.js";
import showRecipe from "./show-recipe.js";
import createRecipe from "./create-recipe.js";
import { listOfRecepes } from "./variables.js";
import { closeModal } from "./close-open-form.js";

export default function addRecipe(e) {
  e.preventDefault();

  const recipeNameForm = document.getElementById("recipe-name");
  const ingridientsForm = document.getElementById("ingridients");
  const directionsForm = document.getElementById("directions");

  const recipe = createRecipe(recipeNameForm, ingridientsForm, directionsForm);

  const recipeStore = JSON.parse(localStorage.getItem("recipeStore")) || [];
  recipeStore.push(recipe);

  populateListOfRecepes(recipeStore, listOfRecepes);
  localStorage.setItem("recipeStore", JSON.stringify(recipeStore));
  showRecipe(recipe.name, recipeStore);
  e.target.reset();
  closeModal();
}
