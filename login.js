const express=require('express');
const router=express.Router();


router.route("/")

.post(async (req,res) =>{

console.log(req.body);
 res.status(200).send("Login successfullly") 
})

module.exports=router;