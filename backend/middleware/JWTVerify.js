const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ message: "Token Needed" });
  }

  const token = authorization.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded; 
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }

  next();
};

module.exports = {
  verifyToken,
};
