import jwt from "jsonwebtoken";

export default (req, res, next) => {
  const token = (req.headers.authorization || "").replace(/Bearer\s?/, "");
  if (token) {
    try {
      const decoder = jwt.verify(token, "secret123");
      req.userId = decoder._id;
      next();
    } catch (error) {
      return res.status(403).send("Нет доступа");
    }
  } else {
    return res.status(403).send("Нет доступа");
  }
};
