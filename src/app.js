const express = require("express");
const app = express();

const metricsdataRoute = require("./api/routes/metrics-data.routes.js");
const weatherRoute = require("./api/routes/weather-station.routes.js");

app.use("/api/metrics", metricsdataRoute);
app.use("/api/weather", weatherRoute);

module.exports = app;
