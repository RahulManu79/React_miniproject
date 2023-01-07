const mongoose = require('mongoose')

mongoose.set("strictQuery", true);

mongoose.connect(process.env.MONGO_URL)
const connection = mongoose.connection

connection.on('connected',()=>{
    console.log("mongodb connected");
})

connection.on('error',(error)=>{
    console.log("Error in mongodb connection",error);

})

module.exports = mongoose;