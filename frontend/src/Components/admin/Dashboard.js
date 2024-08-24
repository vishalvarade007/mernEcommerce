import React,{useEffect} from 'react';
import {Sidebar} from "./Sidebar"; 
import "./Dashboard.css";
import { Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import {getAdminProducts} from "../../Actions/productAction";
import {Doughnut,Line} from "react-chartjs-2";
import {useSelector,useDispatch} from "react-redux";
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend,ArcElement } from "chart.js";
import { getAllOrders } from '../../Actions/orderAction';
import { getAllUsers } from '../../Actions/userAction';
import {Metadata} from "../layout/Metadata";


export function Dashboard() {
  Chart.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
  );

  const {products} = useSelector((state)=>state.products);
  const {orders} = useSelector((state)=>state.allOrders);
  const {users} = useSelector((state)=>state.allUsers);


  const dispatch = useDispatch();

  let outOfStock = 0;

  products && products.forEach((item) => {
     if(item.Stock === 0){
        outOfStock += 1;
     }
  });

  useEffect(() => {
    dispatch(getAdminProducts());
    dispatch(getAllOrders());
    dispatch(getAllUsers());
 }, [dispatch]);

let totalAmount = 0;
orders && orders.forEach((item)=>{
    totalAmount += item.totalPrice
})
  const lineState = {
    labels:["Inital Amount","Amount Earned"],
    datasets:[
     {
      label:"TOTAL AMOUNT",
      backgroundColor:["tomato"],
      hoverBackgroundColor:["rgb(197,72,49)"],
      data:[0,totalAmount],
     }
    ],
  };

  const doughnutState = {
    labels:["Out of Stock","InStock"],
    datasets:[
     {
      backgroundColor:["#00A6B4","#6800B4"],
      hoverBackgroundColor:["4B5000","35014F"],
      data:[outOfStock,products && products.length-outOfStock],
     }
    ],
  };
  return (
    <>
    <Metadata title={"Dashboard"}/>
      <div className='dashboard'>
      <Sidebar/>
      <div className='dashboardContainer'>
         <Typography component={"h1"}>Dashboard</Typography>
         <div className='dashboardSummary'>
           <div>
            <p>
              Total Amount <br/> ₹{totalAmount}
            </p>
           </div>
           <div className='dashboardSummaryBox2'>
            <Link to="/admin/products">
             <p>Products</p>
             <p>{products && products.length}</p>
            </Link>
            <Link to="/admin/orders">
             <p>Orders</p>
             <p>{orders && orders.length}</p>
            </Link>
            <Link to="/admin/users">
             <p>Users</p>
             <p>{users && users.length}</p>
            </Link>
           </div>
         </div>
         <div className='lineChart'>
          <Line
           data={lineState}
          />
         </div>
         <div className='doughnutChart'>
           <Doughnut
            data={doughnutState}
           />
         </div>
      </div>
    </div>
    </>
  )
}
