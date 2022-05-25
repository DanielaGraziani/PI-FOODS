//  import axios from "axios";

import { GET_ALL_RECIPES_HOME, GET_RECIPE_BY_ID, GET_RECIPE_BY_NAME, ORDER_ALPHABETIC_ASC, ORDER_ALPHABETIC_DES, ORDER_BY_HIGH_SCORE } from "./types";

export const getAllRecipesHome = () => (dispatch) => {
  return fetch("http://localhost:3001/recipes")
    .then((response) => response.json())
    .then((json) => {
      dispatch({
        type: GET_ALL_RECIPES_HOME,
        payload: json
      });
    })
    .catch((error) => console.error(error));
};

export const getRecipeByID = (id) => (dispatch)=> {
 return fetch("http://localhost:3001/recipes/" + id)
 .then((response)=> response.json())
 .then((json)=>{
   dispatch({
     type: GET_RECIPE_BY_ID, 
     payload: json
   })
 }).catch((error)=> console.error(error))
}

export const getRecipeByName = (name) => (dispatch)=>{
  return fetch ("http://localhost:3001/recipes?name=" + name)
  .then((response)=> response.json())
  .then((json)=>{
    dispatch({
      type: GET_RECIPE_BY_NAME,
      payload: json
    })
  }).catch((error)=> console.error(error))

}

// export function getRecipeByName(name) {
//   return async function (dispatch) {
//     try {
//       const json = await axios.get(
//         "http://localhost:3001/recipes?name=" + name
//       );
//       return dispatch({
//         type: GET_RECIPE_BY_NAME,
//         payload: json.data,
//       });
//     } catch (error) {
//       alert("This recipe doesn't exist");
//     }
//   };
// }

export const orderAlphabetic=(payload)=>{
  return {
    type: ORDER_ALPHABETIC_ASC,
    payload,
  }
}

export const orderAlphabeticDesc=(payload)=>{
  return {
    type: ORDER_ALPHABETIC_DES,
    payload,
  }
}

export const orderScore = (payload) =>{
 return {
   type: ORDER_BY_HIGH_SCORE,
   payload,
 }
}

// export const filterRecipesByDiet = (payload)=>{
//   return{
//     type: FILTER_RECIPES_BY_DIET,
//     payload,
//   }
// }