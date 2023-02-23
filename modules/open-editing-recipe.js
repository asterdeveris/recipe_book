import { recipeHeader, editingForm } from "./variables.js";

export default function openEditingRecipe(e) {
  const recipeStore = JSON.parse(localStorage.getItem("recipeStore")) || [];

  const recipeNameEdForm = document.getElementById("editing-form-recipe-name");
  const ingridientsEdForm = document.getElementById("editing-form-ingridients");
  const directionsEdForm = document.getElementById("editing-form-directions");

  const editingRecipe = recipeStore.find(
    (el) => el.name === recipeHeader.innerHTML
  );

  const { ingridients, directions } = editingRecipe;

  ingridientsEdForm.value = ingridients
    .map((ingridient) => {
      return `${ingridient}\n`;
    })
    .join("");

  recipeNameEdForm.value = recipeHeader.innerHTML;

  directionsEdForm.value = directions
    .map((direction) => {
      return `${direction}\n`;
    })
    .join("");

  editingForm.classList.remove("hide");
}
