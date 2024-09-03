import React, { useRef, Fragment, useEffect } from 'react';
import "./Payment.css";
import { CheckoutSteps } from "./CheckoutSteps";
import { useDispatch, useSelector } from "react-redux";
import { Metadata } from "../layout/Metadata";
import { Typography } from "@mui/material";
import { useAlert } from "react-alert";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { CreditCard, Event, VpnKey } from "@mui/icons-material";
import { createOrder, clearErrors } from "../../Actions/orderAction";
import {BASE_URL} from "../../url";

export function Payment() {
    const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
    const payBtn = useRef(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const alert = useAlert();
    const { shippingInfo, cartItems } = useSelector((state) => state.cart);
    const { user } = useSelector((state) => state.user);
    const { error } = useSelector((state) => state.newOrder);

    const paymentData = {
        amount: Math.round(orderInfo.totalPrice * 100)
    };

    const order = {
        shippingInfo,
        orderItems: cartItems,
        itemsPrice: orderInfo.subtotal,
        taxPrice: orderInfo.tax,
        shippingPrice: orderInfo.shippingCharges,
        totalPrice: orderInfo.totalPrice
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        payBtn.current.disabled = true;
        try {
            const token = localStorage.getItem('jwtToken');
            const config = {
                headers: {
                    "Content-Type": "application/json",
                     Authorization: `Bearer ${token}`
                },
            };
            const { data } = await axios.post(
                `${BASE_URL}/api/v1/payment/process`,
                paymentData,
                config
            );

            const options = {
                key: 'rzp_test_xmBTCvzW5DmUwy', // Entered the Key ID generated from the Dashboard
                amount: data.amount,
                currency: data.currency,
                name: 'EasyCart',
                description: 'Test Transaction',
                order_id: data.order_id,
                handler: function (response) {
                    alert.success("Payment Successful");
                    const paymentResult = {
                        id: response.razorpay_payment_id,
                        status: "succeeded",
                        order_id: response.razorpay_order_id,
                        signature: response.razorpay_signature,
                    };

                    order.paymentInfo = {
                        id: paymentResult.id,
                        status: paymentResult.status,
                    };
                    dispatch(createOrder(order));
                    navigate("/success");
                },
                prefill: {
                    name: user.name,
                    email: user.email,
                    contact: shippingInfo.phoneNo
                },
                notes: {
                    address: shippingInfo.address
                },
                theme: {
                    color: "#F37254"
                }
            };

            const rzp1 = new window.Razorpay(options);
            rzp1.on('payment.failed', function (response) {
                alert.error(response.error.description);
                payBtn.current.disabled = false;
            });
            rzp1.open();
        } catch (error) {
            payBtn.current.disabled = false;
            alert.error(error.message);
        }
    };


    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
    }, [dispatch, alert, error]);

    return (
        <Fragment>
            <Metadata title={"Payment"} />
            <CheckoutSteps activeStep={2} />
            <div className='paymentContainer'>
                <form className='paymentForm' onSubmit={submitHandler}>
                    <Typography>Card Info</Typography>
                    <div>
                        <CreditCard />
                        <input type="text" className='paymentInput' placeholder="Card Number" />
                    </div>
                    <div>
                        <Event />
                        <input type="text" className='paymentInput' placeholder="Card Expiry Date" />
                    </div>
                    <div>
                        <VpnKey />
                        <input type="text" className='paymentInput' placeholder="Card CVC" />
                    </div>
                    <input
                        type="submit"
                        value={`Pay - ₹${orderInfo && orderInfo.totalPrice}`}
                        ref={payBtn}
                        className='paymentFormBtn' />
                </form>
            </div>
        </Fragment>
    );
}
