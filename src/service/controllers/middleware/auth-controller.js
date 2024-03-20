require("dotenv").config();
const jwt = require("jsonwebtoken");

//get a authed user via token validation
function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) {
    return res.sendStatus(401);
  }
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.sendStatus(403);
    }
    req.user = user;
    next();
  });
}

//read-write-update-delete permission check
function authPermission(permission) {
  return (req, res, next) => {
    //check for user permissions
    if (!req.user.permissions.includes(permission)) {
      res.status(401);
      return res.send("Not allowed to perform this action");
    }
    next();
  };
}

//user type check
function authUserType(type) {
  return (req, res, next) => {
    //check for user type
    if (!req.user.type  === type) {
      res.status(401);
      return res.send("Not allowed to perform this action");
    }
    next();
  };
}


module.exports = { authenticateToken,authPermission,authUserType };
