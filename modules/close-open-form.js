import { form, editingForm, addButton, editButton } from "./variables.js";
import openEditingRecipe from "./open-editing-recipe.js";

const darkBackground = document.querySelector(".background");

function openForm(e) {
  if (e.target.parentElement === addButton) {
    form.classList.remove("hide");
  } else if (e.target.parentElement === editButton) {
    openEditingRecipe();
  }
  darkBackground.classList.remove("hide");
}

function closeModal() {
  form.classList.add("hide");
  editingForm.classList.add("hide");
  darkBackground.classList.add("hide");
  form.reset();
}

export { openForm, closeModal };
