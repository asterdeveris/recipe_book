export default function createRecipe(input1, input2, input3) {
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
