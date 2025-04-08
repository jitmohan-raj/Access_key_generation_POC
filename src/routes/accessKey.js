const express = require("express");
const router = express.Router();
const GenerateController = require("../controllers/accessKey.controller");

router.post("/generate", GenerateController.createAccessKey);
router.get("/validate/:key", GenerateController.validateAccessKey);

module.exports = router;