/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("features", (table) => {
    table.increments("id").primary();
    table.string("name").notNullable();
    table.string("feature_code").unique().notNullable(); // e.g., INVOICE_VIEW
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("features");
};
