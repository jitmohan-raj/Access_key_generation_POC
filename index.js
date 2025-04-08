const express = require('express');
const app = express();
const cors = require("cors");
const path = require("path");
require("dotenv").config({
    path: path.resolve(__dirname, `../.env.${process.env.NODE_ENV}`),
  });

app.use(express.json());
const routes = require("./src/routes/index.js");
app.use(routes);
app.use(express.urlencoded({ extended: true }));

const { sendApiResponse } = require('./src/config/api_response.js');

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
})); 

// REST API Routes
app.use("/v1/api", routes);

// Welcome Route
app.get("/v1/api", (req, res) => {
  sendApiResponse(res, "Welcome to My POC");
});

 // Handle Invalid Routes
 app.use("*", (req, res) => {
    res.status(404).json({
      error: "Invalid API Path",
      message: `The path '${req.originalUrl}' does not exist`,
    });
  });

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
