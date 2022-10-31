const jwt = require('jsonwebtoken');
const secret_key = "12345"

async function genToken(cred) {
  try {
    const Token = await jwt.sign({ ...cred }, secret_key, { expiresIn: '60000s' })
    return { Token };
  } catch (Error) {
    return { Error };
  }

}

async function verifyToken(token) {
  // console.log("token is :",token);
  try {
    const User = await jwt.verify(token, secret_key)
       console.log(User);
    return {User };
  } catch (Error) {
    return { Error };
  }

}



module.exports = { genToken, verifyToken };