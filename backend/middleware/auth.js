const ErrorHandler = require("../Utils/errorHandler");
const catchAsyncError = require("./catchAsyncError");
const User = require("../Models/userModel");
const jwt = require("jsonwebtoken")

exports.isAuthenticatedUser = catchAsyncError(async (req, res, next) => {
    const authHeader = req.headers.authorization;

    // Check if the authorization header exists and starts with "Bearer "
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return next(new ErrorHandler("Please login to access this resource", 401));
    }

    // Extract the token from the "Bearer <token>" string
    const token = authHeader.split(' ')[1];
    console.log(token, "myToken");

    // Check if the token is present
    if (!token) {
        return next(new ErrorHandler("Please login to access this resource", 401));
    }

    // Verify the token
    const decodedData = jwt.verify(token, process.env.SECRET_KEY);

    // Find the user associated with the token
    req.user = await User.findById(decodedData.id);

    // Proceed to the next middleware
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

