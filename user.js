const express=require('express');
const router=express.Router();
const users = require("./model/user");

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
  } catch (error) {
  console.log(error)
 }
     
    let user = u._doc;
    delete user["password"];
    res.status(201).send({ accountCreated: true, msg: "Account created ..!", user});
  } catch (err) {
    res.status(400).send({ accountCreated: false, 
    msg: "account not created"+err});
  }

})


.get(require('./middleware/auth').auth,async (req,res) =>{
  const { _id,  } = req.user;
  try {
    const isThere = await users.findById({ _id });
    if (isThere) {
      delete isThere._doc['password'];
      res.status(200).send(
        { user: true, 
         user: isThere._doc 
        });
    } else {
      res.status(404).send(
        { user: false,
          msg: "User  Not found..!"
        }
         );
    }
  } catch (error) {
    res.status(204).send({ user: false, ...error, msg: "error", })
  }
  
})


router.all("*",async (req,res) =>{
  console.log("user   "+req.url);
   res.status(200).status("user deleted ");
 })
 

module.exports=router;