import React from 'react';
import "./OrderSuccess.css";
import {Link} from "react-router-dom";
import {Typography} from "@mui/material";
import {CheckCircle} from "@mui/icons-material";

export function OrderSuccess() {
  return (
    <div className='orderSuccess'>
       <CheckCircle/>
       <Typography>Your Order has been Placed Successfully</Typography>
       <Link to={"/orders"}>View Orders</Link>
    </div>
  )
}
