import {
  GET_ALL_RECIPES_HOME,
  GET_RECIPE_BY_ID,
  GET_RECIPE_BY_NAME,
  ORDER_ALPHABETIC_ASC,
  ORDER_ALPHABETIC_DES,
  ORDER_BY_HIGH_SCORE,
  ORDER_BY_LOW_SCORE,
  FILTER_RECIPES_BY_DIET,
  GET_TYPES_OF_DIET,
  POST_RECIPE,
} from "../actions/types.js";

const initialState = {
  recipesHome: [],
  recipesHomeCopy: [],
  recipeID: [],
  diets: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_RECIPES_HOME:
      return {
        ...state,
        recipesHome: action.payload,
        recipesHomeCopy: action.payload,
      };

    case GET_RECIPE_BY_ID:
      return {
        ...state,
        recipeID: action.payload,
      };

    case GET_RECIPE_BY_NAME:
      return {
        ...state,
        recipesHome: action.payload,
      };

    case GET_TYPES_OF_DIET:
      return {
        ...state,
        diets: action.payload,
      };

    case POST_RECIPE:
      return {
        ...state,
      };

    //^FORMATO COMUN

    // case ORDER_ALPHABETIC_ASC:
    //   let orderRecipes =
    //     action.payload === "A-Z"
    //     ?
    //           state.recipesHome.sort((a, b) => {
    //             if(a.title.toLowerCase() > b.title.toLowerCase()) return 1
    //             if (b.title.toLowerCase() > a.title.toLowerCase()) return -1
    //             return 0
    //         })

    //       : state.recipesHome.sort((a, b) => {
    //           if(a.title.toLowerCase() < b.title.toLowerCase()) return 1
    //           if(b.title.toLowerCase() < a.title.toLowerCase()) return -1
    //           return 0

    //         })

    //   return {
    //     ...state,
    //     recipesHome:
    //       action.payload === "default" ? state.recipesHome : orderRecipes,
    //   };

    //^FORMATO DE PRUEBA

    // case ORDER_ALPHABETIC_ASC:
    //   let orderRecipes = action.payload === 'A-Z'
    //   if(orderRecipes){
    //     state.recipesHome.sort((a, b)=>{
    //       if(a.title.toLowerCase() > b.title.toLowerCase()) return 1
    //       if(b.title.toLowerCase() > a.title.toLowerCase()) return -1
    //       return 0
    //     })
    //   }

    //   return {
    //     ...state,
    //     recipesHome: action.payload === "All" ? state.recipesHome : orderRecipes
    //   }

    //   case ORDER_ALPHABETIC_DES:
    //   let orderRecipesDes = action.payload === 'Z-A'
    //   if(orderRecipes){
    //     state.recipesHome.sort((a, b)=>{
    //       if(a.title.toLowerCase() < b.title.toLowerCase()) return 1
    //       if(b.title.toLowerCase() < a.title.toLowerCase()) return -1
    //       return 0
    //     })
    //   }

    //   return {
    //     ...state,
    //     recipesHome: action.payload === "All" ? state.recipesHome : orderRecipesDes
    //   }

    /* modificar eventualmente los recipes recipesHome * recipesHomeCopy */

    //^ ORDEEER A-Z

    case ORDER_ALPHABETIC_ASC:
      let ascAlphabet = [...state.recipesHome];

      let orderAsc = ascAlphabet.sort((a, b) => {
        if (a.title.toLowerCase() < b.title.toLowerCase()) {
          return -1;
        } else if (a.title.toLowerCase() > b.title.toLowerCase()) {
          return 1;
        } else {
          return 0;
        }
      });
      return {
        ...state,
        recipesHome: orderAsc,
      };

    case ORDER_ALPHABETIC_DES:
      let descAlphabet = [...state.recipesHome];
      let orderDesc = descAlphabet.sort((a, b) => {
        if (a.title.toLowerCase() > b.title.toLowerCase()) {
          return -1;
        } else if (a.title.toLowerCase() < b.title.toLowerCase()) {
          return 1;
        } else {
          return 0;
        }
      });

      return {
        ...state,
        recipesHome: orderDesc,
      };

    //^ORDEEER SCOOOOORE

    case ORDER_BY_HIGH_SCORE:
      let orderScore = state.recipesHome.slice().sort((a, b) => {
        // const high = a.healthScore
        // const low = b.healthScore

        if (b.healthScore < a.healthScore) {
          return -1;
        } else if (a.healthScore > b.healthScore) {
          return 1;
        } else {
          return 0;
        }
      });

      return {
        ...state,
        recipesHome: orderScore,
      };

    case ORDER_BY_LOW_SCORE:
      let LowOrderScore = state.recipesHome.slice().sort((a, b) => {
        // const high = a.healthScore
        // const low = b.healthScore

        if (a.healthScore < b.healthScore) {
          return -1;
        } else if (b.healthScore > a.healthScore) {
          return 1;
        } else {
          return 0;
        }
      });

      return {
        ...state,
        recipesHome: LowOrderScore,
      };

    //^FILTRADOOOOOOOOOOOOOOOOOOOOOOOOO

    case FILTER_RECIPES_BY_DIET:
      const recipes = state.recipesHomeCopy;
      const dietsdb =
        action.payload === "default"
          ? recipes
          : recipes.filter((el) => {
              let db = el.diets.map((d) => d.name);
              // let api= el.diets.map(d=> d)
              if (
                db.includes(action.payload) /* api.includes(action.payload) */
              ) {
                return el;
              }
              
            });

      //en recipes guardo todas las recetas
      //filtro cada una de las recetas, y guardo en dos variables las coincidencia con las dietas las que tienen un name (db )y las no

      const dietsApi =
        action.payload === "default"
          ? recipes
          : recipes.filter((el) => {
              let diet = el.diets.map((d) => d);
              if (diet.includes(action.payload)) {
                return el;
              }
              
            });

      let dietsFiltered = dietsApi.concat(dietsdb);

      const dataArr = new Set(dietsFiltered);

      let result = [...dataArr];

      return {
        ...state,
        recipesHome: result,
      };

    // case FILTER_RECIPES_BY_DIET:
    //   const allRecipes = state.recipesHomeCopy

    //   let apiDiets = action.payload === 'default' ? allRecipes : allRecipes.filter((el)=> el.diets.includes(action.payload))

    //   // let dietsDb = allRecipes.filter

    //   // const recipeDB = allRecipes.filter((el) => el.createInDB);
    //   // const filterRecipeDB = recipeDB.filter((el) => el.diets.name === action.payload )

    //   let dbDiets= allRecipes.filter((el)=> el.createInDB && el.createInDB.includes(action.payload))

    //   let dietsFiltered= apiDiets.concat(dbDiets)

    // return{
    //   ...state,
    //   recipesHome: dietsFiltered
    // }

    default:
      return state;
  }
};

export default rootReducer;
