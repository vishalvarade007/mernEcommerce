const ErrorHandler = require("../Utils/errorHandler");

module.exports = (err,req,res,next)=>{
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal server error..";
    
    //wrong mongodb ID error handling
    if(err.name === "CastError"){
        const message = `Resource not found.Invalid: ${err.path}`;
        err = new ErrorHandler(message,400);
    }

    //mongoose duplicate key error
    if(err.code === 11000){
        const message = `Duplicate ${Object.keys(err.keyValue)} Entered!!`;
        err = new ErrorHandler(message,400);
    }

    //wrong JWT error
    if(err.code === "JsonWebTokenError"){
        const message = `JSON Web Token is Invalid , try again !!`;
        err = new ErrorHandler(message,400);
    }

    //JWT Expired error
    if(err.code === "TokenExpiredError"){
        const message = `JSON Web Token is Expired, try again !!`;
        err = new ErrorHandler(message,400);
    }

    res.status(err.statusCode).json({
        success:false,
        message:err.message
    })
}