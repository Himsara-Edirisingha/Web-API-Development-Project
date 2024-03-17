
const express = require('express')
const mongoose = require('mongoose');
const global = require("./config.js");
const app = express()
const port = process.env.PORT || global.port;


const metricsdataRoute = require("./routes/metrics-data.routes");
const weatherRoute = require("./routes/weather-station.routes.js");

app.use("/api/metrics", metricsdataRoute);
app.use("/api/weather", weatherRoute);


mongoose
  .connect(global.dbCon)
  .then(() => {
    console.log("DB Connection - Successfull");
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });
  })
  .catch((err) => {
    console.error(err);
  });

