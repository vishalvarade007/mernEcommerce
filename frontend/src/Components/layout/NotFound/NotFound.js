import React from 'react';
import "./NotFound.css";
import {Error} from "@mui/icons-material";
import {Typography} from "@mui/material";
import {Link} from "react-router-dom";

export function NotFound() {
  return (
    <div className='PageNotFound'>
         <Error/>
        <Typography>Page Not Found</Typography>
        <Link to="/">Home</Link>
       
    </div>
  )
}
