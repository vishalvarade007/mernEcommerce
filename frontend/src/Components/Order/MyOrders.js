import React,{Fragment,useEffect} from 'react';
import {DataGrid} from "@mui/x-data-grid";
import "./MyOrders.css";
import {useSelector,useDispatch} from "react-redux";
import {myOrders,clearErrors} from "../../Actions/orderAction";
import {Loader} from "../layout/Loader/Loader";
import {Metadata} from "../layout/Metadata";
import {useAlert} from "react-alert";
import {Typography} from "@mui/material";
import {Link} from "react-router-dom";
import {Launch} from "@mui/icons-material";

export function MyOrders() {
  const dispatch = useDispatch();
  const alert = useAlert();

  const {loading,error,orders} = useSelector((state)=>state.myOrders);
  const {user} = useSelector((state)=>state.user);

  const columns = [
    {
      field:"id",
      headerName:"Order Id",
      minWidth:300,
      flex:1,
    },
    {
      field:"status",
      headerName:"Status",
      minWidth:150,
      flex:0.5,
      cellClassName:(params)=>{
        return params.row.status === "Delivered" ? "greenColor":"redColor";
    }
    },
    {
      field:"itemsQty",
      headerName:"Items Qty",
      minWidth:150,
      flex:0.3,
    },
    {
      field:"amount",
      headerName:"Amount",
      type:"number",
      minWidth:270,
      flex:0.3,
    },
    {
      field:"actions",
      flex:0.3,
      headerName:"Actions",
      minWidth:150,
      type:"number",
      sortable:false,
      renderCell:(params)=>{
         return (
            <Link to={`/order/${params.row.id}`}>{<Launch/>}</Link>
         )
      }
    }
  ];

  const rows = [];

  orders && 
  orders.forEach((item,i)=> {
     rows.push({
        itemsQty:item.orderItems.length,
        id:item._id,
        status:item.orderStatus,
        amount:item.totalPrice,
     })
  });

  useEffect(() => {
   if(error){
     alert.error(error);
     dispatch(clearErrors());
   }
    dispatch(myOrders());
  }, [dispatch,error,alert]);
  
  return (
    <Fragment>
      <Metadata title={`${user.name}'s orders`}/>
      {loading ? <Loader/> :(
        <div className='myOrdersPage'>
          <DataGrid
             rows={rows}
             columns={columns}
             pageSizeOptions={10}
             disableRowSelectionOnClick
             autoHeight
             className='myOrdersTable'
             />

             <Typography className='myOrdersHeading'>{user.name}'s Orders</Typography>
  
        </div>
      )}
    </Fragment>
  )
}
