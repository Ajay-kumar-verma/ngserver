const {verifyToken } = require('./jwt');

async function auth(req, res, next) {
  const { authorization } = req?.headers;
  const token = authorization?.slice(1, authorization?.length - 1);
    const { data, error } = await verifyToken(token);
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