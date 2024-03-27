require("dotenv").config();
const express = require("express");
const cors = require('cors');
const app = express();
const {
  authenticateToken,
} = require("./service/controllers/middleware/auth-controller.js");

app.use(express.json());
app.use(cors());


const userRoute = require("./api/routes/user.routes.js");
const metricsdataRoute = require("./api/routes/metrics-data.routes.js");
const weatherRoute = require("./api/routes/weather-station.routes.js");

app.use("/api/user", userRoute);
app.use("/api/metrics", metricsdataRoute);
app.use("/api/weather", weatherRoute);

module.exports = app;
