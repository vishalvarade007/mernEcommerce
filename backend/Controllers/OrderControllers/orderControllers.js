const Order = require("../../Models/orderModel");
const Product = require("../../Models/productmodel");
const catchAsyncErrors = require("../../middleware/catchAsyncError");
const ErrorHandler = require("../../Utils/errorHandler");

//new order
exports.newOrder = catchAsyncErrors( async(req,res,next)=>{
    const {shippingInfo,orderItems,paymentInfo,itemsPrice,taxPrice,shippingPrice,totalPrice} = req.body;

    const order = await Order.create({
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paidAt:Date.now(),
        user:req.user._id,
    });

    res.status(201).json({
        success:true,
        order,
    })
});

//get Single order
exports.getSingleOrder = catchAsyncErrors( async(req,res,next)=>{
     const order = await Order.findById(req.params.id).populate("user","name email");

     if(!order){
        return next(new ErrorHandler("Order Not Found",404));
     }

     res.status(200).json({
        success:true,
        order,
     })
});

//get logged in user order
exports.myOrders = catchAsyncErrors( async(req,res,next)=>{
      const orders = await Order.find({user:req.user._id});
      
      res.status(200).json({
        success:true,
        orders,
      })

});

//get All orders 
exports.getAllOrders = catchAsyncErrors( async(req,res,next)=>{
    const orders = await Order.find();

    let totalAmount = 0;

    orders.forEach((order)=>{
        totalAmount += order.totalPrice;
    });

    res.status(200).json({
        success:true,
        totalAmount,
        orders,
    })
});

//Update Order
exports.updateOrder = catchAsyncErrors( async(req,res,next)=>{
    const order = await Order.findById(req.params.id);

    if(!order){
        return next(new ErrorHandler("Order Not Found",404));
    }

    if(order.orderStatus === "Delivered"){
        return next(new ErrorHandler("You have already delivered this order",400));
    }

    if(req.body.status === "Shipped"){
        order.orderItems.forEach(async (ord)=>{
            await updateStock(ord.product,ord.quantity);
        });
    }

    order.orderStatus = req.body.status;

    if(req.body.status === "Delivered"){
        order.deliveredAt = Date.now();
    }

    await order.save({validateBeforeSave:false});
    res.status(200).json({
        success:true,
    })
});

async function updateStock(id,quantity){
    const product = await Product.findById(id);

    product.Stock -= quantity;

    await product.save({validateBeforeSave:false});
};

//Delete order
exports.deleteOrder = catchAsyncErrors( async(req,res,next)=>{
    const order = await Order.findById(req.params.id);

    if(!order){
        return next(new ErrorHandler("Order Not Found",404));
    }

    await order.deleteOne();

    res.status(200).json({
        success:true,
        message:"Order deleted successfully...",
    })
});
