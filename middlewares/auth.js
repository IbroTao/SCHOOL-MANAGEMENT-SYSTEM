const jwt = require("jsonwebtoken");
require("dotenv").config();

const isAuth = async (req, res, next) => {
  const error = "Not authenticated";
  const auth = req.get("Authorization");
  if (!auth) {
    return res.status(403).json({ error: error });
  }
  const token = auth;
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, process.env.SECRET);
    if (!decodedToken)
      return res
        .status(403)
        .json({
          message: "You have not been granted permission, try logging in again",
        });
    req.userAccess = decodedToken.id;
    next();
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = { isAuth };
