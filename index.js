require('dotenv').config();
require('./config');

const express =require('express');
const app=express();
const cors = require("cors"); app.use(cors());
app.use(express.json());

const PORT=process.env.PORT || 3002;

app.get("/",(req,res)=>{
res.send("wlerui");

})

// app.use(require('./app.js'));

app.listen(PORT,_=>console.log("Server is running at port ",PORT));

