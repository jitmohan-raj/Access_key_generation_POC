// accessKeyValidator.lambda.js

const { knex } = require("knex")(require("./knexfile")); // or use RDS Data API
const { Model } = require("objection");
const AccessKey = require("./models/access_key.model"); // adjust path as needed

Model.knex(knex);

exports.handler = async (event) => {
  try {
    const { key } = JSON.parse(event.body);

    const accessKey = await AccessKey.query()
      .findOne({ access_key: key })
      .withGraphFetched("[plan, features]");

    if (!accessKey) {
      return {
        statusCode: 403,
        body: JSON.stringify({ success: false, message: "Invalid access key" }),
      };
    }

    const now = new Date();
    if (new Date(accessKey.end_date) < now) {
      return {
        statusCode: 403,
        body: JSON.stringify({ success: false, message: "Access key expired" }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        message: "Access key is valid",
        data: accessKey,
      }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        success: false,
        message: "Server error",
        error: error.message,
      }),
    };
  }
};
