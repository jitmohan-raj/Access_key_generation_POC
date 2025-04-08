const express = require("express");
const router = express.Router();
const accessKey = require("./accessKey");

router.use("/access_key", accessKey);



module.exports = router;