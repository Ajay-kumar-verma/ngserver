const express=require('express');
const router=express.Router();
const users = require("./model/user");
const {auth} =require('./middleware/auth');

router.all("*",(req,res, next) =>{
console.log("user api ",req.url);
next();
})


router.route("/signup")
.post(async (req,res) =>{
 
  const { Email } = req.body;
  try {
    const isThere = await users.findOne({ Email });
   if (isThere) {
          isThere.Password = undefined
      res.status(208).send({ accountCreated: false,
      message: "user exist with email : " + Email, user: isThere });
      return;
    }
   let u = new users(req.body);
 try {
  await u.save();
  let user = u._doc;
  delete user['Password'];
 res.status(201).send({ accountCreated: true, messaage: "Account created ..!",user});
  } catch (error) {
  res.send({ accountCreated: false, msg: "Account not created ..!",...error});
  return;
 }
  } catch (err) {
    res.send({ accountCreated: false, 
    message: "account not created"+err});
  }

})

router.route("/info")
.post(auth,async (req,res) =>{
  const {_id}= req;
   const user = await users.findOne({ _id });
   if (user) {
         user.Password = undefined
     res.status(200).send({ recieved :true, user });
     return;
   }
   else{
    res.status(200).send({ recieved :true, message:"User not find " });
   
   }


})


router.all("*",async (req,res) =>{
  console.log("user   "+req.url);
   res.status(200).status("user deleted ");
 })
 

module.exports=router;