const jwt = require('jsonwebtoken');
const secret_key = "12345"

async function genToken(cred) {
  try {
    const token = await jwt.sign({ ...cred }, secret_key, { expiresIn: '60000s' })

    return { token };
  } catch (error) {
    return { error };
  }

}

async function verifyToken(token) {
  try {
    const data = await jwt.verify(token, secret_key)
    return { data };
  } catch (error) {
    return { error };
  }

}




module.exports = { genToken, verifyToken };