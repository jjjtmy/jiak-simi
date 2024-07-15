import * as dishesAPI from "../api/dishes";

export async function getDish(dish_id) {
  // console.log(`service getDish dish_id`, dish_id)
  const dishDetails = await dishesAPI.getDish(dish_id);
  // console.log(`dishDetails`, dishDetails);
  return dishDetails.data;
}

export async function fetchAllDishesIDs() {
  const allDishIDs = await dishesAPI.fetchAllDishesIDs();
  console.log(`allDishIDs`, allDishIDs)
  return allDishIDs //returns array of each collection in dishes model including _id
}