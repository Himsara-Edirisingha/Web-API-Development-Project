const metricsDataService = require('../services/metricsDataService');
const jwt = require("jsonwebtoken");
const { PERMISSION } = require("../enums/enums");
require("dotenv").config();


async function create(req, res) {
  try {
    const metrixdata = await metricsDataService.createMatricsData(req.body);
    res.status(201).json({ message: "Data Recorded successfully!", data: metrixdata });
  } catch (err) {
    res.status(500).send({ error: err.message });
    return;
  }
}

const get = async (req, res) => {
  try {
    const metrixdata = await metricsDataService.getAllMatricsData();
    res.status(200).json({ message: "Data retrieved successfully", data: metrixdata });
  } catch (err) {
    res.status(500).send({ error: "Server error" });
  }
};
async function getbyid(req, res) {
  const id = req.params.id;
  const metrixdata = await metricsDataService.getMatricsDataById(id);
  if (metrixdata) {
    res.status(200).json({ message: "Data retrieved successfully", data: metrixdata });
  } else {
    res.status(404).send("Item not found");
  }
}

async function remove(req, res) {
  const id = req.params.id;
  const metrixdata = await metricsDataService.deleteMatricsData(id);
  if (metrixdata) {
    res.status(200).json({ message: "Data deleted successfully", data: metrixdata });
  } else {
    res.status(404).send("Item not found");
  }
}

async function update(req, res) {
  const id = req.params.id;
  const updatedItem = req.body;
  const metrixdata = await metricsDataService.updateMatricsData(id, updatedItem);
  if (metrixdata) {
    res.status(200).json({ message: "Data deleted successfully", data: metrixdata });
  } else {
    res.status(404).send("Item not found");
  }
}

async function getLatestMetricsData(req, res) {
  try {
    const latestData = await metricsDataService.getLatest();
    res.status(200).json(latestData.map(stationData => stationData.latestData));
  } catch (error) {
    console.error('Error fetching latest metrics data:', error);
    res.status(500).json({ error: 'Error fetching data' });
  }
}


module.exports = {
  get: get,
  getbyid: getbyid,
  create: create,
  remove: remove,
  update: update,
  getLatestMetricsData: getLatestMetricsData,
};
