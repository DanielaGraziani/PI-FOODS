const { Router } = require("express");
const router = Router();
const { Diet } = require("../db"); //importo los modelos
const { route } = require("./recipes");

// router.get("/", async (req, res, next) => {
//   try {
//     const diets = [
//       "Gluten Free",
//       "Dairy Free",
//       "Lacto Ovo Vegetarian",
//       "Vegan",
//       "Paleolithic",
//       "Primal",
//       "Whole30",
//       "Pescetarian",
//       "Vegetarian",
//       "Low FODMAP",
//       "Ketogenic",
//     ];

//     /* Creating a new diet if it doesn't exist. */
//     diets.forEach((el) => {
//       Diet.findOrCreate({
//         where: { name: el }, //por cada tipo de dieta
//       });
//     });

//     /* A way to make sure that all the diets are created before sending the response. */
//     let allTypes = await Diet.findAll();
//     while (allTypes.length !== diets.length) allTypes = await Diet.findAll();
//     res.send(allTypes);

//     } catch (error) {
//     next(error);
//   }

// });

router.get("/", async (req, res, next) => {
  try {
    const getDiet = await Diet.findAll();
    if (getDiet.length) {
      return res.status(200).json(getDiet);

    } else {
      try {
        await Diet.bulkCreate([
          "Gluten Free",
          "Dairy Free",
          "Lacto Ovo Vegetarian",
          "Vegan",
          "Paleolithic",
          "Primal",
          "Whole30",
          "Pescetarian",
          "Vegetarian",
          "Low FODMAP",
          "Ketogenic",
        ]);
      } catch (err) {
        console.error(err);
      }
      const getDietbk = await Diet.findAll();
      return res.status(200).json(getDietbk);
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
