const { Model } = require("objection");
const { DBconnection } = require("../config/db_connection");
const { knex } = require("../config/db_connection");


class AccessKey extends Model {
  static get tableName() {
    return "access_keys";
  }

  static get idColumn() {
    return "id";
  }

  static get relationMappings() {
    const Plan = require("./plans.model");

    return {
      plan: {
        relation: Model.BelongsToOneRelation,
        modelClass: Plan,
        join: {
          from: "access_keys.subscription_id",
          to: "plans.plan_id",
        },
      },
    };
  }

  // static get knex() {
  //   return DBconnection;
  // }
}
Model.knex(knex);

module.exports = AccessKey;
