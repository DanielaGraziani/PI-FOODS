import React from "react";
import { Link } from "react-router-dom";

export default function Card({ title, diets, image, id }) {
  return (
    <div>
      <div>
        <div>
          <h3>{title}</h3>
        </div>
        <div>
          <img src={image} alt="not found" />
        </div>
        <div>
          {diets.map((e, index) => (
            <h5 key={index} /* className={s.diet} */>{e.name}</h5>
          ))}
        </div>

          <Link key={id} to={`/recipes/${id}`}>
            See more
          </Link>
      </div>
    </div>
  );
}
