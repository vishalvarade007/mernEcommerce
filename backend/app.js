const express = require("express");
const app = express();
const cors = require("cors");
const errorMiddleware = require("./middleware/error");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");

//config env
if (process.env.NODE_ENV !== "PRODUCTION") {
    require("dotenv").config({path:"Config/config.env"});
}

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:true}));
app.use(fileUpload());

const product = require("./Routes/Products/products");
const user = require("./Routes/Users/users");
const order = require("./Routes/Order/order");
const payment = require("./Routes/Payment/paymentroute");

app.use("/api/v1",product);
app.use("/api/v1",user);
app.use("/api/v1",order);
app.use("/api/v1",payment);


//middleware for errors
app.use(errorMiddleware);

module.exports = app;