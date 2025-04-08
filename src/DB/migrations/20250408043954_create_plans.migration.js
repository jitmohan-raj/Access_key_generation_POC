/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("plans", (table) => {
    table.increments("id").primary();
    table.string("name").unique().notNullable(); // Free, Basic, etc.
    table.integer("feature_limit").notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("plans");
};
