import React from 'react';
import "./Cart.css";
import { CartItemCard } from "./CartItemCard";
import { useDispatch, useSelector } from "react-redux";
import { addItemsToCart, removeItemsFromCart } from "../../Actions/cartAction";
import {RemoveShoppingCart} from "@mui/icons-material";
import { Typography } from '@mui/material';
import { Link ,useNavigate} from 'react-router-dom';
import { Metadata } from '../layout/Metadata';

export function Cart() {
  const dispatch = useDispatch();
  const path = useNavigate();
  const { cartItems } = useSelector((state) => state.cart);
  const increaseQuantity = (id, quantity, stock) => {
    let newQty = quantity + 1;
    if (quantity >= stock) {
      return;
    }
    dispatch(addItemsToCart(id, newQty));
  }
  const decreaseQuantity = (id, quantity) => {
    let newQty = quantity - 1;
    if (quantity <= 1) {
      return;
    }
    dispatch(addItemsToCart(id, newQty));
  }

  const deleteCartItems = (id) => {
    dispatch(removeItemsFromCart(id));
  }

  const checkoutHandler = ()=>{
      path("/login?redirect=/shipping");
  }
  return (
    <>
    <Metadata title={"Your Cart"}/>
      {cartItems.length === 0 ? (
        <div className='emptyCart'>
            <RemoveShoppingCart/>
            <Typography>No Products in Your Cart</Typography>
            <Link to="/products">View Products</Link>
        </div>
      ):
        <>
          <div className='cartPage'>
            <div className='cartHeader'>
              <p>Product</p>
              <p>Quantity</p>
              <p>Subtotal</p>
            </div>
            {cartItems && cartItems.map((item) => (
              <div className='cartContainer' key={item.product}>
                <CartItemCard item={item} deleteCartItems={deleteCartItems} />
                <div className='cartInput'>
                  <button onClick={() => {decreaseQuantity(item.product, item.quantity)}}>-</button>
                  <input readOnly type='number' value={item.quantity} />
                  <button onClick={() => {increaseQuantity(item.product, item.quantity, item.stock)}}>+</button>
                </div>
                <p className='cartSubtotal'>{`₹${item.price * item.quantity}`}</p>
              </div>
            ))}
            <div className='cartGrossTotal'>
              <div></div>
              <div className='cartGrossTotalBox'>
                <p>Gross Total</p>
                <p>{`₹${cartItems.reduce(
                  (acc,item)=>acc + item.quantity * item.price,
                  0
                )}`}</p>
              </div>
              <div></div>
              <div className='checkoutBtn'>
                <button onClick={checkoutHandler}>Checkout</button>
              </div>
            </div>
          </div>
        </>
      }
    </>
  )
}
