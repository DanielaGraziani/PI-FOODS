import React from "react";
import { Link } from "react-router-dom";
import defaultImg from '../utils/ratta.jpg'

export default function Card({ title, diets, image, id }) {
  return (
    <div>
      <div>
        <div>
          <h3>{title.toUpperCase()}</h3>
        </div>
        <div>
          {/* <img src={image} alt="not found" /> */}
          {image ? (<img src={image} alt='not found'/>) : (<img src={defaultImg} width='300px' alt="default"/>)}
        </div>
        <div>
          {diets.map((e, index) => (
            <h5 key={index}>{e.name ? e.name.toUpperCase() : e.toUpperCase()}</h5>
          ))}
        </div>

          <Link key={id} to={`/recipes/${id}`}>
            See more
          </Link>
      </div>
    </div>
  );
}
