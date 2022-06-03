import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  orderAlphabetic,
  orderAlphabeticDesc,
  orderScore,
  orderScoreLow,
} from "../actions";
import s from "../styles/Orders.module.css";

const Order = ({ setCurrentPage }) => {
  const [order, setOrder] = useState("A-Z");
  const dispatch = useDispatch();

  
  const handleOrderSubmit = (e) => {
	e.preventDefault();
    if (order === "A-Z") {
      dispatch(orderAlphabetic());
    } else if (order === "Z-A") {
      dispatch(orderAlphabeticDesc());
    } else if (order === "High Score") {
      dispatch(orderScore());
    } else {
      dispatch(orderScoreLow());
    }
    setCurrentPage(1)
  };
  const orders = ["A-Z", "Z-A", "High Score", "Low Score"];
  
  const handleOrderChange = (e) => {
    // setCurrentPage(1); //comportamiento extraño en el ordenamiento
    setOrder(e.target.value);
  };

  return (
    <form className={s.orderContainer} onSubmit={handleOrderSubmit}>
      <select
        className={s.sOrder}
        value={order}
        onChange={handleOrderChange}
        name="order"
      >
        {orders.map((order, i) => (
          <option key={i} value={order}>
            {order}
          </option>
        ))}
      </select>
      <button className={s.button} type="submit" text="Order">
        Order
      </button>
    </form>
  );
};

export default Order;
