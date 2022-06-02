import React from "react";
import Card from "./Card";
import Order from "./Order";
import Filter from "./Filter";
import Pagination from "./Pagination";
import s from "../styles/Home.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import { getAllRecipesHome } from "../actions";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import Loader from "./Loader";

export default function Home() {
  const dispatch = useDispatch();
  const allRecipes = useSelector((state) => state.recipesHome);

  const [currentPage, setCurrentPage] = useState(1); //pagina actual
  const [recipePerPage] = useState(9); //recetas por pagina
  const indexOfLastItem = currentPage * recipePerPage; // posicion de la ultima receta ||
  const indexOfFirstItem = indexOfLastItem - recipePerPage;

  const currentRecipes = allRecipes.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => {
    // e.preventDefault()
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    dispatch(getAllRecipesHome());
    console.log("Montaje del componente");
  }, [dispatch]);

  // const handleClick = (e) => {
  //   e.preventDefault();
  //   dispatch(getAllRecipesHome());
  //   setCurrentPage(1);
  // };

  return (
    <div>
      {/*  <Link to={"/recipe"}>
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
      </div> */}

      <Navbar setCurrentPage={setCurrentPage} />
      <SearchBar setCurrentPage={setCurrentPage} />
      <Order setCurrentPage={setCurrentPage} />
      <Filter setCurrentPage={setCurrentPage} />

      <div className={s.cardsContainer}>
        {currentRecipes.length > 0 ? (
          currentRecipes &&
          currentRecipes.map((el) => {
            return (
              <Link key={el.id}to={`/recipes/${el.id}`} className={s.link}>
                <Card
                  key={el.id}
                  // id={el.id}
                  title={el.title}
                  diets={el.diets}
                  image={el.image}
                />
              </Link>
            );
          })
        ) : (
          <div className={s.spinnerContainer}>
            <Loader/>
          </div>
        )}   
      </div>
        <Pagination
          allRecipes={allRecipes.length}
          recipePerPage={recipePerPage}
          paginate={paginate}
        />
    </div>
  );
}
