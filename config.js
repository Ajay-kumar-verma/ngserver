require('dotenv').config();
const mongoose = require('mongoose')
 const DB_NAME= 'Renix'
//  const DB_NAME="Zmongoosoe";
let url= process.env.DB_NAME;
// let url=`mongodb+srv://tuitionwalah:TJ6qG21mvK0GTTmk@cluster0.ajnizva.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`; 

function initDB() {
    if(mongoose.connections[0].readyState){
        console.log("already connected")
        return
  }

  mongoose.connect(url,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}) 
mongoose.connection.on('connected',()=>{
    console.log(`connected to mongo ${DB_NAME}`)
})
mongoose.connection.on('error',(err)=>{
    console.log("server errorror",err)
})

}
initDB();
module.exports=initDB;