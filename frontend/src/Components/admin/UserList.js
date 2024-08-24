import React,{Fragment,useEffect} from 'react';
import {DataGrid} from "@mui/x-data-grid";
import "./ProductList.css";
import {useSelector,useDispatch} from "react-redux";
import {Link, useNavigate} from "react-router-dom";
import {clearErrors,deleteUser,getAllUsers} from "../../Actions/userAction";
import {useAlert} from "react-alert";
import { Button } from '@mui/material';
import {Edit,Delete} from "@mui/icons-material";
import {Sidebar} from "./Sidebar";
import {Metadata} from "../layout/Metadata";
import { DELETE_USER_RESET } from '../../Constants/userConstants';

export function UserList() {
    const dispatch = useDispatch();
    const alert = useAlert();
    const path = useNavigate();
    const {error,users} = useSelector((state)=>state.allUsers);
    const {error:deleteError,isDeleted,message} = useSelector((state)=>state.profile);
    
    const deleteUserHandler = (id)=>{
         dispatch(deleteUser(id));
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
        alert.success(message);
        path("/admin/users");
        dispatch({type:DELETE_USER_RESET});
      }

       dispatch(getAllUsers());
    }, [error,alert,dispatch,deleteError,isDeleted,path,message]);
    

    const columns = [
      {
        field:"id",
        headerName:"User Id",
        minWidth:200,
       flex:1
      },
      {
        field:"email",
        headerName:"Email",
        minWidth:150,
        flex:1.5
      },
      {
        field:"name",
        headerName:"Name",
        minWidth:150,
        flex:1
      },
      {
        field:"role",
        headerName:"Role",
        minWidth:150,
        flex:0.8,
        cellClassName: (params) => {
          return params.row.role === "admin" ? "greenColor" : "blueColor";
      }
      },
      {
        field:"actions",
        headerName:"Actions",
        headerAlign: "center",
        align: "center",
        minWidth:150,
        type:"number",
        sortable:false,
        renderCell:(params)=>{
            return (
                <Fragment>
                    <Link to={`/admin/user/${params.id}`} >
                     <Edit />
                    </Link>
                    <Button onClick={()=>deleteUserHandler(params.id)}>
                        <Delete/>
                    </Button>
                </Fragment>
            )
        }
      }
    ];

    const rows = [];

    users && users.forEach((item) => {
        rows.push({
            id:item._id,
            role:item.role,
            email:item.email,
            name:item.name
        })
    });
    

  return (
    <Fragment>
       <Metadata title={"All Users - Admin"}/>
       <div className='dashboard'>
        <Sidebar/>
        <div className='productListContainer'>
           <h1 id='productListHeading'>All Users</h1>
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

