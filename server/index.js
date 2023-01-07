const express = require('express')
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = express()
dotenv.config();
const dbConfig = require("./config/dbConfig");
app.use(express.json());
const userRoute = require("./routes/userRoutes")
const adminRoute = require("./routes/adminRoutes")




app.use('/api/user',userRoute)
app.use('/api/admin',adminRoute)
app.listen(3001, ()=>{
    console.log("server runing on port 3001")
})