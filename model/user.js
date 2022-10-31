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
        required:true
    },
    LastName: {
        type: String,
        required:true
    },
    ImageUrl: {
      type: String,
     }
   ,
    Email:{
      type: String,
      required:true 
    },
    Password:{
        type:String,
        required:true
       },    
  
})


usersSchema.pre("save", async function(next){
  // console.log("Pre save is catch"); 
  const plainText=this.Password;  
  const hspswd=await hashPswd(plainText);   
  this.Password=hspswd;
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



