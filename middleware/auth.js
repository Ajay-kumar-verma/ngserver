const {verifyToken } = require('./jwt');

async function auth(req, res, next) {
  //  const {Token}  = req.headers;
   const {Token}  = req.body;

  // console.log("Token ",Token);

  const { User, Error } = await verifyToken(Token);
    
    if(User){
      req.user = User;
      req._id=User._id;
      next();
      return;
    }
    if(Error){
      res.send({ TokenVerificationFail: true,Error});
      return ;
    }

}

module.exports = { auth };