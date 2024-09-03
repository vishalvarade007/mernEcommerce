const ErrorHandler = require("../Utils/errorHandler");
const catchAsyncError = require("./catchAsyncError");
const User = require("../Models/userModel");
const jwt = require("jsonwebtoken")

exports.isAuthenticatedUser = catchAsyncError(async(req,res,next)=>{
     const {token} =  req.headers.authorization.split(' ')[1];
      console.log(token,"myToken");
     if(!token){
        return next(new ErrorHandler("Please login to access this resource",401));
     }

     const decodedData = jwt.verify(token,process.env.SECRET_KEY);

     req.user = await User.findById(decodedData.id);
   
     next();
});

exports.authorizeRoles = (...roles)=>{
    return (req,res,next)=>{
        if(!roles.includes(req.user.role)){
            new ErrorHandler(`Role: ${req.user.role} is not allowed to access this resource`);
        }
        next();
    }
};

