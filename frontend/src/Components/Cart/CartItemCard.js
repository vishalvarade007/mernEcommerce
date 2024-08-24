import React from 'react';
import "./CartItemCard.css";
import {Link} from "react-router-dom";

export function CartItemCard({item,deleteCartItems}) {
  return (
    <div className='cartItemCard'>
       <img src={item.image} alt={item.name}/>
       <div>
        <Link to={`/products/${item.product}`}>{item.name}</Link>
        <span>{`Price : ₹${item.price}`}</span>
        <p onClick={()=>deleteCartItems(item.product)}>Remove</p>
       </div>
    </div>
  )
}
