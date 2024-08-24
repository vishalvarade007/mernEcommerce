import React from 'react';
import {Rating} from "@mui/material";
import profilepng from "../../Images/prof.png";

export const ReviewCard = ({review}) => {
  const options = {
    value:review.rating,
    readOnly:true,
    precision:0.5,
};
  return (
    <div className='reviewCard'>
      <img src={profilepng} alt={"user"}/>
      <p>{review.name}</p>
      <Rating {...options}/>
      <span className='reviewCardComment'>{review.comment}</span>
    </div>
  )
}


