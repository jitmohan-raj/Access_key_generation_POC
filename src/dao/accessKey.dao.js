const AccessKey = require("../models/access_key.model");

const getAccessKeyByProductAndSubscription = async (
  product_id,
  subscription_id
) => {
  return AccessKey.query()
    .findOne({ product_id, subscription_id })
    .withGraphFetched("[plan, features]");
};

const createAccessKey = async (accessKeyData) => {
  return AccessKey.query().insert(accessKeyData);
};

const validateAccessKey = async (access_key) => {
  const accessKey = await AccessKey.query()
    .findOne({ access_key })
    .withGraphFetched("[plan, features]");

  if (!accessKey) return { valid: false, message: "Invalid access key" };

  const now = new Date();
  if (new Date(accessKey.expires_at) < now) {
    return { valid: false, message: "Access key expired" };
  }

  return { valid: true, accessKey };
};

module.exports = {
  getAccessKeyByProductAndSubscription,
  createAccessKey,
  validateAccessKey,
};
