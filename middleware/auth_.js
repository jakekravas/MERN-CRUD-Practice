const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function(req, res, next){
  const tokenVal = req.header("x-auth-token");

  if (!tokenVal) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  } 
  // else {
  //   req.token = tokenVal;
  //   next();
  // }

  try {
    const decoded = jwt.verify(tokenVal, config.get("jwtSecret"));
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
}