import React,{Fragment,useEffect} from 'react';
import {DataGrid} from "@mui/x-data-grid";
import "./ProductList.css";
import {useSelector,useDispatch} from "react-redux";
import {Link, useNavigate} from "react-router-dom";
import {clearErrors,deleteProduct,getAdminProducts} from "../../Actions/productAction";
import {useAlert} from "react-alert";
import { Button } from '@mui/material';
import {Edit,Delete} from "@mui/icons-material";
import {Sidebar} from "./Sidebar";
import {Metadata} from "../layout/Metadata";
import { DELETE_PRODUCT_RESET } from '../../Constants/productConstants';

export function ProductList() {
    const dispatch = useDispatch();
    const alert = useAlert();
    const path = useNavigate();
    const {error,products} = useSelector((state)=>state.products);
    const {error:deleteError,isDeleted} = useSelector((state)=>state.myProduct);
    
    const deleteProductHandler = (id)=>{
         dispatch(deleteProduct(id));
    }

    useEffect(() => {
       if(error){
         alert.error(error);
         dispatch(clearErrors());
       }

       if(deleteError){
        alert.error(deleteError);
        dispatch(clearErrors());
      }

      if(isDeleted){
        alert.success("Product deleted successfully");
        path("/admin/dashboard");
        dispatch({type:DELETE_PRODUCT_RESET});
      }

       dispatch(getAdminProducts());
    }, [error,alert,dispatch,deleteError,isDeleted,path]);
    

    const columns = [
      {
        field:"id",
        headerName:"Product Id",
        minWidth:200,
        flex:0.5
      },
      {
        field:"name",
        headerName:"Name",
        minWidth:150,
        flex:1,
      },
      {
        field:"stock",
        headerName:"Stock",
        type:"numnber",
        minWidth:150,
        flex:0.3
      },
      {
        field:"price",
        headerName:"Price",
        minWidth:150,
        flex:0.5
      },
      {
        field:"actions",
        headerName:"Actions",
        flex:0.3,
        headerAlign: "center",
        align: "center",
        minWidth:150,
        type:"number",
        sortable:false,
        renderCell:(params)=>{
            return (
                <Fragment>
                    <Link to={`/admin/product/${params.id}`} >
                     <Edit />
                    </Link>
                    <Button onClick={()=>deleteProductHandler(params.id)}>
                        <Delete/>
                    </Button>
                </Fragment>
            )
        }
      }
    ];

    const rows = [];

    products && products.forEach((item) => {
        rows.push({
            id:item._id,
            price:item.price,
            stock:item.Stock,
            name:item.name
        })
    });
    

  return (
    <Fragment>
       <Metadata title={"All Products - Admin"}/>
       <div className='dashboard'>
        <Sidebar/>
        <div className='productListContainer'>
           <h1 id='productListHeading'>All Products</h1>
           <DataGrid
            rows={rows}
            columns={columns}
            disableRowSelectionOnClick
            pageSizeOptions={10}
            className='productListTable'
            autoHeight
           />
        </div>
       </div>
    </Fragment>
  )
}
