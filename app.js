const express=require('express');
const router=express.Router();

router.get("/",(req,res) =>{
    res.send("Server is running !");
    // console.log("Server is running ")
})

router.use('/signup',require('./signup'))
router.use('/login',require('./login'))


module.exports=router;