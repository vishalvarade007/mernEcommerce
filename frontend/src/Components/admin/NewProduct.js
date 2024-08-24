import React,{useEffect,useState,Fragment} from 'react';
import "./NewProduct.css";
import {Metadata} from "../layout/Metadata";
import {useNavigate} from "react-router-dom";
import {useSelector,useDispatch} from "react-redux";
import {clearErrors,createProduct} from "../../Actions/productAction";
import {NEW_PRODUCT_RESET} from "../../Constants/productConstants";
import {useAlert} from "react-alert";
import {Button} from "@mui/material";
import {Sidebar} from "./Sidebar";
import {AccountTree,Description,AttachMoney,Storage,Spellcheck} from "@mui/icons-material";

export function NewProduct() {
    const categories = [
        "laptop",
        "footwear",
        "tops",
        "bottom",
        "attire",
        "camera",
        "smartphone"
     ];
     const dispatch = useDispatch();
     const alert = useAlert();
     const path = useNavigate();

     const {error,loading,success} = useSelector((state)=>state.newProduct);

     useEffect(()=>{
       if(error){
        alert.error(error);
        dispatch(clearErrors());
       }
       if(success){
        alert.success("Product created successfully");
        path("/admin/dashboard");
        dispatch({type:NEW_PRODUCT_RESET});
       }
     },[alert,error,dispatch,success,path]);

     const [name,setName] = useState("");
     const [price,setPrice] = useState(0);
     const [description,setDescription] = useState("");
     const [stock,setStock] = useState(0);
     const [category,setCategory] = useState("");
     const [images,setImages] = useState([]);
     const [imagesPreview,setImagesPreview] = useState([]);

     const createProductSubmitHandler = (e)=>{
         e.preventDefault();

         const myForm = new FormData();

         myForm.set("name",name);
         myForm.set("price",price);
         myForm.set("description",description);
         myForm.set("category",category);
         myForm.set("stock",stock);

         images.forEach((image)=>{
           myForm.append("images",image);
           console.log(image,"img");
         });

         dispatch(createProduct(myForm));
     };

     const createProductImagesChange = (e) => {
      const files = Array.from(e.target.files);
     console.log(files,"files");
      setImages([]);
      setImagesPreview([]);
    
      files.forEach((file) => {
        const reader = new FileReader();
    
        reader.onload = () => {
          if (reader.readyState === 2) {
            setImagesPreview((old) => [...old, reader.result]);
            setImages((old) => [...old, reader.result]);
          }
        };
    
        reader.readAsDataURL(file); 
        console.log(file,"file");
      });
    };
       

  return (
    <Fragment>
       <Metadata title={"Create Product"}/>
       <div className='dashboard'>
        <Sidebar/>
        <div className='newProductContainer'>
            <form className='newProductForm' encType='multipart/form-data' onSubmit={createProductSubmitHandler}>
              <h1>Create Product</h1>
              <div>
                <Spellcheck/>
                <input
                 type='text'
                 value={name}
                 placeholder='Product Name'
                 required
                 onChange={(e)=>setName(e.target.value)}
                />
              </div>
              <div>
                <AttachMoney/>
                <input
                 type='number'
                 value={price}
                 placeholder='Price'
                 required
                 onChange={(e)=>setPrice(e.target.value)}
                />
              </div>
              <div>
                <Description/>
                <textarea
                 placeholder='Product Description'
                 value={description}
                 onChange={(e)=>setDescription(e.target.value)}
                 cols="30"
                 rows="1"
                >
                </textarea>
              </div>
              <div>
                <AccountTree/>
                <select onChange={(e)=>setCategory(e.target.value)}>
                    <option value="">Select Category</option>
                    {categories.map((cate)=>(
                        <option key={cate} value={cate}>{cate}</option>
                    ))}
                </select>
              </div>
              <div>
                <Storage/>
                <input
                 type='number'
                 placeholder='Stock'
                 required
                 onChange={(e)=>setStock(e.target.value)}
                />
              </div>
              <div id='newProductFormFile'>
                <input
                 type='file'
                 name='avatar'
                 accept='image/*'
                 onChange={createProductImagesChange}
                 multiple/>
              </div>
              <div id='newProductFormImage'>
                {imagesPreview.map((image,index)=>(
                    <img src={image} key={index} alt={"Avatar Preview"}/>
                ))}
              </div>
              <Button id="newProductBtn" type="submit" disabled={loading ? true:false}>
                Create
              </Button>
            </form>
        </div>
       </div>
    </Fragment>
  )
}
