const {verifyToken } = require('./jwt');

async function auth(req, res, next) {
  const { token } = req.body;
     res.send(token);return ;
    const { data, error } = await verifyToken(token);
    res.send(data);
    return ;
    if (data) {
    
     req.user = { ...data }; 
       next(); 
       return;
       }
     else {
       const obj = { verificationFail: true, ...error }
       res.send(obj);
     
      }
    }
   

module.exports = { auth };