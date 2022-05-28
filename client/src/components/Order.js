// import React, { useState } from "react";
// import { useDispatch } from "react-redux";
// import {
//   orderAlphabetic,
//   orderAlphabeticDesc,
//   orderScore,
//   orderScoreLow,
// } from "../actions";

// export default function Order() {
//   const [value, setValue] = useState("A-Z");
//   const dispatch = useDispatch();

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     value === "A-Z"
//       ? dispatch(orderAlphabetic())
//       : value === "Z-A"
//       ? dispatch(orderAlphabeticDesc())
//       : value === "High Score"
//       ? dispatch(orderScore())
//       : value === "Low Score"
//       ? dispatch(orderScoreLow())
//       : console.log("Invalid");
//   };

//   const values = ["A-Z", "Z-A", "High Score", "Low Score"];

//   const handleChange = (e) => {
//     setValue(e.target.value);
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <select value={value} onChange={handleChange} name="value">
//         {values.map((value, i) => (
//           <option key={i} value={value}>
//             {value}
//           </option>
//         ))}
//       </select>
//       <button type="submit" text="Order">
//         Order
//       </button>
//     </form>
//   );
// }

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { orderAlphabetic, orderAlphabeticDesc, orderScore, orderScoreLow} from '../actions'

const Order = ({setCurrentPage}) => {
	const [order, setOrder] = useState('A-Z');
	const dispatch = useDispatch();

	const handleOrderSubmit = (e) => {
		e.preventDefault();
		if (order === 'A-Z') {
			dispatch(orderAlphabetic());
		} else if (order === 'Z-A') {
			dispatch(orderAlphabeticDesc());
		} else if (order === 'High Score') {
			dispatch(orderScore());
		} else {
			dispatch(orderScoreLow());
		}
	};
	const orders = [
		'A-Z',
		'Z-A',
		'High Score',
		'Low Score',
	];
	const handleOrderChange = (e) => {
		setOrder(e.target.value);
		setCurrentPage(1); 
	};
	return (
		<form onSubmit={handleOrderSubmit} >
			<select value={order} onChange={handleOrderChange} name='order'>
				{orders.map((order, i) => (
					<option key={i} value={order}>
						{order}
					</option>
				))}
			</select>
			<button type='submit' text='Order'>Send</button>
		</form>
	);
};

export default Order;
