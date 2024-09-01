import React, { Fragment } from 'react';
import "./ConfirmOrder.css";
import {Link, useNavigate} from "react-router-dom";
import {Typography} from "@mui/material";
import {useSelector} from "react-redux";
import {CheckoutSteps} from "./CheckoutSteps";
import {Metadata} from "../layout/Metadata";

export function ConfirmOrder() {
    const {shippingInfo,cartItems} = useSelector((state)=>state.cart);
    const {user} = useSelector((state)=>state.user);
    const path = useNavigate();
    
    const subtotal = cartItems.reduce(
        (acc,item)=> acc + item.quantity * item.price,
        0
    )

    const shippingCharges = subtotal > 1000 ? 0 : 200;
    const tax = subtotal * 0.18;
    const totalPrice = (subtotal + shippingCharges + tax).toFixed(2);

    const address = `${shippingInfo.address},${shippingInfo.city},${shippingInfo.state},${shippingInfo.pinCode},${shippingInfo.country}`;

    const ProceedToPayment = ()=>{
      const data = {
        subtotal,
        tax,
        shippingCharges,
        totalPrice
     };

     sessionStorage.setItem('orderInfo',JSON.stringify(data));
     path("/process/payment");
    }
    return (
    <Fragment>
      <Metadata title={"Confirm Order"}/>
      <CheckoutSteps activeStep={1}/>
      <div className='confirmOrderPage'>
        <div>
           <div className='confirmShippingArea'>
               <Typography>Shipping Info</Typography>
               <div className='confirmShippingAreaBox'>
                  <div>
                     <p>Name:</p>
                     <span>{user.name}</span>
                  </div>
                  <div>
                     <p>Phone No:</p>
                     <span>{shippingInfo.phoneNo}</span>
                  </div>
                  <div>
                     <p>Address:</p>
                     <span>{address}</span>
                  </div>
               </div>
               <div className='confirmCartItems'>
                 <p className='cartTitle'>Your Cart Items</p>
                 <div className='confirmCartItemsContainer'>
                    {cartItems && cartItems.map((item)=>(
                        <div key={item.product}>
                            <img src={item.image} alt="product"/>
                            <Link to={`/product/${item.product}`}>{item.name}</Link>
                            <span>
                                {item.quantity} X ₹{item.price} {" = "}
                                <b>₹{item.quantity * item.price}</b>
                            </span>
                        </div>
                    ))}
                 </div>
               </div>
           </div>
        </div>
        {/* */}
        <div>
          <div className='orderSummary'>
            <Typography>Order Summary</Typography>
            <div>
                <div>
                    <p>Subtotal</p>
                    <span>₹{subtotal}</span>
                </div>
                <div>
                    <p>Shipping Charges</p>
                    <span>₹{shippingCharges}</span>
                </div>
                <div>
                    <p>GST</p>
                    <span>₹{tax}</span>
                </div>
            </div>
            <div className='orderSummaryTotal'>
                <p> <b>Total:</b> </p>
                <span>₹{totalPrice}</span>
            </div>
            <button onClick={ProceedToPayment}>Proceed To Payment</button>
          </div>
        </div>
      </div>
    </Fragment>
  )
}
