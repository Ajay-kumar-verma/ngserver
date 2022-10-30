const express=require('express');
const router=express.Router();


router.route("/")

.post(async (req,res) =>{

console.log(req.body);
 res.status(200).send("Account created successfully") 
})

.get(async (req,res) =>{
 
    res.status(200).send("users are []")

})

.put(async (req,res) =>{

  const data =req.body;
  console.log("data is ",data);
  res.status(200).send("data updated");
})

.delete(async (req,res) =>{
 console.log("user deleted ");
  res.status(200).status("user deleted ");
})

module.exports=router;