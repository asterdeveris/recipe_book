const listOfRecepies = document.querySelector(".list-of-recepies");

// Inside add recipe form variables
const form = document.querySelector(".form");
const recipeNameForm = document.getElementById("recipe-name");
const ingridientsForm = document.getElementById("ingridients");
const directionsForm = document.getElementById("directions");
const closeButtons = document.querySelectorAll(".close-button");
console.log(closeButtons);
const submitButton = document.querySelector("[type='submit']");

// Inside editing recipe form variables
const editingForm = document.querySelector(".editing-form");
const recipeNameEdForm = document.getElementById("editing-form-recipe-name");
const ingridientsEdForm = document.getElementById("editing-form-ingridients");
const directionsEdForm = document.getElementById("editing-form-directions");
const saveButton = document.querySelector("[name='save']");

// Find buttons for editing list and recepies
const addButton = document.querySelector("#add-recipe");
const editButton = document.querySelector("#edit");

// Chosen recipe
const recipeHeader = document.querySelector(".recipe-header-h");
const ingridientsList = document.querySelector(".recipe-ingridients-list");
const directionsList = document.querySelector(".recipe-directions-list");

onLoading();

function onLoading() {
  const recipeStorage = JSON.parse(localStorage.getItem("recipeStore")) || [];
  populateListOfRecepies(recipeStorage, listOfRecepies);
  showRecipe(recipeStorage[0].name, recipeStorage);
}

function openForm(e) {
  if (e.target.parentElement === addButton) {
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

  const recipeStore = JSON.parse(localStorage.getItem("recipeStore")) || [];
  console.log(recipeStore);
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
  editingForm.classList.add("hide");
  form.reset();
}

function showRecipe(recipeName, recipeStore) {
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
  const recipeStore = JSON.parse(localStorage.getItem("recipeStore")) || [];

  const editingRecipe = recipeStore.find(
    (el) => el.name === recipeHeader.innerHTML
  );
  const ind = recipeStore.findIndex((el) => el.name === recipeHeader.innerHTML);

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

  saveButton.addEventListener("click", (e) => {
    e.preventDefault();
    const name = recipeNameEdForm.value;
    const ingridients = ingridientsEdForm.value.trim().split("\n");
    const directions = directionsEdForm.value.trim().split("\n");

    const recipe = {
      name,
      ingridients,
      directions,
    };

    const newRecipeStore = [
      ...recipeStore.slice(0, ind),
      recipe,
      ...recipeStore.slice(ind + 1),
    ];

    localStorage.setItem("recipeStore", JSON.stringify(newRecipeStore));
    showRecipe(recipe.name, newRecipeStore);
    populateListOfRecepies(newRecipeStore, listOfRecepies);
  });
}

addButton.addEventListener("click", openForm);

form.addEventListener("submit", addRecipe);

closeButtons.forEach((button) => button.addEventListener("click", closeModal));

listOfRecepies.addEventListener("click", (e) =>
  showRecipe(
    e.target.innerHTML,
    JSON.parse(localStorage.getItem("recipeStore"))
  )
);
editButton.addEventListener("click", openForm);
populateListOfRecepies(
  JSON.parse(localStorage.getItem("recipeStore")) || [],
  listOfRecepies
);
