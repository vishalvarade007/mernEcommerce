import React from 'react';
import {useSelector} from "react-redux";
import { Navigate } from 'react-router-dom';
import {Loader} from "../layout/Loader/Loader";

export function ProtectedRoute({children,isAdmin}) {
    const {loading,isAuthenticated,user} = useSelector(state=>state.user);
    
    if(loading){
        return <Loader/>;
    }
    if(loading === false && isAuthenticated === false){
        return <Navigate to="/login"/>
    }
    if(loading === false && isAdmin === true && user.role !== "admin"){
        return <Navigate to="/login"/>
    }


    return children;
    
}


