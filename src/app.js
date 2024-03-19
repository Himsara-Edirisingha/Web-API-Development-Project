const express = require("express");
const app = express();
require('dotenv').config()

const { authenticateToken } = require("./service/controllers/auth-controller.js");

app.use(express.json());

const metricsdataRoute = require("./api/routes/metrics-data.routes.js");
const weatherRoute = require("./api/routes/weather-station.routes.js");

app.use("/api/metrics", metricsdataRoute);
app.use("/api/weather", authenticateToken, weatherRoute);

module.exports = app;
