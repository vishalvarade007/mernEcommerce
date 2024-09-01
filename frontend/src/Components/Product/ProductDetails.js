import React, { useEffect, useState } from 'react';
import "./productDetails.css";
import Carousel from "react-material-ui-carousel";
import {useSelector,useDispatch} from "react-redux";
import {clearErrors, getProductDetails, newReview} from "../../Actions/productAction";
import { useParams } from 'react-router-dom';
import {ReviewCard} from "./ReviewCard";
import {Loader} from "../layout/Loader/Loader";
import {useAlert} from "react-alert";
import { Metadata } from '../layout/Metadata';
import {addItemsToCart} from "../../Actions/cartAction.js";
import {Dialog,DialogActions,DialogContent,DialogTitle,Button} from "@material-ui/core";
import { Rating } from '@mui/material';
import { NEW_REVIEW_RESET } from '../../Constants/productConstants.js';

export function ProductDetails() {
    const dispatch = useDispatch();
    const {id} = useParams();
    const alert = useAlert();

    const {product,loading,error} = useSelector((state)=>state.productDetails);
    const {success,error:reviewError} = useSelector((state)=>state.newReview);
   
    useEffect(()=>{
       if(error){
          alert.error(error);
          dispatch(clearErrors());
       }
       if(reviewError){
        alert.error(reviewError);
        dispatch(clearErrors());
     }
     if(success){
       alert.success("Review submitted successfully");
       dispatch({type:NEW_REVIEW_RESET});
     }
       dispatch(getProductDetails(id));
       window.scrollTo(0,0);
    },[dispatch,id,alert,error,success,reviewError]);

    const options = {
      size:"large",
      value:product.ratings,
      readOnly:true,
      precision:0.5,
  };

    const [quantity, setQuantity] = useState(1);
    const [open, setOpen] = useState(false);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");

    const increaseQuantity = ()=>{
       if(product.Stock <= quantity) return;
       const qty = quantity + 1;
       setQuantity(qty);
    };

    const decreaseQuantity = ()=>{
      if(quantity <= 1) return;
      const qty = quantity - 1;
      setQuantity(qty);
    };

    const addToCart = ()=>{
       dispatch(addItemsToCart(id,quantity));
       alert.success("Item Added to Cart");
    };

    const submitReviewToggle = ()=>{
      open ? setOpen(false):setOpen(true);
    }

    const reviewSubmitHandler = ()=>{
       const myForm = new FormData();
       myForm.set("rating",rating);
       myForm.set("comment",comment);
       myForm.set("productId",id);

       dispatch(newReview(myForm));
       setOpen(false);
    }
    return (
        <>
            {loading ? (<Loader/>):(
              <>
              <Metadata title={`${product.name} --EasyCART`}/>
                <div className='productDetails'>
                <div>
                  <Carousel className='myc'>
                      {product.images &&
                       product.images.map((item,i)=>(
                         <img
                           className='carouselImage'
                           key={i}
                           src={item.url}
                           alt={`${i} Slide`}
                         />
                       ))}
                  </Carousel>
                </div>
                <div>
                    <div className='detailsBlock1'>
                        <h2>{product.name}</h2>
                        <p>Product #{product._id}</p>
                    </div>
                    <div className='detailsBlock2'>
                        <Rating {...options}/>
                        <span className='detailsBlock2-span'>({product.numOfReviews} Reviews)</span>
                    </div>
                    <div className='detailsBlock3'>
                       <h1>{`₹${product.price}`}</h1>
                       <div className='detailsBlock3-1'>
                         <div className='detailsBlock3-1-1'>
                            <button onClick={decreaseQuantity}>-</button>
                            <input readOnly type='number' value={quantity}/>
                            <button onClick={increaseQuantity}>+</button>
                         </div>
                         <button disabled={product.Stock < 1 ? true:false} onClick={addToCart}>Add to Cart</button>
                       </div>
                       <p>
                         Status:
                         <b className={product.Stock < 1 ? "redColor":"greenColor"}>
                          {product.Stock < 1 ? "OutOfStock!":"InStock"}
                         </b>
                       </p>
                    </div>
                    <div className='detailsBlock4'>
                       Description:<p>{product.description}</p>
                       <p style={{color:"red"}}>(Note:Please login before add to cart!)</p>
                    </div>
                    <button onClick={submitReviewToggle} className='submitReview'>Submit Review</button>
                </div>
            </div>
            <h3 className="reviewsHeading">Reviews</h3>

            <Dialog aria-labelledby='simple-dialog-title' open={open} onClose={submitReviewToggle}>
                <DialogTitle>Submit Review</DialogTitle>
                <DialogContent className='submitDialog'>
                  <Rating
                    onChange={(e)=>setRating(e.target.value)} value={rating} size='large'
                   />
                   <textarea className='submitDialogTextArea' cols={30} rows={5} value={comment} onChange={(e)=>setComment(e.target.value)}>
                   </textarea>
                </DialogContent>
                <DialogActions>
                  <Button onClick={submitReviewToggle} color='secondary'>Cancel</Button>
                  <Button onClick={reviewSubmitHandler} color='primary'>Submit</Button>
                </DialogActions>
            </Dialog>

            {product.reviews && product.reviews[0] ? (
              <div className='reviews'>
                 {product.reviews && product.reviews.map((review,i)=>(
                     <ReviewCard review={review} key={i}/>
                 ))}
              </div>
            ):(
              <p className='noReviews'>No Reviews</p>
            )}
              </>
            )}
        </>
    )
}
