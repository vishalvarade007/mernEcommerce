import React, { useState } from 'react';
import {SpeedDial,SpeedDialAction} from "@material-ui/lab";
import profilIcon from "../../../Images/prof.png";
import {Person, Dashboard, ExitToApp, ListAlt,ShoppingCart} from "@mui/icons-material";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import {logout} from "../../../Actions/userAction";
import Backdrop from "@material-ui/core/Backdrop";


export function UserOptions({user}) {
    const [open, setOpen] = useState(false);
    const path = useNavigate();
    const dispatch = useDispatch();
    const alert = useAlert();
    const {cartItems} = useSelector((state)=>state.cart)

    function dashboard(){
       path("/admin/dashboard");
    }
    function orders(){
        path("/orders");
    }
    function account(){
        path("/account");
    }
    function cart(){
      path("/cart");
  }
    function logoutUser(){
        dispatch(logout());
        alert.success("Logout successfully");
    }

    const options = [
        {icon:<ListAlt/>, name:"Orders", func:orders},
        {icon:<Person/>, name:"Profile", func:account},
        {icon:<ShoppingCart style={{color:cartItems.length>0?"tomato":"unset"}}/>, name:`Cart(${cartItems.length})`, func:cart},
        {icon:<ExitToApp/>, name:"Logout", func:logoutUser},
    ];

    if(user && user.role === "admin"){
        options.unshift({icon:<Dashboard/>, name:"Dashboard", func:dashboard});
    }
    
  return (
    <>
      <Backdrop open={open} style={{zIndex:"10"}}/>
      <SpeedDial
         ariaLabel='SpeedDial tooltip example'
         onClose={()=>setOpen(false)}   
         onOpen={()=>setOpen(true)}
         open={open} 
         className='speedDial'
         direction='down'
         style={{zIndex:11}}
         icon={<img
           className='speedDialIcon'
           src={user.avatar.url ? user.avatar.url:profilIcon}
           alt='profile'
        />} 
      >
       {options.map((item)=>(
            <SpeedDialAction key={item.name} icon={item.icon} tooltipTitle={item.name} tooltipOpen={window.innerWidth<=600?true:false} onClick={item.func}/>
       ))}
       
      </SpeedDial>
    </>
  )
}
