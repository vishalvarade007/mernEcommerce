
const express = require("express");
const {isAuthenticatedUser}  = require("../../middleware/auth");
const { checkOut, sendRazorpayApiKey } = require("../../Controllers/PaymentControllers/paymentControllers");
const router = express.Router();

router.post("/payment/process",isAuthenticatedUser,checkOut);

router.get("/razorpayapikey",isAuthenticatedUser,sendRazorpayApiKey);

module.exports = router;

