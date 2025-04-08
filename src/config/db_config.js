"use strict";

require("dotenv").config({
  path: require("path").resolve(
    __dirname,
    "../../",
    `.env.${process.env.NODE_ENV || "development"}`
  ),
});

const dbConfig = {
  host: process.env.DB_SERVER,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
};

const DB_NAME = process.env.DB_DATABASE;

module.exports = {
  dbConfig,
  DB_NAME,
};
