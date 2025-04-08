"use strict";

const { Client } = require("pg");
const path = require("path");
const dotenv = require("dotenv");

dotenv.config({
  path: path.resolve(__dirname, "../../", `.env.${process.env.NODE_ENV || "development"}`)
});

const { dbConfig, DB_NAME } = require("./db_config");
const knex = require("./db_connection"); // <-- Use initialized knex

async function checkAndCreateDatabase(dbName) {
  const client = new Client({
    ...dbConfig,
    database: "postgres", // connect to default db
  });

  await client.connect();

  const existsResult = await client.query(
    `SELECT 1 FROM pg_database WHERE datname = $1`,
    [dbName]
  );

  if (existsResult.rowCount === 0) {
    console.log(`Database ${dbName} not found. Creating...`);
    await client.query(`CREATE DATABASE "${dbName}"`);
    console.log(`Database ${dbName} created.`);
  } else {
    console.log(`Database ${dbName} already exists.`);
  }

  await client.end();
}

async function runMigrations(db) {
  console.log(`Running migrations for database: ${db.client.config.connection.database}`);
  await db.migrate.latest();
  console.log("Migrations completed.");
}

(async () => {
  await checkAndCreateDatabase(DB_NAME);
  await runMigrations(knex);
  process.exit(0);
})();
