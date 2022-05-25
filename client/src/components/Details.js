import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRecipeByID } from "../actions";
import { Link, useParams } from "react-router-dom";

export default function Details() {
  const dispatch = useDispatch();
  const details = useSelector((state) => state.recipeID);
  const { id } = useParams();

  useEffect(() => {
    dispatch(getRecipeByID(id));

    //   return () => {
    //     second
    //   }
  }, [dispatch, id]);

  return (
    <>
      <div>
        {/*  {details.length > 0 ? (  */}
        <div>
          <h1>{details.title}</h1>
          <img src={details.image} alt="recipe" />
          <div>
            <h5>Type of diet</h5>
            <h3>
              {details.diets &&
                details.diets.map((el) => el.name.toUpperCase() + " | ")}
            </h3>
          </div>

          <div>
            <h5>Health Score:</h5>
            <h3>{details.healthScore}</h3>
          </div>

          <div>
            <h5>Dish Type</h5>
            <h4>
              {details.dishTypes
                ? details.dishTypes.map((d) => d.name.toUpperCase())
                : "no found"}
            </h4>
          </div>

          <div>
            <h5>Summary</h5>
            <h4>
              <div dangerouslySetInnerHTML={{ __html: details.summary }} />
            </h4>
          </div>

          <h5>Steps:</h5>
          <ul>
            <h4>
              {Array.isArray(details.steps)
                ? details.steps.map((e) =>
                    e.steps.map((f) => (
                      <li key={f.number}>
                        {f.number} - {f.step}
                      </li>
                    ))
                  )
                : details.steps}
            </h4>
          </ul>
        </div>

        {/*   ) : 
            <p>Loading...</p>
            
        }  */}

        <Link to={"/recipes"}>
          <button> Go Back </button>
        </Link>
      </div>
    </>
  );
}
