function populateListOfRecepes(recepes, recepesList) {
  recepesList.innerHTML = recepes
    .map((recipe) => {
      return `
        <li>${recipe.name}</li>
        `;
    })
    .join("");
}

export default populateListOfRecepes;
