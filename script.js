import populateListOfRecepes from "./modules/populate-list.js";
import addRecipe from "./modules/add-recipe.js";
import addEdditedRecipe from "./modules/add-edited-recipe.js";
import showRecipe from "./modules/show-recipe.js";
import onLoading from "./modules/on-loading.js";
import confirmDelete from "./modules/delete-recipe.js";
import {
  form,
  editingForm,
  addButton,
  editButton,
  listOfRecepes,
} from "./modules/variables.js";
import { closeModal, openForm } from "./modules/close-open-form.js";
import showTooltips from "./modules/show-tooltips.js";

const closeButtons = document.querySelectorAll(".close-button");
const deleteButton = document.querySelector("#delete");
const buttons = document.querySelectorAll(".buttons i");

onLoading();

// Event Listeners and Tooltips for editing buttons
addButton.addEventListener("click", openForm);
editButton.addEventListener("click", openForm);
deleteButton.addEventListener("click", confirmDelete);
showTooltips(buttons, "mouseover");
showTooltips(buttons, "mouseleave");

// Event Listeners for form
form.addEventListener("submit", addRecipe);
editingForm.addEventListener("submit", addEdditedRecipe);
closeButtons.forEach((button) => button.addEventListener("click", closeModal));

// Show chosen recipe on the page
listOfRecepes.addEventListener("click", (e) =>
  showRecipe(
    e.target.innerHTML,
    JSON.parse(localStorage.getItem("recipeStore"))
  )
);

// Display list os recepes
populateListOfRecepes(
  JSON.parse(localStorage.getItem("recipeStore")) || [],
  listOfRecepes
);
