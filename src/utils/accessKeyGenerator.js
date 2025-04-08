const crypto = require("crypto");

function generateAccessKey(product_id, subscription_id) {
  const rawKey = `${product_id}-${subscription_id}-${Date.now()}`;
  return crypto.createHash("sha256").update(rawKey).digest("hex");
}

module.exports = { generateAccessKey };
