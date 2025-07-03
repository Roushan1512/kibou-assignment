import jwt from "jsonwebtoken";
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) return res.status(401).send("No token provided");

  const token = authHeader.split(" ")[1];
  jwt.verify(token, process.env.JWT_Secret, (err, decoded) => {
    if (err) return res.status(403).send("Invalid token");

    req.user = decoded;
    next();
  });
};

export default verifyToken;
