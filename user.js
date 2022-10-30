const express=require('express');
const router=express.Router();
const users = require("./model/user");
const {verifyToken} = require("./middleware/jwt");
router.route("/")
.post(async (req,res) =>{
 
  const { Email } = req.body;
  try {
    const isThere = await users.findOne({ Email });
   if (isThere) {
          isThere.password = undefined
      res.status(208).send({ accountCreated: false,
      msg: "user exist with email : " + Email, user: isThere });
      return;
    }
   let u = new users({ ...req.body });
 try {
  await u.save();
  let user = u._doc;
 delete user["password"];
 res.status(201).send({ accountCreated: true, msg: "Account created ..!", user});
  } catch (error) {
  res.send(error);
  return;
 }
  } catch (err) {
    res.status(400).send({ accountCreated: false, 
    msg: "account not created"+err});
  }

})


.get(async (req,res) =>{
  const { token } = req.user;
   const {data} =await verifyToken(token);
  res.send(data); 
})


router.all("*",async (req,res) =>{
  console.log("user   "+req.url);
   res.status(200).status("user deleted ");
 })
 

module.exports=router;