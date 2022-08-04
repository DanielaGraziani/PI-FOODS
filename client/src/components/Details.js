import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRecipeByID, deleteRecipe, reset } from "../actions";
import { Link, useParams, useNavigate } from "react-router-dom";
import defaultImg from "../utils/image-not-found.png";
import Loader from "./Loader";
import s from "../styles/Details.module.css";
import logoVeggie from "../utils/veggie.png";
import brocco from "../utils/piece-of-broccoli.png";
import pencil from "../utils/spatula-and-whisk-in-pot.png";

export default function Details() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const details = useSelector((state) => state.recipeID);
  const { id } = useParams();

  useEffect(() => {
    dispatch(getRecipeByID(id));
    return()=>{
      dispatch(reset())
    }
  }, [dispatch, id]);

  const handleDelete = () => {
    dispatch(deleteRecipe(id));
    navigate("/recipes");
  };

  console.log(details.length)

  return (
    <div>
      <div className={s.container}>
        {typeof details.id === "string" && (
          <button onClick={handleDelete} className={s.delete}> <span className={s.iconDelete}>❌</span></button>
        )}
        {
          details.length <= 0 ? (
            <div className={s.spinnerContainer}>
             <Loader/>
            </div>
          ) : (
            //  : details.length > 0 ? (

            <div className={s.container}>
              <p className={s.title}>{details?.title}</p>

              <div>
              <div className={s.imageContainer}>
                {/* {details?.image ? ( */}
                  <img src={details?.image} className={s.img} alt="not found" />
                {/* ) : (
                  <img src={defaultImg} className={s.img} height='350px' alt="default" />
                )} */}
              </div>

              <div className={s.type}>
                {/* <h3 className={s.typeTitle}>Type of Diet</h3> */}
                <h3 className={s.typeItems}>
                  {details.diets && details.diets.map((el) => el.name +  " | ")}
                  {/* <h4 className={s.vegetarian}> */}
                    {details?.vegetarian === true ? "Vegetarian" : " "}
                  {/* </h4> */}
                </h3>
              </div>
              </div>

              <div className={s.upContainer}>
                <div className={s.scoreContainer}>
                  <h5 className={s.score}>Score</h5>
                  <h3>{details?.healthScore}⭐</h3>
                </div>

                {/* <div className={s.dish}>
                  <h5 className={s.dishTitle}>Dish Type</h5>
                  <h4 className={s.dishT}>
                    {details?.dishTypes
                      ? details.dishTypes.map((d) => d.name + " ")
                      : "not found"}
                  </h4>
                </div> */}

              </div>

              <img className={s.logoVeggie} src={logoVeggie} alt="veggie" />

              <div className={s.summaryContainer}>
                <h2 className={s.summaryTitle}>Summary</h2>
                <h4>
                  <div
                    className={s.summaryText}
                    dangerouslySetInnerHTML={{ __html: details?.summary }}
                  />
                </h4>
              </div>

              <img className={s.brocco} src={brocco} alt="broccoli" />

              <div className={s.stepContainer}>
                <h3 className={s.stepTitle}>Steps:</h3>
                <ul>
                  <h4>
                    {Array.isArray(details?.steps)
                      ? details.steps.map((e) =>
                          e.steps.map((f) => (
                            <li className={s.stepItem} key={f.number}>
                              {f.number} - {f.step}
                            </li>
                          ))
                        )
                      : details?.steps}
                  </h4>
                </ul>
              </div>

              <img className={s.pencil} src={pencil} alt="spatula" />
              <Link to={"/recipes"}>
                <button className={s.button}> Go Back </button>
              </Link>
            </div>
          )

          // ) :
          //   <p>Loading...</p>
        }
      </div>
    </div>
  );
}
