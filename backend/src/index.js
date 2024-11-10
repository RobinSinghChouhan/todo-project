const express = require("express");
const app = express();

app.get("/hello",(req,res)=>{
    return res.json({
        message: "Hello World"
    })
})

app.listen(3000,()=>{
    console.log("Server Running!")
})
