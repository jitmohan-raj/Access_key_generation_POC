"use strict";

const Knex = require("knex");
const { knexSnakeCaseMappers } = require('objection');
const { Model } = require("objection");
const knexConfig = require("../../knexfile");
const environment = process.env.NODE_ENV || 'development';
const knex = Knex({
  ...knexConfig[environment],
  ...knexSnakeCaseMappers(),
});
// const knex = Knex(knexConfig[process.env.NODE_ENV || "development"]);
Model.knex(knex);

module.exports = { knex };``