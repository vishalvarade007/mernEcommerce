const instance  = require("./razorpayInstance");
const catchAsyncErrors = require("../../middleware/catchAsyncError");


exports.checkOut = async(req,res)=>{
   try{
    const options = {
        amount:req.body.amount,
        currency:"INR",
      };
      const order = await instance.orders.create(options);
      console.log(order);
      res.status(200).json({success:true,order_id: order.id,});
   }catch(error){
      console.log(error);
   }
};

exports.sendRazorpayApiKey = catchAsyncErrors(async (req, res, next) => {
   res.status(200).json({ razorpayApiKey: process.env.RAZORPAY_KEY_ID });
 });