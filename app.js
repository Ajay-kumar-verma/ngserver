const express=require('express');
const router=express.Router();

router.all("*",(req,res,next) =>{
 console.log("Api is called with ",req.url);

    next();
})

router.use('/login',require('./login'))
router.use('/user',require('./user'))



router.all("*",(req,res) =>{
    res.send("Server is live now  !");
    // console.log("Server is running ")
})


module.exports=router;