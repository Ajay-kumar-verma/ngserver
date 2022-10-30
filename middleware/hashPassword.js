const bcrypt = require('bcrypt');

async function hashPswd(plainText) {
  
  const salt = await bcrypt.genSalt(10);
  const pswd = await bcrypt.hash(plainText, salt);
  return pswd;
}

module.exports = { hashPswd };