const mongoose = require("./src/config/database.js");
const express = require("express");

const app = express();
const port = process.env.PORT || 3000;

mongoose.connection.on("connected", function () {

  const metricsdataRoute = require("./src/api/routes/metrics-data.routes.js");
  const weatherRoute = require("./src/api/routes/weather-station.routes.js");

  app.use("/api/metrics", metricsdataRoute);
  app.use("/api/weather", weatherRoute);

  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
});

mongoose.connection.on("error", function (err) {
  console.error("Mongoose connection error:", err);
  process.exit(1);
});


