const express=require('express');
const router=express.Router();
const users = require("./model/user");
const {genToken} =require('./middleware/jwt')
const bcrypt = require('bcrypt');


router.all("*",(req,res, next) =>{
	console.log("login api ",req.url);
	next();
})


router.route("/")
.post(async (req,res) =>{
	const { Email, Password } = req.body;
	try {
		let user = await users.findOne({ Email });
		if (user) {
		const isMatch = await bcrypt.compare(Password, user.Password);
		if (isMatch) {
		 user = user._doc;  delete user["Password"];
          const {Token ,Error} = await genToken(user);
		  const obj={};
		  res.status(202).send(Token);
		  if(Token) obj= {...obj, login: true,message: "login sucesfull...!", Token}
		  if(Error) obj = {...obj,login:false,message:"Token generation error ",Error};	
			}

			else {
			res.status(206).send({ login: false, message: "In correct Email or password  " });
		}
		}
		else {
			res.status(206).send({ login: false, message: "Email not Found..!" });
		}

	} catch (error) {
		res.send(
            { 
              login: false,
              message: "Server error or invalid body data ",
              error 
            }
            );
	}  

})






router.all("*",async (req,res) =>{
    console.log(req.body);
    res.status(200).send("Login   "+req.url) 
})

module.exports=router;