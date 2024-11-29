const jwt = require("jsonwebtoken");

exports.authenticate = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) return res.status(401).json({ error: "Unauthorized access" });
  console.log(process.env.JWT_SECRET,token,"here")
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
   console.log(decoded)
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
};

exports.authorize = (roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) {
    return res.status(403).json({ error: "Forbidden access" });
  }
  next();
};
