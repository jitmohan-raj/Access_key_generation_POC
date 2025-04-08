/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("access_keys", (table) => {
    table.increments("id").primary();
    table.string("access_key").unique().notNullable();
    table.string("product_id").notNullable();
    table.integer("subscription_id").notNullable();
    table.integer("plan_id").references("id").inTable("plans");
    table.timestamp("start_date");
    table.timestamp("end_date");
    table.boolean("active").defaultTo(true);
    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("access_keys");
};
