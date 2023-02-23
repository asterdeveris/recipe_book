import { recipeHeader } from "./variables.js";
const ingridientsList = document.querySelector(".recipe-ingridients-list");
const directionsList = document.querySelector(".recipe-directions-list");
const directionsSubHeaders = document.querySelectorAll(".sub-header");

function showRecipe(recipeName, recipeStore) {
  if (recipeName === "") {
    recipeHeader.innerHTML = "Add new recipe";
    ingridientsList.innerHTML = "";
    directionsList.innerHTML = "";
    directionsSubHeaders.forEach((el) => (el.innerHTML = ""));
    return;
  }
  console.log("xcvb");

  const recipe = recipeStore.find((el) => el.name === recipeName);

  const { name, ingridients, directions } = recipe;

  recipeHeader.innerHTML = name;

  ingridientsList.innerHTML = ingridients
    .map((ingridient) => {
      return `<li>${ingridient}</li>`;
    })
    .join("");

  directionsList.innerHTML = directions
    .map((direction) => {
      return `<li>${direction}</li>`;
    })
    .join("");
}

export default showRecipe;
