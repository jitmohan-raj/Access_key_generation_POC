const { Model } = require("objection");
const { DBconnection } = require("../config/db_connection");

class Feature extends Model {
  static get tableName() {
    return "features";
  }

  static get idColumn() {
    return "feature_id";
  }

  static get relationMappings() {
    const PlanFeature = require("./plan_features.model");
    return {
      plans: {
        relation: Model.HasManyRelation,
        modelClass: PlanFeature,
        join: {
          from: "features.feature_id",
          to: "plan_features.feature_id",
        },
      },
    };
  }

  static get knex() {
    return DBconnection;
  }
}

module.exports = Feature;
