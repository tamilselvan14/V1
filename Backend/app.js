const express=require("express");
const app=express();
const mongoose = require("mongoose");
app.use(express.json());

const mongoUrl="mongodb://localhost:27017"
mongoose
   .connect(mongoUrl)
   .then(()=>{
    console.log("Database Connected");
   })
   .catch((e) =>{
     console.log(e);
    });
require('./UserDetail')

const User=mongoose.model("UserInfo");
app.post('/register',async(req,res)=>{
    const {name,mobile,password} = req.body;

    try {
        await User.create({
            name : name,
            mobile,
            password,
        });
        res.send({status:"ok",data:"User Created"});
    } catch (error) {
        res.send({status:"error",data:error});
    }
});

app.get("/",(req,res)=>{
    res.send({status:"Started"})
});



app.listen(5001,()=>{
    console.log("server started");
    
});