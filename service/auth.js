const jwt = require("jsonwebtoken");
const secret = "Ashu@123"

function setUser(user) {
  return jwt.sign({
    email: user.email,
    _id: user._id, 
    role: user.role,
  }, secret);
}

function getUser(token) {
  if(!token) return null;
  try {
    return jwt.verify(token, secret)
  } catch (error) {
    return null;
  }
  
}

module.exports = {
  setUser,
  getUser
}