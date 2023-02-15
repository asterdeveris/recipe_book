const listOfRecepies = document.querySelector(".list-of-recepies");

// Inside form variables
const form = document.querySelector(".form");
const recipeNameForm = document.getElementById("recipe-name");
const ingridientsForm = document.getElementById("ingridients");
const directionsForm = document.getElementById("directions");
const closeButton = document.querySelector("#close");
const submitButton = document.querySelector("[type='submit']");

// Find buttons for editing list and recepies
const addButton = document.querySelector("#add-recipe");
const editButton = document.querySelector("#edit");

// Chosen recipe
const recipeHeader = document.querySelector(".recipe-header-h");
const ingridientsList = document.querySelector(".recipe-ingridients-list");
const directionsList = document.querySelector(".recipe-directions-list");

const recipeStore = JSON.parse(localStorage.getItem("recipeStore")) || [];

function openForm(e) {
  if (e.target.parentElement === addButton) {
    submitButton.value = `Add`;
    form.classList.remove("hide");
  } else if (e.target.parentElement === editButton) {
    openEditingRecipe();
  }
}

function addRecipe(e) {
  e.preventDefault();
  const name = recipeNameForm.value;
  const ingridients = ingridientsForm.value.split("\n");
  const directions = directionsForm.value.split("\n");

  const recipe = {
    name,
    ingridients,
    directions,
  };

  recipeStore.push(recipe);
  populateListOfRecepies(recipeStore, listOfRecepies);
  localStorage.setItem("recipeStore", JSON.stringify(recipeStore));
  e.target.reset();
}

function populateListOfRecepies(recepies, recepiesList) {
  recepiesList.innerHTML = recepies
    .map((recipe) => {
      return `
        <li>${recipe.name}</li>
        `;
    })
    .join("");
}

function closeModal(e) {
  form.classList.add("hide");
  form.reset();
}

function showRecipe(recipeName) {
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

function openEditingRecipe(e) {
  const editingRecipe = recipeStore.find(
    (el) => el.name === recipeHeader.innerHTML
  );
  const inx = recipeStore.findIndex((el) => el.name === recipeHeader.innerHTML);

  const { ingridients, directions } = editingRecipe;

  ingridientsForm.value = ingridients
    .map((ingridient) => {
      return `${ingridient}\n`;
    })
    .join("");

  recipeNameForm.value = recipeHeader.innerHTML;

  directionsForm.value = directions
    .map((direction) => {
      return `${direction}\n`;
    })
    .join("");

  submitButton.value = `Save`;
  form.classList.remove("hide");

  submitButton.addEventListener("click", () => {
    if ((submitButton.value = "Save")) {
      recipeStore[inx].name = recipeNameForm.value;
      recipeStore[inx].ingridients = ingridientsForm.value.trim().split("\n");
      recipeStore[inx].directions = directionsForm.value.trim().split("\n");
      console.log(recipeStore[inx]);

      showRecipe(recipeStore[inx].name);
    }

    populateListOfRecepies(recipeStore, listOfRecepies);
  });
}

addButton.addEventListener("click", openForm);
form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (submitButton.value === "Add") {
    addRecipe(e);
  }
});

closeButton.addEventListener("click", closeModal);
listOfRecepies.addEventListener("click", (e) => showRecipe(e.target.innerHTML));
editButton.addEventListener("click", openForm);
populateListOfRecepies(recipeStore, listOfRecepies);
