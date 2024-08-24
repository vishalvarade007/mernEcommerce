import React,{useEffect,useState,Fragment} from 'react';
import "./NewProduct.css";
import {Metadata} from "../layout/Metadata";
import {useNavigate, useParams} from "react-router-dom";
import {useSelector,useDispatch} from "react-redux";
import {clearErrors,getUserDetails,updateUser} from "../../Actions/userAction";
import {UPDATE_USER_RESET} from "../../Constants/userConstants";
import {useAlert} from "react-alert";
import {Button} from "@mui/material";
import {Sidebar} from "./Sidebar";
import {MailOutline,Person,VerifiedUser} from "@mui/icons-material";
import { Loader } from '../layout/Loader/Loader';

export function UpdateUser() {
  
     const dispatch = useDispatch();
     const params = useParams();
     const alert = useAlert();
     const path = useNavigate();
     const {error,loading,user} = useSelector((state)=>state.userDetails);

     const {error:updateError,loading:updateLoading,isUpdated} = useSelector((state)=>state.profile);

     const userId = params.id;

     useEffect(()=>{
        if(user && user._id !== userId){
            dispatch(getUserDetails(userId));
        }else{
           setName(user.name);
           setEmail(user.email);
           setRole(user.role);
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
        alert.success("User Updated successfully");
        path("/admin/dashboard");
        dispatch({type:UPDATE_USER_RESET});
       }
     },[alert,error,dispatch,path,isUpdated,user,userId,updateError]);

     const [name,setName] = useState("");
     const [email,setEmail] = useState("");
     const [role,setRole] = useState("");
     

     const updateUserSubmitHandler = (e)=>{
         e.preventDefault();

         const myForm = new FormData();

         myForm.set("name",name);
         myForm.set("email",email);
         myForm.set("role",role);
      
         dispatch(updateUser(userId,myForm));
     };

       
  return (
    <Fragment>
       <Metadata title={"Update User"}/>
       <div className='dashboard'>
        <Sidebar/>
        <div className='newProductContainer'>
            {loading ? (<Loader/>):(
                <form className='newProductForm'  onSubmit={updateUserSubmitHandler}>
                <h1>Update User</h1>
                <div>
                  <Person/>
                  <input
                   type='text'
                   value={name}
                   placeholder='Name'
                   required
                   onChange={(e)=>setName(e.target.value)}
                  />
                </div>
                <div>
                  <MailOutline/>
                  <input
                   type='email'
                   value={email}
                   placeholder='Email'
                   required
                   onChange={(e)=>setEmail(e.target.value)}
                  />
                </div>
                
                <div>
                  <VerifiedUser/>
                  <select value={role} onChange={(e)=>setRole(e.target.value)}>
                      <option value="">Select Role</option>++
                      <option value="admin">Admin</option>
                      <option value="user">User</option>
                  </select>
                </div>
              
                
               
                <Button id="newProductBtn" type="submit" disabled={updateLoading ? true:false || role === "" ? true:false}>
                  Update
                </Button>
              </form>
            ) }
        </div>
       </div>
    </Fragment>
  )
}

