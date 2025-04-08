"use strict";
const path = require("path");

// Load the correct .env file dynamically
require("dotenv").config({
  path: path.resolve(
    __dirname,
    `.env.${process.env.NODE_ENV || "development"}`
  ),
});

const baseConfig = {
  client: "pg",
  connection: {
    host: process.env.DB_SERVER,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT,
  },
  pool: {
    min: parseInt(process.env.DB_POOL_MIN, 10) || 0,
    max: parseInt(process.env.DB_POOL_MAX, 10) || 500,
    acquireTimeoutMillis: 50000,
    createTimeoutMillis: 30000,
    reapIntervalMillis: 1000,
    createRetryIntervalMillis: 200,
    idleTimeoutMillis: 10000,
  },
  migrations: {
    tableName: "knex_migrations", // Use a static name to avoid multiple tables
    directory: path.join(__dirname, "src", "DB", "migrations"),
  },
  seeds: {
    directory: path.join(__dirname, "src", "DB", "seeds"),
  },
};

const config = {
  development: { ...baseConfig, debug: true },
  staging: { ...baseConfig, debug: true },
  production: { ...baseConfig, debug: true },
};

module.exports = config;
