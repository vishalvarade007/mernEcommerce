import React,{useEffect,useState,Fragment} from 'react';
import "./NewProduct.css";
import {Metadata} from "../layout/Metadata";
import {useNavigate, useParams} from "react-router-dom";
import {useSelector,useDispatch} from "react-redux";
import {clearErrors,updateProduct,getProductDetails} from "../../Actions/productAction";
import {UPDATE_PRODUCT_RESET} from "../../Constants/productConstants";
import {useAlert} from "react-alert";
import {Button} from "@mui/material";
import {Sidebar} from "./Sidebar";
import {AccountTree,Description,AttachMoney,Storage,Spellcheck} from "@mui/icons-material";

export function UpdateProduct() {
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
     const params = useParams();

     const {error,product} = useSelector((state)=>state.productDetails);

     const {error:updateError,loading,isUpdated} = useSelector((state)=>state.myProduct);

     const productId = params.id;

     useEffect(()=>{
        if(product && product._id !== productId){
            dispatch(getProductDetails(productId));
        }else{
           setName(product.name);
           setCategory(product.category);
           setDescription(product.description);
           setPrice(product.price);
           setStock(product.Stock);
           setOldImages(product.images);
        }

       if(error){
        alert.error(error);
        dispatch(clearErrors());
       }
       if(updateError){
        alert.error(updateError);
        dispatch(clearErrors());
       }

       if(isUpdated){
        alert.success("Product updated successfully");
        path("/admin/products");
        dispatch({type:UPDATE_PRODUCT_RESET});
       }
     },[alert,error,dispatch,isUpdated,path,productId,product,updateError]);

     const [name,setName] = useState("");
     const [price,setPrice] = useState(0);
     const [description,setDescription] = useState("");
     const [stock,setStock] = useState(0);
     const [category,setCategory] = useState("");
     const [images,setImages] = useState([]);
     const [oldImages,setOldImages] = useState([]);
     const [imagesPreview,setImagesPreview] = useState([]);

     const updateProductSubmitHandler = (e)=>{
         e.preventDefault();

         const myForm = new FormData();

         myForm.set("name",name);
         myForm.set("price",price);
         myForm.set("description",description);
         myForm.set("category",category);
         myForm.set("Stock",stock);

         images.forEach((image)=>{
           myForm.append("images",image);
           console.log(image,"img");
         });

         dispatch(updateProduct(productId,myForm));
     };

     const updateProductImagesChange = (e) => {
      const files = Array.from(e.target.files);
     console.log(files,"files");
      setImages([]);
      setImagesPreview([]);
      setOldImages([]);
    
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
            <form className='newProductForm' encType='multipart/form-data' onSubmit={updateProductSubmitHandler}>
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
                <select value={category} onChange={(e)=>setCategory(e.target.value)}>
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
                 value={stock}
                 onChange={(e)=>setStock(e.target.value)}
                />
              </div>
              <div id='newProductFormFile'>
                <input
                 type='file'
                 name='avatar'
                 accept='image/*'
                 onChange={updateProductImagesChange}
                 multiple/>
              </div>
              <div id='newProductFormImage'>
                {oldImages && oldImages.map((image,index)=>(
                    <img src={image.url} key={index} alt={"Old Product Preview"}/>
                ))}
              </div>
              <div id='newProductFormImage'>
                {imagesPreview.map((image,index)=>(
                    <img src={image} key={index} alt={"Product Preview"}/>
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

