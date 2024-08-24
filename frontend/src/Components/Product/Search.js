import React, { useState } from 'react';
import {useNavigate} from "react-router-dom";
import "./search.css";
import { Metadata } from '../layout/Metadata';

export const Search = () => {
    const [keyword,setKeyword] = useState("");
    const path = useNavigate();
    const searchSubmitHandler = (e)=>{
        e.preventDefault();
        if(keyword){
            path(`/products/${keyword}`);
        }else{
            path("/products");
        }
    }
  return (
    <>
    <Metadata title={"Search A Product --EasyCART"}/>
      <form className='searchBox' onSubmit={searchSubmitHandler}>
        <input
         type="text"
         placeholder='Search a product...'
         onChange={(e)=>setKeyword(e.target.value)}
         />
         <input type='submit' value="Search"/>
      </form>
    </>
  )
}


