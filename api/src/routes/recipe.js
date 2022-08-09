const { Router } = require("express");
const router = Router();
const { Recipe, Diet } = require("../db"); //importo los modelos

router.post("/", async (req, res, next) => {
  try {
    let { title, summary, healthScore, steps, readyInMinutes, servings, diets } = req.body;

    let recipeCreate = await Recipe.create({
      title,
      summary,
      healthScore,
      steps,
      readyInMinutes,
      servings,
    });

    for (let i = 0; i < diets.length; i++) {
      //devuelvo un array con la variable dietas (contiene los datos encontrados o recien creados) y la variable created (es un booleano que indica si es creado o no)
      let [diet, created] = await Diet.findOrCreate({
        where: {
          name: diets[i],
        },
      });

     recipeCreate.addDiet(diet);
    }

    res.status(200).send("recipe created successfully");
  } catch (error) {
    next(error);
  }
});

module.exports = router;
