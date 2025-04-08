const accessKeyDAO = require("../dao/accessKey.dao");

const checkAccessKey = async (req, res, next) => {
  const key = req.headers["x-access-key"];

  if (!key) {
    return res
      .status(401)
      .json({ success: false, message: "Access key required" });
  }

  const result = await accessKeyDAO.validateAccessKey(key);

  if (!result.valid) {
    return res.status(403).json({ success: false, message: result.message });
  }

  req.accessInfo = result.accessKey; // Attach for downstream use
  next();
};

module.exports = checkAccessKey;
