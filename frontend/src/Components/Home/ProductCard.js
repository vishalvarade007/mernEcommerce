import React from 'react';
import {Link} from "react-router-dom";
import {Rating} from "@mui/material";
export function ProductCard({product}) {
  const options = {
    value:product.ratings,
    readOnly:true,
    precision:0.5,
};
  return (
    <Link className='productCard' to={`/myproduct/${product._id}`}>
       <img src={product.images && product.images[0].url} alt={product.name} />
       <p>{product.name}</p>
       <div>
          <Rating {...options}/><span className='productCardspan'>({product.numOfReviews} Reviews)</span>
       </div>
       <span>{`₹${product.price}`}</span>
    </Link>
  )
}
