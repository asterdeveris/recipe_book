const listOfRecepes = document.querySelector(".list-of-recepes-ul");
const closeButtons = document.querySelectorAll(".close-button");
const deleteButton = document.querySelector("#delete");
const darkBackground = document.querySelector(".background");
const buttons = document.querySelector(".buttons");

// Inside add recipe form variables
const form = document.querySelector(".form");
const recipeNameForm = document.getElementById("recipe-name");
const ingridientsForm = document.getElementById("ingridients");
const directionsForm = document.getElementById("directions");
const submitButton = document.querySelector("[type='submit']");

// Inside editing recipe form variables
const editingForm = document.querySelector(".editing-form");
const recipeNameEdForm = document.getElementById("editing-form-recipe-name");
const ingridientsEdForm = document.getElementById("editing-form-ingridients");
const directionsEdForm = document.getElementById("editing-form-directions");
const saveButton = document.querySelector("[name='save']");

// Find buttons for editing list and recepes
const addButton = document.querySelector("#add-recipe");
const editButton = document.querySelector("#edit");

// Chosen recipe
const recipeHeader = document.querySelector(".recipe-header-h");
const ingridientsList = document.querySelector(".recipe-ingridients-list");
const directionsList = document.querySelector(".recipe-directions-list");

onLoading();

function onLoading() {
  const recipeStore = JSON.parse(localStorage.getItem("recipeStore")) || [];
  populateListOfRecepes(recipeStore, listOfRecepes);
  const recipeName = recipeStore.length > 0 ? recipeStore[0].name : "";
  showRecipe(recipeName, recipeStore);
}

function openForm(e) {
  if (e.target.parentElement === addButton) {
    form.classList.remove("hide");
  } else if (e.target.parentElement === editButton) {
    openEditingRecipe();
  }
  darkBackground.classList.remove("hide");
}

function openEditingRecipe(e) {
  const recipeStore = JSON.parse(localStorage.getItem("recipeStore")) || [];

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

function createRecipe(input1, input2, input3) {
  const name = input1.value;
  const ingridients = input2.value.trim().split("\n");
  const directions = input3.value.trim().split("\n");

  const recipe = {
    name,
    ingridients,
    directions,
  };

  return recipe;
}

function addRecipe(e) {
  e.preventDefault();

  const recipe = createRecipe(recipeNameForm, ingridientsForm, directionsForm);

  const recipeStore = JSON.parse(localStorage.getItem("recipeStore")) || [];
  recipeStore.push(recipe);

  populateListOfRecepes(recipeStore, listOfRecepes);
  localStorage.setItem("recipeStore", JSON.stringify(recipeStore));
  showRecipe(recipe.name, recipeStore);
  e.target.reset();
}

function addEdditedRecipe(e) {
  e.preventDefault();

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

function populateListOfRecepes(recepes, recepesList) {
  recepesList.innerHTML = recepes
    .map((recipe) => {
      return `
        <li>${recipe.name}</li>
        `;
    })
    .join("");
}

function showRecipe(recipeName, recipeStore) {
  if (recipeName === "") {
    recipeHeader.innerHTML = "Add new recipe";
    return;
  }

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

function closeModal() {
  form.classList.add("hide");
  editingForm.classList.add("hide");
  darkBackground.classList.add("hide");
  form.reset();
}

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
  const recipeName = recipeStore.length > 0 ? recipeStore[0].name : "";
  showRecipe(recipeName, recipeStore);
}

// Event Listeners
addButton.addEventListener("click", openForm);
editButton.addEventListener("click", openForm);
deleteButton.addEventListener("click", confirmDelete);
// addButton.addEventListener("mouseover");
// editButton.addEventListener("mouseover");
deleteButton.addEventListener("mouseover", () => {
  document.getElementById("tooltip-delete").classList.remove("hide");
});
deleteButton.addEventListener("mouseleave", () => {
  document.getElementById("tooltip-delete").classList.add("hide");
});
addButton.addEventListener("mouseover", () => {
  document.getElementById("tooltip-add").classList.remove("hide");
});
addButton.addEventListener("mouseleave", () => {
  document.getElementById("tooltip-add").classList.add("hide");
});
editButton.addEventListener("mouseover", () => {
  document.getElementById("tooltip-edit").classList.remove("hide");
});
editButton.addEventListener("mouseleave", () => {
  document.getElementById("tooltip-edit").classList.add("hide");
});

form.addEventListener("submit", addRecipe);
editingForm.addEventListener("submit", addEdditedRecipe);

closeButtons.forEach((button) => button.addEventListener("click", closeModal));

listOfRecepes.addEventListener("click", (e) =>
  showRecipe(
    e.target.innerHTML,
    JSON.parse(localStorage.getItem("recipeStore"))
  )
);

populateListOfRecepes(
  JSON.parse(localStorage.getItem("recipeStore")) || [],
  listOfRecepes
);
