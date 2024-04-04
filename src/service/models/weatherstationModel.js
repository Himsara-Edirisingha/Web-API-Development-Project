const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const weatherStationSchema = new Schema({
  name: { type: String, required: true ,unique:true},
  location: { type: String, required: true },
  district: { type: String, required: true, unique:true },
  coordinates: {
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
  },
  lastUpdate: { type: Date, default: Date.now },
  apiKey: { type: String, required: true }
});

const WeatherStation = mongoose.model("WeatherStation", weatherStationSchema);

module.exports = WeatherStation;
