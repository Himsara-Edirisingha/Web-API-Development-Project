const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const metricsDataSchema = new Schema({
  stationId: {
    type: Schema.Types.ObjectId,
    ref: "WeatherStation",
    required: true,
  },
  timestamp: { type: Date, required: true },
  temperature: { type: Number, required: true },
  humidity: { type: Number, required: true },
  airPressure: { type: Number, required: true},
});


const MetricsData = mongoose.model("MetricsData", metricsDataSchema);

module.exports = MetricsData;
