const { Model } = require("objection");
const { DBconnection } = require("../config/db_connection");

class Plan extends Model {
  static get tableName() {
    return "plans";
  }

  static get idColumn() {
    return "plan_id";
  }

  static get relationMappings() {
    const PlanFeature = require("./plan_features.model");
    return {
      features: {
        relation: Model.HasManyRelation,
        modelClass: PlanFeature,
        join: {
          from: "plans.plan_id",
          to: "plan_features.plan_id",
        },
      },
    };
  }

  static get knex() {
    return DBconnection;
  }
}

module.exports = Plan;
