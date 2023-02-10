const addButton = document.querySelector("#add-recipe");
const form = document.querySelector(".form");
const listOfRecepies = document.querySelector(".list-of-recepies");
const closeButton = document.querySelector("#close");
const ingridientsList = document.querySelector(".recipe-ingridients-list");
const directionsList = document.querySelector(".recipe-directions-list");
const recipeHeader = document.querySelector(".recipe-header-h");

const recipeStore = JSON.parse(localStorage.getItem("recipeStore")) || [];

function openForm() {
  form.classList.remove("hide");
}

function addRecipe(e) {
  e.preventDefault();
  const name = document.getElementById("recipe-name").value;
  const ingridients = document.getElementById("ingridients").value.split("\n");
  const directions = document.getElementById("directions").value.split("\n");

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

function closeModal() {
  form.classList.add("hide");
}

function showRecipe() {
  const { name, ingridients, directions } = recipeStore.find(
    (el) => el.name === e.target.innerHTML
  );

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

addButton.addEventListener("click", openForm);
form.addEventListener("submit", addRecipe);
closeButton.addEventListener("click", closeModal);
listOfRecepies.addEventListener("click", showRecipe);
populateListOfRecepies(recipeStore, listOfRecepies);
