const MetricsData = require("../models/metricsdataModel");
const jwt = require("jsonwebtoken");
const { PERMISSION } = require("../enums/enums");
require("dotenv").config();

let items = [
  { id: 1, name: "MetricsData 1" },
  { id: 2, name: "MetricsData 2" },
];

async function create(req, res) {
  try {
    const metrixdata = await MetricsData.create(req.body);
    res.status(201).json({ message: "Data Recorded successfully!", data: metrixdata });
  } catch (err) {
    res.status(500).send({ error: err.message });
    return;
  }
}

async function get(req, res) {
  res.send(items);
}

async function getbyid(req, res) {
  const id = parseInt(req.params.id);
  const item = items.find((item) => item.id === id);
  if (item) {
    res.send(item);
  } else {
    res.status(404).send("Item not found");
  }
}

async function remove(req, res) {
  const id = req.params.id;
  items = items.filter((item) => item.id !== parseInt(id));
  res.send(items);
}

async function update(req, res) {
  const id = req.params.id;
  const updatedItem = req.body;

  const index = items.findIndex((item) => item.id === parseInt(id));

  if (index !== -1) {
    items[index] = { ...items[index], ...updatedItem };
    res.send(items);
  } else {
    res.status(404).send("Item not found");
  }
}

async function getLatestMetricsData(req, res) {
  try {
    const latestData = await MetricsData.aggregate([
      { $sort: { timestamp: -1 } }, 
      {
        $group: {
          _id: '$stationId',
          latestData: { $first: '$$ROOT' }, 
        },
      },
    ]);
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
  getLatestMetricsData:getLatestMetricsData,
};
