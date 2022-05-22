require("dotenv").config();
const { Router } = require("express");
const axios = require("axios");
const { API_KEY } = process.env;
const router = Router();
const { getAllRecipes, getDataFromApi } = require("./controller");
const { Recipe, Diet } = require("../db");

// router.get("/", async (req, res, next) => {
//   const { name } = req.query;
//   const allRecipes = await getAllRecipes(); //recetas traidas de la base de datos y la api

//   try {

//     if (name) {
//       let recipesName = await allRecipes.filter((e) =>
//         e.name.toLowerCase().includes(name.toLowerCase())
//       ); //si el nombre ingresado por query coindice con el nombre de alguna receta (title) 200 : 404
//       recipesName.length
//         ? res.status(200).send(recipesName)
//         : res.status(404).send("recipe not found");
//     } else {
//       res.status(200).send(allRecipes); // si no se ingresa nombre por defecto se muestra la lista completa de recetas
//     }
//     console.log(name);
//   } catch (error) {
//     next(error);
//   }
// });

router.get("/", async (req, res, next) => {
  const { name } = req.query;
  const allRecipes = await getAllRecipes(); //100 recetas traidas de la base de datos y la api

 try {
   
  if (name) {
    const recipesName = await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true`
    );
    const recipesNameFilter = await recipesName.data.results.filter((e) =>
      e.title.toLowerCase().includes(name.toLowerCase())
    );

    recipesNameFilter.length
      ? res.status(200).send(recipesNameFilter)
      : res.status(404).send("recipe not found");

  } else {
    res.status(200).send(allRecipes);
  }

 } catch (error) {
   next(error)
 } 
});





router.get("/:id", async (req, res, next) => {
  const { id } = req.params;

  try {
    if (id.length === 36) {
      const recipeIDFromDB = await Recipe.findByPk(id, {
        include: {
          model: Diet,
          attributes: ["name"],
          through: {
            attributes: [],
          },
        },
      });

      return recipeIDFromDB
        ? res.status(200).json(recipeIDFromDB)
        : res.status(400).send("id not found in the database");
    } else {
      const { data } = await axios.get(
        `https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`
      );
      return res.json({
        image: data.image,
        title: data.title,
        summary: data.summary,
        spoonacularScore: data.spoonacularScore,
        healthScore: data.healthScore,
        steps: data.analyzedInstructions,
        diets: data.diets.map((diet) => {
          return { name: diet };
        }),
      });
    }
  } catch (error) {
    next(error);
    res.status(404).send("id not found");
  }
});

module.exports = router;
