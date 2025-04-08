const { Model } = require("objection");
const { DBconnection } = require("../config/db_connection");

class PlanFeature extends Model {
  static get tableName() {
    return "plan_features";
  }

  static get idColumn() {
    return ["plan_id", "feature_id"];
  }

  static get relationMappings() {
    const Plan = require("./plans.model");
    const Feature = require("./features.model");

    return {
      plan: {
        relation: Model.BelongsToOneRelation,
        modelClass: Plan,
        join: {
          from: "plan_features.plan_id",
          to: "plans.plan_id",
        },
      },
      feature: {
        relation: Model.BelongsToOneRelation,
        modelClass: Feature,
        join: {
          from: "plan_features.feature_id",
          to: "features.feature_id",
        },
      },
    };
  }

  static get knex() {
    return DBconnection;
  }
}

module.exports = PlanFeature;
