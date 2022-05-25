import {
  GET_ALL_RECIPES_HOME,
  GET_RECIPE_BY_ID,
  GET_RECIPE_BY_NAME,
  ORDER_ALPHABETIC_ASC,
  ORDER_ALPHABETIC_DES,
  ORDER_BY_HIGH_SCORE,
  // FILTER_RECIPES_BY_DIET,
} from "../actions/types.js";

const initialState = {
  recipesHome: [],
  recipesHomeCopy: [],
  recipeID: [],
  diets:[]
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_RECIPES_HOME:
      return {
        ...state,
        recipesHome: action.payload,
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


    case ORDER_ALPHABETIC_ASC:
      let orderRecipes =
        action.payload === "A-Z"
        ?
              state.recipesHome.sort((a, b) => {
                if(a.title.toLowerCase() > b.title.toLowerCase()) return 1
                if (b.title.toLowerCase() > a.title.toLowerCase()) return -1
                return 0
            })

          : state.recipesHome.sort((a, b) => {
              if(a.title.toLowerCase() < b.title.toLowerCase()) return 1
              if(b.title.toLowerCase() < a.title.toLowerCase()) return -1
              return 0

            })

      return {
        ...state,
        recipesHome:
          action.payload === "default" ? state.recipesHome : orderRecipes,
      };

    // case ORDER_ALPHABETIC_ASC:
    //   let ascAlphabet =  state.recipesHome
    //     .slice()
    //     .sort((a, b) => {
    //       const first = a.title.toLoweCase();
    //       const second = b.title.toLowerCase();

    //       if (first < second) {
    //         return -1;
    //       } else if (second > first) {
    //         return 1;
    //       } else {
    //         return 0;
    //       }
    //     })
    //     .reverse();
    //   return {
    //     ...state,
    //     recipesHome: ascAlphabet,
    //   };

    // case ORDER_ALPHABETIC_DES:
    //   let descAlphabet = state.recipesHome
    //     .slice()
    //     .sort((a, b) => {
    //       const first = a.title.toLoweCase();
    //       const second = b.title.toLowerCase();

    //       if (first < second) {
    //         return -1;
    //       } else if (second > first) {
    //         return 1;
    //       } else {
    //         return 0;
    //       }
    //     })
    //     .reverse();
    //   return {
    //     ...state,
    //     recipesHome: descAlphabet,
    //   };


    case ORDER_BY_HIGH_SCORE:
      let orderScore =
        action.payload === "Desc"
          ? state.recipesHome.sort((a, b) => a.healthScore - b.healthScore)
          : state.recipesHome.sort((a, b) => b.healthScore - a.healthScore);

      return {
        ...state,
        recipesHome: action.payload === "All" ? state.recipesHome : orderScore,
      };

    default:
      return state;
  }
};

export default rootReducer;
