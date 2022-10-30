const mongoose = require('mongoose')
const { Schema } = mongoose;
const bcrypt = require('bcrypt');


async function hashPswd(plainText) {
  
  const salt = await bcrypt.genSalt(10);
  const pswd = await bcrypt.hash(plainText, salt);
  return pswd;
}



const usersSchema = new Schema({
    FirstName: {
        type: String,
    },
    LastName: {
        type: String,
    },
    ImageUrl: {
      type: String,
    }
   ,
    Email:{
      type: String, 
    },
    password:{
        type:String,
       },    
  
})


usersSchema.pre("save", async function(next){
  const plainText=this.password;  
  const hspswd=await hashPswd(plainText);   
  this.password=hspswd;
//  console.log("pre save ",this);
  next();
})


usersSchema.pre("updateOne", async function(next){
  const plainText=this._update.password;
  this._update.password=await hashPswd(plainText)
  next();
 return ; 
})



module.exports = mongoose.model('user',usersSchema)



