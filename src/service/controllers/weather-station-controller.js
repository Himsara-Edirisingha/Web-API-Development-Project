const WeatherStation = require("../models/weatherstationModel");

async function create(req, res) {
  try {
    const weatherStation = await WeatherStation.create(req.body);
    res.status(201).json({ message: "WeatherStation created successfully!", data: weatherStation });
  } catch (err) {
    res.status(500).send({ error: err.message });
    return;
  }
}

async function get(req, res) {
  try {
    const weatherStations = await WeatherStation.find({});
    res
      .status(226)
      .json({ message: "WeatherStation data retrieved successfully!", data: weatherStations });
  } catch (err) {
    res.status(500).send({ error: "Server error" });
    return;
  }
}


async function getById(req, res) {
  const id = req.params.id;
  try {
    const weatherStation = await WeatherStation.findById(id);

    if (!weatherStation) {
      return res.status(404).json({ error: "Weather station not found" });
    }
    res.status(200).json({ message: "Weather station retrieved successfully", data: weatherStation });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "Server error" });
  }
}

async function remove(req, res) {
  const id = req.params.id;
  try {
    const deletedweatherStation = await WeatherStation.findByIdAndDelete({ _id: id });
    if (deletedweatherStation) {
      res
        .status(200)
        .send({ message: "WeatherStation deleted successfully", user: deletedweatherStation });
    } else {
      res.status(404).send({ error: "User not found" });
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ error: "Server error" });
  }
}

async function update(req, res) {
  const id = req.params.id;
  const updatedItem = req.body;
  try {
    const updatedweatherStation = await WeatherStation.findByIdAndUpdate(id, updatedItem, {
      new: true,
    });
    if (updatedUser) {
      res
        .status(200)
        .send({ message: "WeatherStation updated successfully", user: updatedweatherStation });
    } else {
      res.status(404).send({ error: "User not found" });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send({ error: "Server error" });
  }
}

module.exports = {
  get: get,
  getById: getById,
  create: create,
  remove: remove,
  update: update,
};
