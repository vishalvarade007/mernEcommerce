const app = require("./app");
const connectToDb = require("./Config/database");
const cloudinary = require("cloudinary");


//uncaught exception
process.on("uncaughtException",(err)=>{
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to the uncaught exception`);
    process.exit(1);
});

//config
if (process.env.NODE_ENV !== "PRODUCTION") {
    require("dotenv").config({path:"Config/config.env"});
}

//connecting to db
connectToDb();

cloudinary.config({
    cloud_name:process.env.CLOUDINARY_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET,
})

const server = app.listen(process.env.PORT,()=>{
    console.log(`server is listening on http://localhost:${process.env.PORT}`);
});

//unhandled promise rejection
process.on("unhandledRejection",(err)=>{
    console.log(`Error : ${err.message}`);
    console.log(`Shutting down the server due to the unhandled rejection`);

    server.close(()=>{
        process.exit(1);
    })
});



