/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("plan_features", (table) => {
    table
      .integer("plan_id")
      .references("id")
      .inTable("plans")
      .onDelete("CASCADE");
    table
      .integer("feature_id")
      .references("id")
      .inTable("features")
      .onDelete("CASCADE");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("plan_features");
};
