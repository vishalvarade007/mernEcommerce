import {
    CREATE_ORDER_REQUEST,
    CREATE_ORDER_SUCCESS,
    CREATE_ORDER_FAIL,
    MY_ORDERS_REQUEST,
    MY_ORDERS_SUCCESS,
    MY_ORDERS_FAIL,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_FAIL,
    ALL_ORDERS_FAIL,
    ALL_ORDERS_REQUEST,
    ALL_ORDERS_SUCCESS,
    UPDATE_ORDER_FAIL,
    UPDATE_ORDER_REQUEST,
    UPDATE_ORDER_SUCCESS,
    DELETE_ORDER_FAIL,
    DELETE_ORDER_REQUEST,
    DELETE_ORDER_SUCCESS,
    CLEAR_ERRORS
} from "../Constants/orderConstants";
import axios from "axios";
import { BASE_URL } from "../url";

//create order
export const createOrder = (order)=>async(dispatch,getState)=>{
    try{
        dispatch({type:CREATE_ORDER_REQUEST});
        const token = localStorage.getItem('jwtToken');

        const config = {
            headers:{
                "Content-Type":"application/json",
                Authorization: `Bearer ${token}`,
            }
        };

        const {data} = await axios.post(`${BASE_URL}/api/v1/order/new`,order,config);

        dispatch({type:CREATE_ORDER_SUCCESS,payload:data});

    }catch(error){
        dispatch({type:CREATE_ORDER_FAIL,payload:error.response.data.message});
    }
};

//My orders
export const myOrders = ()=>async(dispatch)=>{
    try{
        dispatch({type:MY_ORDERS_REQUEST});
        const token = localStorage.getItem('jwtToken');

        const {data} = await axios.get(`${BASE_URL}/api/v1/orders`,{
            headers: {
                Authorization: `Bearer ${token}`
              }
        });

        dispatch({type:MY_ORDERS_SUCCESS,payload:data.orders});

    }catch(error){
        dispatch({type:MY_ORDERS_FAIL,payload:error.response.data.message});
    }
};

//get All Orders (Admin)
export const getAllOrders = ()=>async(dispatch)=>{
    try{
        dispatch({type:ALL_ORDERS_REQUEST});
        const token = localStorage.getItem('jwtToken');

        const {data} = await axios.get(`${BASE_URL}/api/v1/admin/orders`,{
            headers: {
                Authorization: `Bearer ${token}`
              }
        });

        dispatch({type:ALL_ORDERS_SUCCESS,payload:data.orders});

    }catch(error){
        dispatch({type:ALL_ORDERS_FAIL,payload:error.response.data.message});
    }
};

//create order
export const updateOrder = (id,order)=>async(dispatch,getState)=>{
    try{
        dispatch({type:UPDATE_ORDER_REQUEST});
        const token = localStorage.getItem('jwtToken');

        const config = {
            headers:{
                "Content-Type":"application/json",
                Authorization: `Bearer ${token}`
            }
        };

        const {data} = await axios.put(`${BASE_URL}/api/v1/admin/order/${id}`,order,config);

        dispatch({type:UPDATE_ORDER_SUCCESS,payload:data.success});

    }catch(error){
        dispatch({type:UPDATE_ORDER_FAIL,payload:error.response.data.message});
    }
};

//delete order
export const deleteOrder = (id)=>async(dispatch,getState)=>{
    try{
        dispatch({type:DELETE_ORDER_REQUEST});
        const token = localStorage.getItem('jwtToken');

        const {data} = await axios.delete(`${BASE_URL}/api/v1/admin/order/${id}`,{
            headers: {
                Authorization: `Bearer ${token}`
              }
        });

        dispatch({type:DELETE_ORDER_SUCCESS,payload:data.success});

    }catch(error){
        dispatch({type:DELETE_ORDER_FAIL,payload:error.response.data.message});
    }
};

//orders details page
export const getOrderDetails = (id)=>async(dispatch)=>{
    try{
        dispatch({type:ORDER_DETAILS_REQUEST});
        const token = localStorage.getItem('jwtToken');

        const {data} = await axios.get(`${BASE_URL}/api/v1/order/${id}`,{
            headers: {
                Authorization: `Bearer ${token}`
              }
        });

        dispatch({type:ORDER_DETAILS_SUCCESS,payload:data.order});

    }catch(error){
        dispatch({type:ORDER_DETAILS_FAIL,payload:error.response.data.message});
    }
};

//clearing errors
export const clearErrors = () =>async(dispatch)=>{
 dispatch({type:CLEAR_ERRORS});
}