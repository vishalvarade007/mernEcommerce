import React from 'react';
import "./Sidebar.css";
import {Link} from "react-router-dom";
import {TreeView,TreeItem} from "@material-ui/lab";
import {ExpandMore,ImportExport,Add,ListAlt,PostAdd,Dashboard,RateReview,People} from "@mui/icons-material";

export function Sidebar() {
  return (
    <div className='sidebar'>
      <div className='logocontainer'>
      <Link to="/">
        EasyCART
      </Link>
      </div>
      <Link to="/admin/dashboard">
       <p><Dashboard/>Dashboard</p>
      </Link>
      <Link>
       <TreeView defaultCollapseIcon={<ExpandMore/>} defaultExpandIcon={<ImportExport/>}>
          <TreeItem nodeId='1' label="products" id='product'>
            <Link className='remA' to="/admin/products">
               <TreeItem nodeId='2' label="All" icon={<PostAdd/>}/>
            </Link>
            <Link className='remA' to="/admin/product">
               <TreeItem nodeId='3' label="Create" icon={<Add/>}/>
            </Link>
          </TreeItem>
       </TreeView>
      </Link>
      <Link to="/admin/orders">
       <p><ListAlt/>Orders</p>
      </Link>
      <Link to="/admin/users">
       <p><People/>Users</p>
      </Link>
      <Link to="/admin/reviews">
       <p><RateReview/>Reviews</p>
      </Link>
      
    </div>
  )
}
