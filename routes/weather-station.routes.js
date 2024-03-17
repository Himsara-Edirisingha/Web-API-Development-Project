const express = require('express');

const controller = require("../controllers/weather-station-controller.js");

const router = express.Router();

router.get("/", controller.get);



module.exports = router;