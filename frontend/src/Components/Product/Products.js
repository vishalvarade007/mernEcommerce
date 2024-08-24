import React, { useEffect, useState } from 'react';
import "./products.css";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, getProduct } from "../../Actions/productAction";
import { Loader } from "../layout/Loader/Loader";
import { ProductCard } from "../Home/ProductCard";
import { useParams } from 'react-router-dom';
import Pagination from "react-js-pagination";
import { Slider } from '@material-ui/core';
import {useAlert} from "react-alert";
import { Typography } from '@material-ui/core';
import { Metadata } from '../layout/Metadata';

const categories = [
   "laptop",
   "footwear",
   "tops",
   "bottom",
   "attire",
   "camera",
   "smartphone"
];

export const Products = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const [currentPage,setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0,100000]);
  const [category, setCategory] = useState("");
  const [ratings,setRatings] = useState(0);

  const setCurrentPageNo = (e)=>{
      setCurrentPage(e);
  };

  const priceHandler = (e,newPrice)=>{
     setPrice(newPrice);
  } 

  const { loading, error, products, resultPerPage, filteredProductsCount } = useSelector((state) => state.products);
  const params = useParams();
  let keyword = params.keyword;
  

  useEffect(() => {
    if(error){
       alert.error(error);
       dispatch(clearErrors());
    }
    dispatch(getProduct(keyword,currentPage,price,category,ratings));
  }, [dispatch,keyword,currentPage,price,category,ratings,alert,error]);

  let count = filteredProductsCount;

  return (
    <>
      {loading ? (<Loader />) : (
        <>
          <Metadata title={"Products --EasyCART"}/>
          <h2 className='productsHeading'>Products</h2>

          <div className='products'>
            {products && products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>

          <div className='filterBox'>
            <Typography>Price</Typography>
            <Slider
              value={price}
              onChange={priceHandler}
              valueLabelDisplay='auto'
              aria-labelledby='range-slider'
              min={0}
              max={100000}/>

              <Typography>Categories</Typography>
              <ul className='categoryBox'>
                {categories.map((category)=>(
                   <li
                      className='category-link'
                      key={category}
                      onClick={()=>setCategory(category)}
                   >{category}</li>
                ))}
              </ul>
              <fieldset>
                <Typography component={"legend"}>Ratings Above</Typography>
                <Slider
                 value={ratings}
                 onChange={(e,newRating)=>{
                    setRatings(newRating);
                 }}
                 aria-labelledby='continuous-slider'
                 min={0}
                 max={5}
                 valueLabelDisplay='auto'
                />
              </fieldset>
          </div>

          {resultPerPage < count && (
            <div className='paginationBox'>
            <Pagination
              activePage={currentPage}
              itemsCountPerPage={resultPerPage}
              totalItemsCount={count}
              onChange={setCurrentPageNo}
              nextPageText={"Next"}
              prevPageText={"Prev"}
              firstPageText={"1st"}
              lastPageText={"Last"}
              itemClass="page-item"
              linkClass="page-link"
              activeClass='pageItemActive'
              activeLinkClass='pageLinkActive'/>
          </div>
          )}
        </>
      )}
    </>
  )
}

