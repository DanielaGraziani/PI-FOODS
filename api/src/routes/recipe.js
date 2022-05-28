const { Router } = require("express");
const router = Router();
const { Recipe, Diet } = require("../db"); //importo los modelos

router.post("/", async (req, res, next) => {
  try {
    let { title, summary, healthScore, steps, diets, createInDB } =
      req.body;

    let recipeCreate = await Recipe.create({
      title,
      summary,
      healthScore,
      steps,
      createInDB
    });


    for (let i = 0; i < diets.length; i++) {
      let diet = await Diet.findOne({
        where: { name: diets[i] },
      });

      recipeCreate.addDiet(diet);
    }

    res.status(200).send("recipe created successfully");
  } catch (error) {
    next(error);
  }

});

module.exports = router;
