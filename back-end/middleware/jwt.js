const jwt = require("jsonwebtoken");

function generateAccessToken(user) {
  const accessToken = jwt.sign(
    {
      _id: user._id,
      name: user.name,
      isAdmin: user.isAdmin,
      isBlocked: user.isBlocked,
      email: user.email
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: "1h",
    }
  );

  return accessToken;
}

function generateRefreshToken(user) {
  const accessToken = jwt.sign(
    {
      _id: user._id,
      name: user.name,
      isAdmin: user.isAdmin,
      isBlocked: user.isBlocked
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: "1h",
    }
  );

  return accessToken;
}

function authToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.sendStatus(401).send;

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    return next();
  });
}

module.exports = { generateAccessToken, generateRefreshToken, authToken };
