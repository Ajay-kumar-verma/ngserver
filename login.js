const express=require('express');
const router=express.Router();
const users = require("./model/user");
// const {genToken} =require('./middleware/jwt')
const bcrypt = require('bcrypt');


router.route("/")
.post(async (req,res) =>{
	const { Email, password } = req.body;
	try {
		const isThere = await users.findOne({ Email });
		if (isThere) {
		const isMatch = await bcrypt.compare(password, isThere.password);
		if (isMatch) {
				console.log("password matched")
				let user = isThere._doc;
				delete user["password"];
				const obj = { login: true,msg: "login sucesfull...!", user }
				res.status(202).send({ ...obj });
			}
			else {
			res.send({ login: false, msg: "In correct Email or password  " });
		}
		}
		else {
			res.send({ login: false, msg: "Email not Found..!" });
		}

	} catch (error) {
		res.send(
            { 
              login: false,
              msg: "Server error or invalid body data ",
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