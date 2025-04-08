const accessKeyDAO = require("../dao/accessKey.dao");
const { generateAccessKey } = require("../utils/accessKeyGenerator");

const createAccessKey = async (req, res) => {
  try {
    const { product_id, subscription_id, plan_id,  end_date:expires_at, } = req.body;
    const access_key = generateAccessKey(product_id, subscription_id);

    const newKey = await accessKeyDAO.createAccessKey({
      access_key,
      product_id,
      subscription_id,
      plan_id,
      end_date: expires_at,
    });

    res.status(201).json({ success: true, message: "Access key created", data: newKey });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

const validateAccessKey = async (req, res) => {
  try {
    const { key } = req.params;

    const result = await accessKeyDAO.validateAccessKey(key);

    if (!result.valid) {
      return res.status(403).json({ success: false, message: result.message });
    }

    res.status(200).json({ success: true, message: "Access key is valid", data: result.accessKey });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

module.exports = {
  createAccessKey,
  validateAccessKey,
};
