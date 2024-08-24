const Razorpay = require('razorpay');
const dotenv = require('dotenv');

dotenv.config({ path: 'Config/config.env' });

const instance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_SECRET_KEY,
});

module.exports = instance;