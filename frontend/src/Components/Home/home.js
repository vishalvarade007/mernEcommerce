import React, { useEffect } from 'react';
import { CgMouse } from "react-icons/cg";
import "./home.css";
import { ProductCard } from "./ProductCard.js";
import { Metadata } from "../layout/Metadata.js";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProduct } from "../../Actions/productAction.js";
import { Loader } from '../layout/Loader/Loader.js';
import {useAlert} from "react-alert";

export function Home() {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, error, products } = useSelector((state) => state.products);

  useEffect(() => {
    if(error){
       alert.error(error);
       dispatch(clearErrors());
    }
    dispatch(getProduct());
  }, [dispatch,error,alert]);

  return (
    <>
      {loading ? <Loader/>:
        <>
          <Metadata title={"EasyCART"} />
          <div className='banner'>
            <p>Welcome to EasyCART</p>
            <h1>FIND AMAZING PRODUCTS BELOW</h1>

            <a href='#container'>
              <button>
                Scroll <CgMouse />
              </button>
            </a>
          </div>
          <h2 className='homeHeading'>Featured Products</h2>
          <div className='container' id='container'>
            {products && products.map((product,i) => (
              <ProductCard product={product} key={i}/>
            ))}
          </div>
        </>
      }
    </>
  )
}
