require("dotenv").config();
const express = require("express");
const cors = require('cors');
const mongoSanitize =require("express-mongo-sanitize")
const xss = require("xss-clean");
const { specs, swaggerUi } = require('./swaggerConfig');
const app = express();


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
app.use(express.json());
app.use(cors());

//SANITIZE USER INPUT
app.use(mongoSanitize())

//SCRIPT CLEAN USER INPUT
app.use(xss())

const userRoute = require("./api/routes/user.routes.js");
const metricsdataRoute = require("./api/routes/metrics-data.routes.js");
const weatherRoute = require("./api/routes/weather-station.routes.js");

app.use("/api/user", userRoute);
app.use("/api/metrics", metricsdataRoute);
app.use("/api/weather", weatherRoute);

module.exports = app;
