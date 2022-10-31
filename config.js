require('dotenv').config();
const mongoose = require('mongoose');
const DB_NAME= process.env.DB_NAME ||'ngdb';
const USER = process.env.USER ;
const PASSWORD = process.env.PASSWORD;
let url=
`mongodb+srv://${USER}:${PASSWORD}@cluster0.2w2gbhf.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`

function initDB() {
    if(mongoose.connections[0].readyState){
        console.log("already connected")
        return
  }

  mongoose.connect(url,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
}) 
mongoose.connection.on('connected',()=>{
      console.log(`connected to mongo ${DB_NAME}`)
})
mongoose.connection.on('error',(err)=>{
    console.log("server errorror",err)
})



console.log("init Db is called ");
}

initDB();
module.exports=initDB;