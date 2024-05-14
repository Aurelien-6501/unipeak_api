const jwt = require("jsonwebtoken");
const User = require("../models/User");

module.exports = function requireAuthentification(req, res, next) {
  jwt.verify(
    req.headers.authorization,
    process.env.JWT_SECRET,
    async (err, data) => {
      if (err instanceof jwt.TokenExpiredError) {
        return res.status(401).send({
          type: "TOKEN_EXPIRED",
        });
      } else if (err) {
        return res.status(401).send({ message: "Unauthorized" });
      }

      req.user = await User.findOne({ _id: data.id });

      if (!req.user) {
        return res.status(401).send({ message: "Unauthorized" });
      }
      next();
    }
  );
};
