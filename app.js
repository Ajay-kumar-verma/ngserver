const express=require('express');
const router=express.Router();

router.use('/user',require('./user'))
router.use('/login',require('./login'))



router.get("/",(req,res) =>{
    res.send("Server is live now  !");
    // console.log("Server is running ")
})

module.exports=router;