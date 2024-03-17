const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const weatherStationSchema = new Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  district: { type: String, required: true },
  coordinates: {
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
  },
  lastUpdate: { type: Date, default: Date.now },
});

const WeatherStation = mongoose.model("WeatherStation", weatherStationSchema);

module.exports = WeatherStation;
