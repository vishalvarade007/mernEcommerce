const mongoose = require("mongoose");

const connectToDatabase = ()=>{
    mongoose.connect(process.env.MONGO_URI,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
    .then((data) => {
        console.log(`mongodb is connected to server ${data.connection.host}`);
    })
};

module.exports = connectToDatabase;