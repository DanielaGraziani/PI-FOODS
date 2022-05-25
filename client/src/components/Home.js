import React, { useState } from "react";
import Card from "./Card";
// import s from "../styles/Home.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import SearchBar from "../components/SearchBar";
import { getAllRecipesHome, orderAlphabetic, orderScore } from "../actions";
import { Link } from "react-router-dom";

export default function Home() {
  const dispatch = useDispatch();
  const allRecipes = useSelector((state) => state.recipesHome);

  const [orderAlpha, setOrderAlphabetic] = useState("");
  const [orderScor, setOrderScore] = useState("");

  useEffect(() => {
    dispatch(getAllRecipesHome());
    console.log("Montaje del componente");
  }, [dispatch]);

  const handleClick = (e) => {
    e.preventDefault();
    dispatch(getAllRecipesHome());
  };

  const handleSelectByName = (e) => {
    e.preventDefault();
    dispatch(orderAlphabetic(e.target.value));
    setOrderAlphabetic("Order" + e.target.value);
  };

  const handleSelectByScore = (e) => {
    e.preventDefault();
    dispatch(orderScore(e.target.value));
    setOrderScore("Order" + e.target.value);
  };

  return (
    <>
      <SearchBar />

      <Link to={"/recipe"}>
        <button>Create your own recipe!</button>
      </Link>

      <div>
        <button
          onClick={(e) => {
            handleClick(e);
          }}
        >
          Reset
        </button>
      </div>


      <div>
        <h3>Order By Name</h3>
        <select
          /* className={s.sOrder} */ onChange={(e) => handleSelectByName(e)}
        >
          <option value="default">All</option>
          <option value="A-Z"> A-Z</option>
          <option value="Z-A">Z-A</option>
        </select>

        <h3>Order By Score</h3>
        <select
          /* className={s.sOrder} */ onChange={(e) => handleSelectByScore(e)}
        >
          <option value="All">All</option>
          <option value="Asc"> High </option>
          <option value="Desc"> Low </option>
        </select>
      </div>


      <div>
        {allRecipes.length > 0 ? (
          allRecipes &&
          allRecipes.map((el) => {
            return (
              <Card
                key={el.id}
                id={el.id}
                title={el.title}
                diets={el.diets}
                image={el.image}
              />
            );
          })
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </>
  );
}
