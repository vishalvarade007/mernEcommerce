import React, { Fragment, useEffect } from 'react';
import { DataGrid } from "@mui/x-data-grid";
import "./ProductList.css";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { clearErrors, deleteOrder, getAllOrders } from "../../Actions/orderAction";
import { useAlert } from "react-alert";
import { Button } from '@mui/material';
import { Edit, Delete } from "@mui/icons-material";
import { Sidebar } from "./Sidebar";
import { Metadata } from "../layout/Metadata";
import { DELETE_ORDER_RESET } from '../../Constants/orderConstants';

export function OrderList() {
    const dispatch = useDispatch();
    const alert = useAlert();
    const path = useNavigate();
    const { error, orders } = useSelector((state) => state.allOrders);
    const { error: deleteError, isDeleted } = useSelector((state) => state.order);

    const deleteOrderHandler = (id) => {
        dispatch(deleteOrder(id));
    }

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (deleteError) {
            alert.error(deleteError);
            dispatch(clearErrors());
        }

        if (isDeleted) {
            alert.success("Order deleted successfully");
            path("/admin/orders");
            dispatch({ type: DELETE_ORDER_RESET });
        }

        dispatch(getAllOrders());
    }, [error, alert, dispatch, deleteError, isDeleted, path]);


    const columns = [
        {
            field: "id",
            headerName: "Order Id",
            minWidth: 300,
            flex: 1,
        },
        {
            field: "status",
            headerName: "Status",
            minWidth: 150,
            flex: 0.5,
            cellClassName: (params) => {
                return params.row.status === "Delivered" ? "greenColor" : "redColor";
            }
        },
        {
            field: "itemsQty",
            headerName: "Items Qty",
            minWidth: 100,
            flex: 0.4,
        },
        {
            field: "amount",
            headerName: "Amount",
            type: "number",
            minWidth: 270,
            flex: 0.3,
        },
        {
            field: "actions",
            headerName: "Actions",
            flex: 0.3,
            minWidth: 150,
            headerAlign: "center",
            align: "center",
            type: "number",
            sortable: false,
            renderCell: (params) => {
                return (
                    <Fragment>
                        <Link to={`/admin/order/${params.id}`} >
                            <Edit />
                        </Link>
                        <Button onClick={() => deleteOrderHandler(params.id)}>
                            <Delete />
                        </Button>
                    </Fragment>
                )
            }
        }
    ];

    const rows = [];

    orders && orders.forEach((item) => {
        rows.push({
            id: item._id,
            itemsQty: item.orderItems.length,
            amount: item.totalPrice,
            status: item.orderStatus
        })
    });


    return (
        <Fragment>
            <Metadata title={"All Orders - Admin"} />
            <div className='dashboard'>
                <Sidebar />
                <div className='productListContainer'>
                    <h1 id='productListHeading'>All Orders</h1>
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

