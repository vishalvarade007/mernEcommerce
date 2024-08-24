import React, { Fragment, useEffect, useState } from 'react';
import { DataGrid } from "@mui/x-data-grid";
import "./ProductReviews.css";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, deleteReviews, getAllReviews } from "../../Actions/productAction";
import { useAlert } from "react-alert";
import { Button } from '@mui/material';
import { Star, Delete } from "@mui/icons-material";
import { Sidebar } from "./Sidebar";
import { Metadata } from "../layout/Metadata";
import { DELETE_REVIEW_RESET } from '../../Constants/productConstants';

export function ProductReviews() {
  const dispatch = useDispatch();
  const alert = useAlert();
  const path = useNavigate();
  const { error: deleteError, isDeleted } = useSelector((state) => state.reviews);
  const { error, reviews, loading } = useSelector((state) => state.productReviews);

  const [productId, setProductId] = useState("");


  const deleteReviewHandler = (reviewId) => {
    dispatch(deleteReviews(reviewId,productId));
  }

  const productReviewsSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(getAllReviews(productId));
  };

  useEffect(() => {
    if (productId.length === 24) {
      dispatch(getAllReviews(productId));
    }
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      alert.success("Review deleted successfully");
      path("/admin/reviews");
      dispatch({ type: DELETE_REVIEW_RESET });
    }
    

  }, [error, alert, dispatch, deleteError, isDeleted, path,productId]);


  const columns = [
    {
      field: "id",
      headerName: "Review Id",
      minWidth: 200,
      flex: 0.5
    },
    {
      field: "user",
      headerName: "User",
      minWidth: 200,
      flex: 0.6,
    },
    {
      field: "comment",
      headerName: "Comment",
      type: "numnber",
      minWidth: 350,
      flex: 1
    },
    {
      field: "rating",
      headerName: "Rating",
      type: "number",
      minWidth: 180,
      flex: 0.4,
      cellClassName: (params) => {
        return params.row.rating >= 3 ? "greenColor" : "redColor";
      }
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 0.3,
      headerAlign: "center",
      align: "center",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
            <Button onClick={() => deleteReviewHandler(params.id)}>
              <Delete />
            </Button>
          </Fragment>
        )
      }
    }
  ];

  const rows = [];
  reviews && console.log(reviews[0]);
  reviews && reviews.forEach((item) => {
    rows.push({
      id: item._id,
      rating: item.rating,
      comment: item.comment,
      user: item.name
    })
  });


  return (
    <Fragment>
      <Metadata title={"All Reviews - Admin"} />
      <div className='dashboard'>
        <Sidebar />
        <div className='productReviewsContainer'>
         
            <form className='productReviewsForm' onSubmit={productReviewsSubmitHandler}>
            <h1>All Reviews</h1>
            <div>
              <Star />
              <input
                type='text'
                value={productId}
                placeholder='Product Id'
                required
                onChange={(e) => setProductId(e.target.value)}
              />
            </div>

            <Button id="newProductBtn" type="submit" disabled={loading ? true : false || productId === "" ? true : false}>
             Search
            </Button>
          </form>
   
          {reviews && reviews.length > 0 ? (
            <div>
            <DataGrid
            rows={rows}
            columns={columns}
            disableRowSelectionOnClick
            pageSizeOptions={10}
            className='productListTable'
            autoHeight
          />
           </div>
          ) : (
            <h1 className='productReviewsFormHeading'>No Review Found</h1>
          )}
        </div>
        
      </div>
    </Fragment>
  )
}

